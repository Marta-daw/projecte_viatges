<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Experiencia;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $stats = [
            'experiencesCount' => Experiencia::count(),
            'usersCount' => User::count(),
            'categoriesCount' => Categoria::count(),
            'reportsCount' => Experiencia::where('is_reported', true)->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    public function gestionarCategories()
    {
        $categories = Categoria::all();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function gestionarReports()
    {
        // Buscar experiències que estiguin marcades com reportades
        $reports = Experiencia::where('is_reported', true)
            ->with('user')
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
        ]);
    }

    /**
     * Marcar un reporte como revisado
     */
    public function resolveReport(Experiencia $experiencia)
    {
        $experiencia->update([
            'is_reported' => false,
        ]);

        return back()->with('success', 'Reporte marcado como revisado');
    }

    /**
     * Eliminar una experiencia reportada
     */
    public function deleteReport(Experiencia $experiencia)
    {
        $experiencia->delete();

        return back()->with('success', 'Experiencia eliminada correctamente');
    }

    /**
     * Rechazar un reporte sin eliminar la experiencia
     */
    public function rejectReport(Experiencia $experiencia)
    {
        $experiencia->update([
            'is_reported' => false,
        ]);

        return back()->with('success', 'Reporte rechazado');
    }
}
