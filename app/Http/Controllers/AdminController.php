<?php

namespace App\Http\Controllers;

use App\Models\Experiencia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categoria;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function gestionarCategories()
    {
        $categories = Categoria::all();
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function gestionarReports()
    {
        // Buscar experiències que estiguin marcades com reportades
        $reports = Experiencia::where('is_reported', true)->get();
        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports
        ]);
    }
}