<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TicketTypeResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'banner' => $this->banner,
            'contact_email' => $this->contact_email,
            'contact_phone' => $this->contact_phone,
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('Y-m-d'),
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'capacity' => $this->capacity,
            'terms_conditions' => $this->terms_conditions,
            'faq' => $this->faq,
            'status' => $this->status,

            'category' => $this->whenLoaded('category', fn () => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ]),

            'venue' => $this->whenLoaded('venue', fn () => $this->venue ? [
                'id' => $this->venue->id,
                'name' => $this->venue->name,
                'address' => $this->venue->address,
                'city' => $this->venue->city,
                'map_url' => $this->venue->map_url,
            ] : null),

            'organizer' => $this->whenLoaded('organizer', fn () => [
                'id' => $this->organizer->id,
                'name' => $this->organizer->name,
            ]),

            'schedules' => $this->whenLoaded('schedules', fn () => $this->schedules->map(fn ($s) => [
                'time' => $s->time,
                'activity' => $s->activity,
            ])),

            'speakers' => $this->whenLoaded('speakers', fn () => $this->speakers->map(fn ($s) => [
                'name' => $s->name,
                'title' => $s->title,
                'photo' => $s->photo,
                'bio' => $s->bio,
            ])),

            'ticket_types' => TicketTypeResource::collection($this->whenLoaded('ticketTypes')),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}