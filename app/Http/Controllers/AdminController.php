<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Experiencia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
     * Gestionar experiències
     */
    public function gestionarExperiences()
    {
        $experiences = Experiencia::with(['user', 'categories'])->get();

        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences,
        ]);
    }

    /**
     * Gestionar usuaris
     */
    public function gestionarUsers()
    {
        $users = User::withCount('experiences')->get();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Eliminar experiència
     */
    public function deleteExperience(Experiencia $experiencia)
    {
        $experiencia->delete();

        return back()->with('success', 'Experiencia eliminada correctament');
    }

    /**
     * Mostrar formulari d'edició d'una experiència
     */
    public function editExperience(Experiencia $experiencia)
    {
        $categories = Categoria::all();
        $experiencia->load('categories');

        return Inertia::render('Admin/Experiences/Edit', [
            'experience' => $experiencia,
            'categories' => $categories,
        ]);
    }

    /**
     * Actualitzar una experiència des del panell admin
     */
    public function updateExperience(Request $request, Experiencia $experiencia)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'status' => ['required', 'in:' . implode(',', [
                Experiencia::STATUS_PUBLICADA,
                Experiencia::STATUS_ESBORRANY,
            ])],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'image' => ['nullable', 'file', 'image', 'max:5120'],
        ]);

        $status = strtolower(trim($validated['status'])); // Normalitzem el valor d'status en minúscules per evitar problemes de majúscules/minúscules

        $data = [
            'title' => $validated['title'],
            'body' => $validated['body'],
            'status' => $validated['status'],
            'latitude' => $validated['latitude'] ?? $experiencia->latitude,
            'longitude' => $validated['longitude'] ?? $experiencia->longitude,
            'published_at' => $status === Experiencia::STATUS_PUBLICADA
                ? ($experiencia->published_at ?? now())
                : null,
        ];

        // Handle image replacement
        if ($request->hasFile('image')) {
            // Delete old image if stored in public disk
            if ($experiencia->image_url && str_starts_with($experiencia->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $experiencia->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('experiences', 'public');
            $data['image_url'] = '/storage/' . $path;
        }

        $experiencia->update($data);

        // Sync category
        if (! empty($validated['category_id'])) {
            $experiencia->categories()->sync([$validated['category_id']]);
        } else {
            $experiencia->categories()->detach();
        }

        return redirect()
            ->route('admin.experiences')
            ->with('success', 'Experiència actualitzada correctament');
    }

    /**
     * Eliminar usuari
     */
    public function deleteUser(User $user)
    {
        // Opcionalment, elimina també les experiències de l'usuari
        $user->experiences()->delete();
        $user->delete();

        return back()->with('success', 'Usuari eliminat correctament');
    }

    /**
     * Banejar usuari
     */
    public function banUser(User $user)
    {
        $user->update(['is_banned' => true]);

        return back()->with('success', 'Usuari banejat correctament');
    }

    /**
     * Treure el bandeig a l'usuari
     */
    public function unbanUser(User $user)
    {
        $user->update(['is_banned' => false]);

        return back()->with('success', 'Usuari desbanejat correctament');
    }

    /**
     * Marcar un report com a revisat
     */
    public function resolveReport(Experiencia $experiencia)
    {
        $experiencia->update([
            'is_reported' => false,
        ]);

        return back()->with('success', 'Report marcat com a revisat');
    }

    /**
     * Eliminar una experiència reportada
     */
    public function deleteReport(Experiencia $experiencia)
    {
        $experiencia->delete();

        return back()->with('success', 'Experiècia eliminada correctament');
    }

    /**
     * Rebutjar un report sense eliminar l'experiència
     */
    public function rejectReport(Experiencia $experiencia)
    {
        $experiencia->update([
            'is_reported' => false,
        ]);

        return back()->with('success', 'Report rebutjat');
    }
}
