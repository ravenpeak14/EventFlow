<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('organizer');
    }

    public function rules(): array
    {
        return [
            'event_category_id' => ['required', 'exists:event_categories,id'],
            'venue_id' => ['nullable', 'exists:venues,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'banner' => ['nullable', 'string'],
            'contact_email' => ['nullable', 'email'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'capacity' => ['nullable', 'integer', 'min:1'],
            'terms_conditions' => ['nullable', 'string'],
            'faq' => ['nullable', 'array'],
            'faq.*.question' => ['required_with:faq', 'string'],
            'faq.*.answer' => ['required_with:faq', 'string'],
        ];
    }
}