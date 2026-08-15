<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ticket_code' => $this->ticket_code,
            'status' => $this->status,
            'checked_in_at' => $this->checked_in_at,
            'ticket_type' => $this->whenLoaded('orderItem', fn () => [
                'name' => $this->orderItem->ticketType->name,
            ]),
            'event' => $this->whenLoaded('orderItem', fn () => [
                'id' => $this->orderItem->ticketType->event->id,
                'name' => $this->orderItem->ticketType->event->name,
                'start_date' => $this->orderItem->ticketType->event->start_date,
                'start_time' => $this->orderItem->ticketType->event->start_time,
            ]),
        ];
    }
}