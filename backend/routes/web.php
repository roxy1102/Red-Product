<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Backend Laravel actif']);
});

Route::get('/healthz', function () {
    return response()->json(['status' => 'ok']);
});
