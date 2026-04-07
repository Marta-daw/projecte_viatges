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
     * Gestionar experiencias
     */
    public function gestionarExperiences()
    {
        $experiences = Experiencia::with(['user', 'categories'])->get();

        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences,
        ]);
    }

    /**
     * Gestionar usuarios
     */
    public function gestionarUsers()
    {
        $users = User::withCount('experiences')->get();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Eliminar experiencia
     */
    public function deleteExperience(Experiencia $experiencia)
    {
        $experiencia->delete();

        return back()->with('success', 'Experiencia eliminada correctamente');
    }

    /**
     * Eliminar usuario
     */
    public function deleteUser(User $user)
    {
        // Opcionalmente, elimina las experiencias del usuario también
        $user->experiences()->delete();
        $user->delete();

        return back()->with('success', 'Usuario eliminado correctamente');
    }

    /**
     * Banear usuario
     */
    public function banUser(User $user)
    {
        $user->update(['is_banned' => true]);

        return back()->with('success', 'Usuario baneado correctamente');
    }

    /**
     * Desbanear usuario
     */
    public function unbanUser(User $user)
    {
        $user->update(['is_banned' => false]);

        return back()->with('success', 'Usuario desbaneado correctamente');
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
