<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductsController;

Route::post('login', [AuthController::class, 'store']);

Route::middleware('auth:sanctum')->group(function() {

    Route::prefix('v1')->group(function() {

        Route::prefix('categories')->group(function() {

            Route::post('/', [CategoriesController::class, 'store']);
            Route::put('/{id}', [CategoriesController::class, 'update']);
            Route::get('/{id}', [CategoriesController::class, 'show']);
            Route::get('/', [CategoriesController::class, 'index']);
            Route::delete('/{id}', [CategoriesController::class, 'destroy']);

        });

        Route::prefix('products')->group(function() {

            Route::post('/', [ProductsController::class, 'store']);
            Route::put('/{id}', [CategoriesController::class, 'update']);
            Route::get('/{id}', [CategoriesController::class, 'show']);
            Route::get('/', [CategoriesController::class, 'index']);
            Route::delete('/{id}', [CategoriesController::class, 'destroy']);

        });
    });

    Route::delete('logout', [AuthController::class, 'destroy']);
});
