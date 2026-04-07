<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\DashboardController;
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
// Route::get('/experiencies', [ExperienceController::class, 'index'])->name('experiences.index');
// Route::get('/experiencies/create', [ExperienceController::class, 'create'])->name('experiences.create');
// Route::post('/experiencies', [ExperienceController::class, 'store'])->name('experiencies.store');
// Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])->name('experiences.myExperiencies');
// Route::get('/experiencia/{id}', [ExperienceController::class, 'show'])->name('experiencia.show');

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

//Rutas que solo se necesitan autenticación
Route::middleware(['auth'])->group(function () {
    Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])
        ->name('experiences.myExperiencies');
    // A la linia 125 del ExperienceController.php es redirigeix a aquesta ruta, però al posar-la al
    //navegador no funciona, mirar a veure com es pot solucionar
    Route::get('/experiencies', [ExperienceController::class, 'index'])->name('experiences.index');
    Route::get('/experiencies/create', [ExperienceController::class, 'create'])->name('experiences.create');
    Route::post('/experiencia', [ExperienceController::class, 'store'])
        ->name('experiences.store');
    Route::get('/experiencia/{experiencia}', [ExperienceController::class, 'show'])
        ->name('experiences.show');
    Route::get('/experiencia/{experiencia}/edit', [ExperienceController::class, 'edit'])
        ->name('experiences.edit');
    Route::put('/experiencia/{experiencia}', [ExperienceController::class, 'update'])
        ->name('experiences.update');
    Route::delete('/experiencia/{experiencia}', [ExperienceController::class, 'destroy'])
        ->name('experiences.destroy');
});

// Rutas privadas (requieren autht y verificación de email)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/experiencia/vote/{id}', [VoteController::class, 'store'])
        ->name('experiencia.vote.store');
    Route::delete('/experiencia/vote/{id}', [VoteController::class, 'destroy'])
        ->name('experiencia.vote.destroy');
    Route::post('/experiencia/report/{id}', [ReportController::class, 'report'])
        ->name('experiencia.report');
});

require __DIR__ . '/auth.php';
