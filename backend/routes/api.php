<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\AuthController;

// Routes d'authentification (login, register)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::get('/reset-password/{token}', [AuthController::class, 'showResetForm'])->name('password.reset');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');


// Routes pour les hôtels
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{hotel}', [HotelController::class, 'show']); 

// Routes protégées nécessitant un token d'authentification
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/hotels', [HotelController::class, 'userHotels']);
    Route::post('/hotels', [HotelController::class, 'store']);
    Route::put('/hotels/{hotel}', [HotelController::class, 'update']);
    Route::delete('/hotels/{hotel}', [HotelController::class, 'destroy']);
});
Route::get('/test', function() {
    return response()->json(['message' => 'Backend OK']);
});
