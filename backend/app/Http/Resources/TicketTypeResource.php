<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketTypeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => (float) $this->price,
            'quota' => $this->quota,
            'sold_count' => $this->sold_count,
            'available_quota' => $this->availableQuota(),
            'sale_starts_at' => $this->sale_starts_at,
            'sale_ends_at' => $this->sale_ends_at,
            'is_active' => $this->is_active,
            'is_on_sale' => $this->isOnSale(),
        ];
    }
}