<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiencia;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Models\Categoria;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ExperienceController extends Controller
{
    use AuthorizesRequests;
    public function index() {}

    public function myExperiences()
    {
        $experiencies = Experiencia::where('user_id', auth()->id())
            ->latest()
            ->get();
        return Inertia::render('ManageExperience', [
            'experiencies' => $experiencies->map(function ($experience) {
                return [
                    'id' => $experience->id,
                    'title' => $experience->title,
                    'body' => $experience->body,
                    'image_url' => $experience->image_url,
                    'can' => [
                        'update' => Auth::user()->can('update', $experience),
                        'delete' => Auth::user()->can('delete', $experience),
                    ]
                ];
            }),
            'isAutenticated' => Auth::check(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'image' => ['nullable', 'file', 'image', 'max:5120'], // Max 5MB
            'status' => ['required', 'in:publicada,esborrany'],
            'category_id' => ['nullable', 'exists:categories,id']
        ]);

        $status = $validated['status'];

        $data = [
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'body' => $validated['body'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'status' => $status,
            'published_at' => $status === 'publicada' ? now() : null,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('experiences', 'public');
            $data['image_url'] = '/storage/' . $path;
        }

        $experiencia = Experiencia::create($data);

        if (!empty($validated['category_id'])) {
            // Relacionem la categoria escollida des del select
            $experiencia->categories()->attach($validated['category_id']);
        }

        return redirect()->route('experiences.myExperiencies');
    }

    public function show($id)
    {
        // Busquem l'experiència o llançem un error 404 si no existeix
        $experience = Experiencia::with('user', 'categories')->findOrFail($id);

        return Inertia::render('DetailedCardExperience', [
            'experience' => $experience
        ]);
    }

    public function create()
    {
        $categories = Categoria::all();

        // Le enviamos los datos al componente de React llamado 'Home'
        return Inertia::render('CreateExperience', [
            'categories' => $categories,
            'experience' => null,
            'isEdit' => false,
        ]);

        $data = $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'latitude' => ['nullable'],
            'longitude' => ['nullable'],
            'image' => ['nullable', 'image']
        ]);

        $data['user_id'] = Auth::id(); // assignem id d'usuari

        Experiencia::create($data);

        return redirect()->route('experiences.index');
    }

    public function edit ($id)
    {
        // Busquem l'experiència o llançem un error 404 si no existeix
        $experience = Experiencia::findOrFail($id);
        $this -> authorize('update', $experience);
        // Verifiquem que l'experiència pertany a l'usuari autenticat
        // Si no és així, retornem un error 403 (Forbidden)
        if ($experience->user_id !== Auth::id()) {
            abort(403, 'No tens permís per editar aquesta experiència.');
        }

        // Obtenim totes les categories per mostrar-les al select del formulari d'edició
        $categories = Categoria::all();

        // Retornem la vista d'edició amb les dades de l'experiència i les categories
        return Inertia::render('CreateExperience', [
            'categories' => $categories,
            'experience' => $experience,
            'isEdit' => true,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Busquem l'experiència o llançem un error 404 si no existeix
        $experience = Experiencia::findOrFail($id);
        
        $this -> authorize('update', $id);

        // Validem les dades del formulari d'edició
        $data = $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'latitude' => ['nullable'],
            'longitude' => ['nullable'],
            'image' => ['nullable', 'image'],
            'category_id' => ['nullable', 'exists:categories,id']
        ]);
        // Actualitzem les dades de l'experiència
        $experience->update($data);

        return redirect()->route('experiences.myExperiencies');
    }

    public function destroy($id)
    {
        // Busquem l'experiència o llançem un error 404 si no existeix
        $experience = Experiencia::findOrFail($id);

        // Verifiquem que l'experiència pertany a l'usuari autenticat
        if ($experience->user_id !== Auth::id()) {
            abort(403, 'No tens permís per eliminar aquesta experiència.');
        }

        // Eliminem l'experiència
        $experience->delete();

        return redirect()->route('experiences.myExperiencies');
    }
}
