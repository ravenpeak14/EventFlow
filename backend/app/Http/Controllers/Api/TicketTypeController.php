<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTicketTypeRequest;
use App\Http\Resources\TicketTypeResource;
use App\Models\Event;
use App\Models\TicketType;
use Illuminate\Http\Request;

class TicketTypeController extends Controller
{
    /**
     * Organizer: list ticket types for own event.
     */
    public function index(Request $request, Event $event)
    {
        if ($event->organizer_id !== $request->user()->id) {
            abort(403, 'You do not own this event.');
        }

        return TicketTypeResource::collection($event->ticketTypes);
    }

    /**
     * Organizer: create ticket type for own event.
     */
    public function store(StoreTicketTypeRequest $request, Event $event)
    {
        $ticketType = $event->ticketTypes()->create($request->validated());

        return new TicketTypeResource($ticketType);
    }

    /**
     * Organizer: update own ticket type.
     */
    public function update(StoreTicketTypeRequest $request, Event $event, TicketType $ticketType)
    {
        if ($ticketType->event_id !== $event->id) {
            abort(404);
        }

        $ticketType->update($request->validated());

        return new TicketTypeResource($ticketType);
    }

    /**
     * Organizer: delete own ticket type (only if none sold).
     */
    public function destroy(Request $request, Event $event, TicketType $ticketType)
    {
        if ($event->organizer_id !== $request->user()->id) {
            abort(403, 'You do not own this event.');
        }

        if ($ticketType->event_id !== $event->id) {
            abort(404);
        }

        if ($ticketType->sold_count > 0) {
            abort(422, 'Cannot delete ticket type that has been purchased.');
        }

        $ticketType->delete();

        return response()->json(['message' => 'Ticket type deleted successfully.']);
    }
}