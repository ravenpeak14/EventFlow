<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TicketResource;
use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckInController extends Controller
{
    /**
     * Staff: validate and check-in a ticket for a specific event.
     */
    public function checkIn(Request $request, Event $event)
    {
        $request->validate([
            'ticket_code' => ['required', 'string'],
        ]);

        $ticket = DB::transaction(function () use ($request, $event) {
            $ticket = Ticket::where('ticket_code', $request->ticket_code)
                ->lockForUpdate()
                ->with('orderItem.ticketType.event', 'orderItem.order.user')
                ->first();

            if (! $ticket) {
                abort(404, 'Ticket not found.');
            }

            if ($ticket->orderItem->ticketType->event_id !== $event->id) {
                abort(422, 'This ticket does not belong to this event.');
            }

            if ($ticket->status === 'used') {
                abort(422, 'This ticket has already been checked in at '.$ticket->checked_in_at);
            }

            if ($ticket->status === 'cancelled') {
                abort(422, 'This ticket has been cancelled.');
            }

            $ticket->update([
                'status' => 'used',
                'checked_in_at' => now(),
            ]);

            return $ticket;
        });

        return response()->json([
            'message' => 'Check-in successful.',
            'data' => [
                'ticket_code' => $ticket->ticket_code,
                'attendee_name' => $ticket->orderItem->order->user->name,
                'ticket_type' => $ticket->orderItem->ticketType->name,
                'checked_in_at' => $ticket->checked_in_at,
            ],
        ]);
    }
}