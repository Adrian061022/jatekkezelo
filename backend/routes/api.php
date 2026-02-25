<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\LibraryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Test endpoint
Route::get('/test', function () {
    return response()->json(['message' => 'API működik']);
});

// Public routes
Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{game}', [GameController::class, 'show']);
Route::get('/categories', function () {
    return \App\Models\Category::select('id', 'name', 'slug')->get();
});

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    
    // User Library
    Route::get('/library', [LibraryController::class, 'index']);
    Route::post('/library/purchase/{game}', [LibraryController::class, 'purchase']);
    Route::get('/library/check/{game}', [LibraryController::class, 'checkOwnership']);
    Route::post('/library/add-funds', [LibraryController::class, 'addFunds']);
    
    // Admin only - Game management
    Route::middleware('admin')->group(function () {
        Route::post('/games', [GameController::class, 'store']);
        Route::put('/games/{game}', [GameController::class, 'update']);
        Route::delete('/games/{game}', [GameController::class, 'destroy']);
    });
});
