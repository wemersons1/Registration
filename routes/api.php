<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('login', [AuthController::class, 'store']);

Route::middleware('auth:sanctum')->group(function() {

    Route::prefix('v1')->group(function() {

    });

    Route::delete('logout', [AuthController::class, 'destroy']);
});
