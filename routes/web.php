<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicUserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\VoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* Route::get('/', function () {
 return Inertia::render('Welcome', [
 'canLogin' => Route::has('login'),
 'canRegister' => Route::has('register'),
 'laravelVersion' => Application::VERSION,
 'phpVersion' => PHP_VERSION,
 ]);
 }); */

// Rutes públiques
Route::get('/', [HomeController::class, 'index'])->name('HomeViatges');
Route::get('/experiencies/load-more', [HomeController::class, 'loadMore'])->name('experiences.loadMore');
Route::get('/usuari/{user}', [PublicUserController::class, 'show'])->name('users.public.show');
Route::get('/condicions-us', fn() => Inertia::render('TermsOfUse'))->name('terms.show');
// Experiencies
// Route::get('/experiencies', [ExperienceController::class, 'index'])->name('experiences.index');
// Route::get('/experiencies/create', [ExperienceController::class, 'create'])->name('experiences.create');
// Route::post('/experiencies', [ExperienceController::class, 'store'])->name('experiencies.store');
// Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])->name('experiences.myExperiencies');
// Route::get('/experiencia/{id}', [ExperienceController::class, 'show'])->name('experiencia.show');

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// Rutes que només necessiten autenticació
Route::middleware(['auth'])->group(function () {
    Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])
        ->name('experiences.myExperiencies');
    // A la línia 125 d'ExperienceController.php es redirigeix a aquesta ruta, però en posar-la al
    // navegador no funciona; cal mirar com es pot solucionar
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

// Rutes privades (requereixen auth i verificació de correu)
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

    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/categories', [AdminController::class, 'gestionarCategories'])->name('admin.categories');
    Route::get('admin/reports', [AdminController::class, 'gestionarReports'])->name('admin.reports');
    Route::get('admin/experiences', [AdminController::class, 'gestionarExperiences'])->name('admin.experiences');
    Route::get('admin/users', [AdminController::class, 'gestionarUsers'])->name('admin.users');

    // CRUD Categories
    Route::post('admin/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('admin/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('admin/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    // Admin Reports Management
    Route::delete('admin/reports/{experiencia}/delete', [AdminController::class, 'deleteReport'])->name('admin.reports.delete');
    Route::delete('admin/reports/{experiencia}/resolve', [AdminController::class, 'resolveReport'])->name('admin.reports.resolve');
    Route::put('admin/reports/{experiencia}/reject', [AdminController::class, 'rejectReport'])->name('admin.reports.reject');

    // Admin Experiences Management
    Route::delete('admin/experiences/{experiencia}', [AdminController::class, 'deleteExperience'])->name('admin.experiences.delete');
    Route::get('admin/experiences/{experiencia}/edit', [AdminController::class, 'editExperience'])->name('admin.experiences.edit');
    Route::put('admin/experiences/{experiencia}', [AdminController::class, 'updateExperience'])->name('admin.experiences.update');

    // Admin Users Management
    Route::delete('admin/users/{user}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    Route::post('admin/users/{user}/ban', [AdminController::class, 'banUser'])->name('admin.users.ban');
    Route::post('admin/users/{user}/unban', [AdminController::class, 'unbanUser'])->name('admin.users.unban');
});

require __DIR__.'/auth.php';
