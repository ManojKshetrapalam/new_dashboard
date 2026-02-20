<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\VendorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    Route::get('/leads', [LeadController::class, 'index']);
    Route::get('/leads/upcoming-followups', [LeadController::class, 'upcomingFollowups']);
    Route::get('/lead-statuses', function() {
        return \App\Models\LeadStatus::orderBy('sort_order')->get();
    });
    Route::get('/leads/{id}', [LeadController::class, 'show']);
    Route::patch('/leads/{id}/status', [LeadController::class, 'updateStatus']);
    Route::post('/leads/{id}/purchase', [LeadController::class, 'purchase']);
    Route::post('/leads/{id}/notes', [LeadController::class, 'addNote']);
    Route::get('/vendor/profile', [VendorController::class, 'profile']);
    Route::post('/vendor/subscription', [VendorController::class, 'updateSubscription']);

    // Manager Routes
    Route::get('/manager/dashboard', [\App\Http\Controllers\Api\ManagerDashboardController::class, 'index']);
});
