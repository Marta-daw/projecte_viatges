<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiencia; // Asegúrate de importar tu modelo
use Inertia\Inertia; // Importamos Inertia
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Models\Categoria;

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

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(
            [
                'title' => ['require', 'string',]
            ]
        );

        $experiencia = Experiencia::create($data);
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
