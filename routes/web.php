<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
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

    Route::get('/profile/experiencies', [ExperienceController::class, 'myExperiences'])
        ->name('experiences.myExperiencies');

    Route::get('/experiencia/{id}', [ExperienceController::class, 'show'])
        ->name('experiencia.show');

    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/categories', [AdminController::class, 'gestionarCategories'])->name('admin.categories');
    Route::get('admin/reports', [AdminController::class, 'gestionarReports'])->name('admin.reports');
    Route::get('admin/experiences', [AdminController::class, 'gestionarExperiences'])->name('admin.experiences');
    Route::get('admin/users', [AdminController::class, 'gestionarUsers'])->name('admin.users');

    // CRUD Categorías
    Route::post('admin/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('admin/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('admin/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    // Admin Reports Management
    Route::delete('admin/reports/{experiencia}/delete', [AdminController::class, 'deleteReport'])->name('admin.reports.delete');
    Route::delete('admin/reports/{experiencia}/resolve', [AdminController::class, 'resolveReport'])->name('admin.reports.resolve');
    Route::put('admin/reports/{experiencia}/reject', [AdminController::class, 'rejectReport'])->name('admin.reports.reject');

    // Admin Experiences Management
    Route::delete('admin/experiences/{experiencia}', [AdminController::class, 'deleteExperience'])->name('admin.experiences.delete');

    // Admin Users Management
    Route::delete('admin/users/{user}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    Route::post('admin/users/{user}/ban', [AdminController::class, 'banUser'])->name('admin.users.ban');
    Route::post('admin/users/{user}/unban', [AdminController::class, 'unbanUser'])->name('admin.users.unban');
});

require __DIR__.'/auth.php';
