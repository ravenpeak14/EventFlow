<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (\Illuminate\Http\Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/ping', function () {
        return response()->json(['message' => 'You are an admin!']);
    });
});


use App\Http\Controllers\Api\EventController;

// Public (Attendee)
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

// Organizer only
Route::middleware(['auth:sanctum', 'role:organizer'])->prefix('organizer')->group(function () {
    Route::get('/events', [EventController::class, 'myEvents']);
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{event}', [EventController::class, 'update']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);
});

use App\Http\Controllers\Api\EventCategoryController;

Route::get('/event-categories', [EventCategoryController::class, 'index']);

// Organizer: lifecycle actions
Route::middleware(['auth:sanctum', 'role:organizer'])->prefix('organizer')->group(function () {
    Route::get('/events', [EventController::class, 'myEvents']);
    Route::get('/events/{event}', [EventController::class, 'myEventDetail']);
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{event}', [EventController::class, 'update']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);
    Route::post('/events/{event}/submit', [EventController::class, 'submit']);
    Route::post('/events/{event}/publish', [EventController::class, 'publish']);
    Route::post('/events/{event}/cancel', [EventController::class, 'cancel']);
});

// Admin: approval
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::post('/events/{event}/approve', [EventController::class, 'approve']);
});


use App\Http\Controllers\Api\VenueController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/venues', [VenueController::class, 'index']);

    Route::middleware('role:organizer|admin')->group(function () {
        Route::post('/venues', [VenueController::class, 'store']);
    });

    Route::middleware('role:admin')->group(function () {
        Route::put('/venues/{venue}', [VenueController::class, 'update']);
        Route::delete('/venues/{venue}', [VenueController::class, 'destroy']);
    });
});