<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Experiencia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    use AuthorizesRequests;

    public function index() {}

    public function myExperiences()
    {
        $user = Auth::user();
        $experiencies = Experiencia::with('user:id,name')
            ->where('user_id', $user->id)
            // ->with('user:id,name')
            ->where('status', Experiencia::STATUS_PUBLICADA) // Normalitzem el valor d'status en minúscules per evitar problemes de majúscules/minúscules
            ->latest()
            ->get();

        return Inertia::render('ManageExperience', [
            'experiencies' => $experiencies->map(function ($experience) {
                return [
                    'id' => $experience->id,
                    'title' => $experience->title,
                    'body' => $experience->body,
                    'image_url' => $experience->image_url,
                    'status' => $experience->status,
                    'user' => [
                        'id' => $experience->user?->id,
                        'name' => $experience->user?->name,
                    ],
                    'can' => [
                        'update' => Auth::user()->can('update', $experience),
                        'delete' => Auth::user()->can('delete', $experience),
                    ],
                ];
            }),
            'isAuthenticated' => Auth::check(),
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
            'status' => ['required', 'in:' . implode(',', [
                Experiencia::STATUS_PUBLICADA,
                Experiencia::STATUS_ESBORRANY,
            ])],
            'category_id' => ['nullable', 'exists:categories,id'],
        ]);

        $status = $validated['status'];

        $data = [
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'body' => $validated['body'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'status' => $status,
            'published_at' => $status === Experiencia::STATUS_PUBLICADA ? now() : null,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('experiences', 'public');
            $data['image_url'] = '/storage/' . $path;
        }

        $experiencia = Experiencia::create($data);

        if (! empty($validated['category_id'])) {
            // Relacionem la categoria escollida des del select
            $experiencia->categories()->attach($validated['category_id']);
        }

        return redirect()->route('experiences.myExperiencies')
            ->with('success', 'Experiència creada correctament! 🎉');
    }

    public function show($id)
    {
        // Busquem l'experiència o llançem un error 404 si no existeix
        $experience = Experiencia::with('user', 'categories')->findOrFail($id);

        $categoryIds = $experience->categories->pluck('id');

        // Experiències relacionades: prioritzem mateixes categories i, si no n'hi ha prou,
        // completem amb les últimes publicades.
        $relatedExperiences = Experiencia::query()
            ->with(['user:id,name', 'categories:id,name'])
            ->where('status', Experiencia::STATUS_PUBLICADA)
            ->where('id', '!=', $experience->id)
            ->when(
                $categoryIds->isNotEmpty(),
                fn($query) => $query->whereHas('categories', fn($q) => $q->whereIn('categories.id', $categoryIds))
            )
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->limit(4)
            ->get();

        if ($relatedExperiences->count() < 4) {
            $remaining = 4 - $relatedExperiences->count();

            $fallbackExperiences = Experiencia::query()
                ->with(['user:id,name', 'categories:id,name'])
                ->where('status', Experiencia::STATUS_PUBLICADA)
                ->where('id', '!=', $experience->id)
                ->whereNotIn('id', $relatedExperiences->pluck('id'))
                ->orderByDesc('published_at')
                ->orderByDesc('created_at')
                ->limit($remaining)
                ->get();

            $relatedExperiences = $relatedExperiences->concat($fallbackExperiences)->values();
        }

        return Inertia::render('DetailedCardExperience', [
            'experience' => $experience,
            'Auth' => [
                'user' => Auth::user(),
            ],
            'categories' => $experience->categories,
            'votesCount' => $experience->votes()->sum('value'),
            'positiveVotes' => $experience->votes()->where('value', 1)->count(),
            'negativeVotes' => $experience->votes()->where('value', -1)->count(),
            'votedByUser' => Auth::check() ? $experience->votes()->where('user_id', Auth::id())->value('value') : null,
            'reported' => Auth::check() ? $experience->reports()->where('user_id', Auth::id())->exists() : false,
            'isAutenticated' => Auth::check(),
            'relatedExperiences' => $relatedExperiences,
        ]);
    }

    public function create()
    {
        $categories = Categoria::all();

        // Li enviem les dades al component de React anomenat 'Home'
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
            'image' => ['nullable', 'image'],
        ]);

        $data['user_id'] = Auth::id(); // assignem id d'usuari

        Experiencia::create($data);

        return redirect()->route('experiences.index');
    }

    public function edit($id)
    {
        // Busquem l'experiència o llançem un error 404 si no existeix
        $experience = Experiencia::findOrFail($id);
        $this->authorize('update', $experience);
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

    public function update(Request $request, Experiencia $experiencia)
    {
        // Busquem l'experiència o llançem un error 404 si no existeix
        // $experience = Experiencia::findOrFail($id);

        $this->authorize('update', $experiencia);

        // Validem les dades del formulari d'edició
        $data = $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'latitude' => ['nullable'],
            'longitude' => ['nullable'],
            'image' => ['nullable', 'image'],
            'category_id' => ['nullable', 'exists:categories,id'],
        ]);

        // Afegim la gestió de la imatge
        if ($request->hasFile('image')) {
            $data['image_url'] = '/storage/' . $request->file('image')->store('experiences', 'public');
        }

        unset($data['image']); // Treiem el camp 'image' ja que el camp del model és 'image_url'

        // Actualitzem les dades de l'experiència
        $experiencia->update($data);

        return redirect()->route('experiences.myExperiencies')
            ->with('success', 'Experiència actualitzada correctament!');
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
