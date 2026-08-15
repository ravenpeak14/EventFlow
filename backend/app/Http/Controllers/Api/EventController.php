<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Exceptions\InvalidEventTransitionException;

class EventController extends Controller
{
    /**
     * Public: list published events (Attendee - Explore/Home).
     */
    public function index(Request $request)
    {
        $events = Event::query()
            ->whereIn('status', ['published', 'ongoing', 'completed'])
            ->with(['category', 'venue'])
            ->when($request->category, fn($q) => $q->whereHas('category', fn($c) => $c->where('slug', $request->category)))
            ->when($request->city, fn($q) => $q->whereHas('venue', fn($v) => $v->where('city', $request->city)))
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->orderBy('start_date')
            ->paginate(10);

        return EventResource::collection($events);
    }

    /**
     * Public: event detail (Attendee - Event Detail page).
     */
    public function show(Event $event)
    {
        if (!in_array($event->status, ['published', 'ongoing', 'completed'])) {
            abort(404);
        }

        $event->load(['category', 'venue', 'organizer', 'schedules', 'speakers', 'ticketTypes']);

        return new EventResource($event);
    }

    /**
     * Organizer: list own events, any status.
     */
    public function myEvents(Request $request)
    {
        $events = Event::query()
            ->where('organizer_id', $request->user()->id)
            ->with(['category', 'venue'])
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->orderByDesc('created_at')
            ->paginate(10);

        return EventResource::collection($events);
    }

    /**
     * Organizer: view own event detail, any status.
     */
    public function myEventDetail(Request $request, Event $event)
    {
        if ($event->organizer_id !== $request->user()->id) {
            abort(403, 'You do not own this event.');
        }

        $event->load(['category', 'venue', 'schedules', 'speakers']);

        return new EventResource($event);
    }
    public function store(StoreEventRequest $request)
    {
        $event = Event::create([
            ...$request->validated(),
            'organizer_id' => $request->user()->id,
            'slug' => $this->generateUniqueSlug($request->name),
            'status' => 'draft',
        ]);

        return new EventResource($event->load(['category', 'venue']));
    }

    /**
     * Organizer: update own event.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $event->update($request->validated());

        return new EventResource($event->load(['category', 'venue']));
    }

    /**
     * Organizer: delete own event (only if still draft).
     */
    public function destroy(Request $request, Event $event)
    {
        if ($event->organizer_id !== $request->user()->id) {
            abort(403, 'You do not own this event.');
        }

        if ($event->status !== 'draft') {
            abort(422, 'Only draft events can be deleted.');
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully.']);
    }

    private function generateUniqueSlug(string $name): string
    {
        $slug = \Illuminate\Support\Str::slug($name);
        $original = $slug;
        $count = 1;

        while (Event::where('slug', $slug)->exists()) {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }

    public function submit(Request $request, Event $event)
    {
        if ($event->organizer_id !== $request->user()->id) {
            abort(403, 'You do not own this event.');
        }

        if ($event->status !== 'draft') {
            throw new InvalidEventTransitionException($event->status, 'submitted');
        }

        $event->update(['status' => 'submitted']);

        return new EventResource($event);
    }

    public function approve(Event $event)
    {
        if ($event->status !== 'submitted') {
            throw new InvalidEventTransitionException($event->status, 'approved');
        }

        $event->update(['status' => 'approved']);
        $event->load(['category', 'venue', 'organizer']);

        return new EventResource($event);
    }

    public function publish(Request $request, Event $event)
    {
        if ($event->organizer_id !== $request->user()->id) {
            abort(403, 'You do not own this event.');
        }

        if ($event->status !== 'approved') {
            throw new InvalidEventTransitionException($event->status, 'published');
        }

        if (!$event->venue_id) {
            abort(422, 'Event must have a venue before publishing.');
        }

        $event->update(['status' => 'published']);
        $event->load(['category', 'venue']);

        return new EventResource($event);
    }

    public function cancel(Request $request, Event $event)
    {
        if ($event->organizer_id !== $request->user()->id) {
            abort(403, 'You do not own this event.');
        }

        if ($event->status !== 'published') {
            throw new InvalidEventTransitionException($event->status, 'cancelled');
        }

        $event->update(['status' => 'cancelled']);

        return new EventResource($event);
    }

    /**
     * Admin: list events waiting for approval.
     */
    public function pendingApprovals()
    {
        $events = Event::where('status', 'submitted')
            ->with(['category', 'venue', 'organizer'])
            ->orderBy('updated_at')
            ->paginate(10);

        return EventResource::collection($events);
    }
}