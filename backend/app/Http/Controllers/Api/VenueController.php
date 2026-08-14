<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVenueRequest;
use App\Http\Resources\VenueResource;
use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function index(Request $request)
    {
        $venues = Venue::query()
            ->when($request->search, fn ($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->when($request->city, fn ($q) => $q->where('city', $request->city))
            ->orderBy('name')
            ->paginate(20);

        return VenueResource::collection($venues);
    }

    public function store(StoreVenueRequest $request)
    {
        $venue = Venue::create($request->validated());

        return new VenueResource($venue);
    }

    public function update(StoreVenueRequest $request, Venue $venue)
    {
        if (! $request->user()->hasRole('admin')) {
            abort(403, 'Only admin can edit venues.');
        }

        $venue->update($request->validated());

        return new VenueResource($venue);
    }

    public function destroy(Request $request, Venue $venue)
    {
        if (! $request->user()->hasRole('admin')) {
            abort(403, 'Only admin can delete venues.');
        }

        if ($venue->events()->exists()) {
            abort(422, 'Cannot delete venue that is used by existing events.');
        }

        $venue->delete();

        return response()->json(['message' => 'Venue deleted successfully.']);
    }
}