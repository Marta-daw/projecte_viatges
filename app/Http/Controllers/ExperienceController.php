<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiencia;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Models\Categoria;
<<<<<<< HEAD
<<<<<<< HEAD
use Illuminate\Support\Facades\Auth;
=======
>>>>>>> af49bb6 (feat: Implement category management, revamp the experience creation form with new UI components and styling, and remove the Experience model.)
=======
use Illuminate\Support\Facades\Auth;
>>>>>>> eb2895f (feat: creació d'experiències completa)

class ExperienceController extends Controller
{
    public function index() {}

    public function myExperiences()
    {
        $experiencies = Experiencia::where('user_id', auth()->id())
            ->latest()
            ->get();
        return Inertia::render('perfil/experiencies', [
            'experiencies' => $experiencies
        ]);
    }

    public function store(Request $request)
    {
<<<<<<< HEAD
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numericl'],
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

        return redirect()->route('experiences.index');
    }

    public function create()
    {
        $categories = Categoria::all();

        // Le enviamos los datos al componente de React llamado 'Home'
        return Inertia::render('CreateExperience', [
            'categories' => $categories
        ]);
=======
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
>>>>>>> eb2895f (feat: creació d'experiències completa)
    }

    public function create()
    {
        $categories = Categoria::all();

        // Le enviamos los datos al componente de React llamado 'Home'
        return Inertia::render('CreateExperience', [
            'categories' => $categories
        ]);
    }
}
