<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\InsufficientTicketQuotaException;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Event;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Ticket;
use App\Http\Resources\TicketResource;

class OrderController extends Controller
{
    /**
     * Attendee: list own orders.
     */
    public function index(Request $request)
    {
        $orders = $request->user()->orders()
            ->with('items.ticketType')
            ->orderByDesc('created_at')
            ->paginate(10);

        return OrderResource::collection($orders);
    }

    /**
     * Attendee: view own order detail.
     */
    public function show(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403, 'This is not your order.');
        }

        return new OrderResource($order->load('items.ticketType'));
    }

    /**
     * Attendee: create order (buy tickets) for a published event.
     */
    public function store(StoreOrderRequest $request, Event $event)
    {
        if (!in_array($event->status, ['published', 'ongoing'])) {
            abort(422, 'This event is not open for ticket sales.');
        }

        // Sort by ticket_type_id supaya urutan locking konsisten antar request,
        // mencegah deadlock kalau ada 2 order yang beli tipe tiket sama tapi urutan beda.
        $items = collect($request->validated('items'))
            ->sortBy('ticket_type_id')
            ->values();

        $order = DB::transaction(function () use ($items, $event, $request) {
            $order = Order::create([
                'order_number' => $this->generateOrderNumber(),
                'user_id' => $request->user()->id,
                'total_amount' => 0,
                'status' => 'pending',
            ]);

            $total = 0;

            foreach ($items as $item) {
                $ticketType = TicketType::where('id', $item['ticket_type_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($ticketType->event_id !== $event->id) {
                    abort(422, 'Ticket type does not belong to this event.');
                }

                if (!$ticketType->isOnSale() || $ticketType->availableQuota() < $item['quantity']) {
                    throw new InsufficientTicketQuotaException($ticketType->name);
                }

                $ticketType->increment('sold_count', $item['quantity']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'ticket_type_id' => $ticketType->id,
                    'quantity' => $item['quantity'],
                    'price_at_purchase' => $ticketType->price,
                ]);

                $total += $ticketType->price * $item['quantity'];
            }

            $order->update(['total_amount' => $total]);

            return $order;
        });

        return new OrderResource($order->load('items.ticketType'));
    }

    /**
     * Attendee: simulate payment for own pending order.
     */
    public function pay(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403, 'This is not your order.');
        }

        if ($order->status !== 'pending') {
            abort(422, 'This order cannot be paid.');
        }

        DB::transaction(function () use ($order) {
            $order->update(['status' => 'paid']);

            foreach ($order->items as $item) {
                for ($i = 0; $i < $item->quantity; $i++) {
                    Ticket::create([
                        'order_item_id' => $item->id,
                        'ticket_code' => $this->generateTicketCode(),
                        'status' => 'valid',
                    ]);
                }
            }
        });

        return new OrderResource($order->load('items.ticketType'));
    }

    private function generateTicketCode(): string
    {
        return 'TIX-' . strtoupper(Str::random(10));
    }

    private function generateOrderNumber(): string
    {
        return 'ORD-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));
    }

    /**
     * Attendee: list all own tickets (from paid orders).
     */
    public function myTickets(Request $request)
    {
        $tickets = \App\Models\Ticket::whereHas('orderItem.order', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
            ->with('orderItem.ticketType.event')
            ->orderByDesc('created_at')
            ->get();

        return TicketResource::collection($tickets);
    }
}