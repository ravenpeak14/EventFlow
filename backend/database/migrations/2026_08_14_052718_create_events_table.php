<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_category_id')->constrained()->restrictOnDelete();
            $table->foreignId('venue_id')->nullable()->constrained()->restrictOnDelete();
            $table->foreignId('organizer_id')->constrained('users')->restrictOnDelete();

            $table->string('name');
            $table->string('slug')->unique();
            $table->longText('description');
            $table->string('banner')->nullable();

            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();

            $table->date('start_date');
            $table->date('end_date');
            $table->time('start_time');
            $table->time('end_time');

            $table->unsignedInteger('capacity')->nullable();

            $table->longText('terms_conditions')->nullable();
            $table->json('faq')->nullable();

            $table->string('status')->default('draft');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};