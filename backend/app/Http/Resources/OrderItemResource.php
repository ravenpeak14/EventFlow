<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ticket_type' => $this->whenLoaded('ticketType', fn () => [
                'id' => $this->ticketType->id,
                'name' => $this->ticketType->name,
            ]),
            'quantity' => $this->quantity,
            'price_at_purchase' => (float) $this->price_at_purchase,
            'subtotal' => (float) $this->price_at_purchase * $this->quantity,
        ];
    }
}