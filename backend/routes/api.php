<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\EventCategoryController;
use App\Http\Controllers\Api\TicketTypeController;
use App\Http\Controllers\Api\VenueController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CheckInController;


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

// Public (Attendee)
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);
Route::get('/event-categories', [EventCategoryController::class, 'index']);

// Organizer only
Route::middleware(['auth:sanctum', 'role:organizer'])->prefix('organizer')->group(function () {
    Route::get('/events', [EventController::class, 'myEvents']);
    Route::get('/events/{event}', [EventController::class, 'myEventDetail']);
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{event}', [EventController::class, 'update']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);
    Route::post('/events/{event}/submit', [EventController::class, 'submit']);
    Route::post('/events/{event}/publish', [EventController::class, 'publish']);
    Route::post('/events/{event}/cancel', [EventController::class, 'cancel']);

    Route::get('/events/{event}/ticket-types', [TicketTypeController::class, 'index']);
    Route::post('/events/{event}/ticket-types', [TicketTypeController::class, 'store']);
    Route::put('/events/{event}/ticket-types/{ticketType}', [TicketTypeController::class, 'update']);
    Route::delete('/events/{event}/ticket-types/{ticketType}', [TicketTypeController::class, 'destroy']);
});

// Admin only
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/events/pending', [EventController::class, 'pendingApprovals']);
    Route::post('/events/{event}/approve', [EventController::class, 'approve']);
});

// Venues (shared: organizer & admin bisa create, cuma admin bisa update/delete)
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

// Orders (any authenticated user can buy tickets)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/events/{event}/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::post('/orders/{order}/pay', [OrderController::class, 'pay']);
    Route::get('/tickets', [OrderController::class, 'myTickets']);
});

Route::middleware(['auth:sanctum', 'role:staff'])->prefix('staff')->group(function () {
    Route::post('/events/{event}/check-in', [CheckInController::class, 'checkIn']);
});