<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Music', 'Sport', 'Workshop', 'Technology', 'Business', 'Conference'];

        foreach ($categories as $category) {
            EventCategory::firstOrCreate(
                ['slug' => Str::slug($category)],
                ['name' => $category, 'is_active' => true]
            );
        }
    }
}