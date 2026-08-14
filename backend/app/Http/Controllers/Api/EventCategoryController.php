<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventCategoryResource;
use App\Models\EventCategory;

class EventCategoryController extends Controller
{
    public function index()
    {
        $categories = EventCategory::where('is_active', true)
            ->orderBy('name')
            ->get();

        return EventCategoryResource::collection($categories);
    }
}