<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExperienceController;
use Inertia\Inertia;

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

Route::get('/', [HomeController::class, 'index'])->name('HomeViatges');

// Experiencies
Route::get('/experiencies', [ExperienceController::class, 'index'])->name('experiences.index');
Route::get('/experiencies/create', [ExperienceController::class, 'create'])->name('experiences.create');
Route::post('/experiencies', [ExperienceController::class, 'store'])->name('experiencies.store');
Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])->name('experiences.myExperiencies');
Route::get('/experiencia/{id}', [ExperienceController::class, 'show'])->name('experiencia.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
