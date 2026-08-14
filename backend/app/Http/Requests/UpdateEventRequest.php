<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        $event = $this->route('event');

        return $this->user()->hasRole('organizer')
            && $event->organizer_id === $this->user()->id;
    }

    public function rules(): array
    {
        return [
            'event_category_id' => ['sometimes', 'exists:event_categories,id'],
            'venue_id' => ['nullable', 'exists:venues,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'banner' => ['nullable', 'string'],
            'contact_email' => ['nullable', 'email'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'start_date' => ['sometimes', 'date'],
            'end_date' => ['sometimes', 'date', 'after_or_equal:start_date'],
            'start_time' => ['sometimes', 'date_format:H:i'],
            'end_time' => ['sometimes', 'date_format:H:i', 'after:start_time'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'terms_conditions' => ['nullable', 'string'],
            'faq' => ['nullable', 'array'],
            'faq.*.question' => ['required_with:faq', 'string'],
            'faq.*.answer' => ['required_with:faq', 'string'],
        ];
    }
}