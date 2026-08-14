<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_category_id',
        'venue_id',
        'organizer_id',
        'name',
        'slug',
        'description',
        'banner',
        'contact_email',
        'contact_phone',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'capacity',
        'terms_conditions',
        'faq',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'faq' => 'array',
        ];
    }

    public function category()
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }
    public function schedules()
    {
        return $this->hasMany(EventSchedule::class)->orderBy('order')->orderBy('time');
    }

    public function speakers()
    {
        return $this->hasMany(EventSpeaker::class);
    }
}