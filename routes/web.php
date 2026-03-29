<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExperienceController;
use Inertia\Inertia;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\ReportController;

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

// Rutas públicas
Route::get('/', [HomeController::class, 'index'])->name('HomeViatges');

// Experiencies
Route::get('/experiencies', [ExperienceController::class, 'index'])->name('experiences.index');
Route::get('/experiencies/create', [ExperienceController::class, 'create'])->name('experiences.create');
Route::post('/experiencies', [ExperienceController::class, 'store'])->name('experiencies.store');
Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])->name('experiences.myExperiencies');
Route::get('/experiencia/{id}', [ExperienceController::class, 'show'])->name('experiencia.show');

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas privadas (requieren auth)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])
        ->name('experiences.myExperiencies');

    Route::get('/experiencia/{id}', [ExperienceController::class, 'show'])
        ->name('experiencia.show');
    Route::get('/experiencia/edit/{id}', [ExperienceController::class, 'edit'])
        ->name('experiencia.edit');
    Route::put('/experiencia/{id}', [ExperienceController::class, 'update'])
        ->name('experiencia.update');
    Route::delete('/experiencia/{id}', [ExperienceController::class, 'destroy'])
        ->name('experiencia.destroy');

    /* Route::post('/experiencia/vote/{id}', [VoteController::class, 'vote'])
        ->name('experiencia.vote'); */
    Route::post('/experiencia/vote/toggle/{id}', [VoteController::class, 'toggleVote'])
        ->name('experiencia.toggleVote');
    Route::post('/experiencia/report/{id}', [ReportController::class, 'report'])
        ->name('experiencia.report');
});

require __DIR__ . '/auth.php';
