<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiencia;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Models\Categoria;
use Illuminate\Support\Facades\Auth;

class ExperienceController extends Controller
{
    public function index()
    {
        // Cogemos las últimas experiencias publicadas
        $experiencies = Experiencia::where('status', 'publicada')
            ->orderBy('published_at', 'desc')
            ->get();

        // Le enviamos los datos al componente de React llamado 'Home'
        return Inertia::render('CreateExperience', [
            'experiencies' => $experiencies
        ]);
    }

    public function store(Request $request)
    {
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

    public function create()
    {
        $categories = Categoria::all();

        // Le enviamos los datos al componente de React llamado 'Home'
        return Inertia::render('CreateExperience', [
            'categories' => $categories
        ]);
    }
}
