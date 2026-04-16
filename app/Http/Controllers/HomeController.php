<?php

namespace App\Http\Controllers;

use App\Models\Experiencia;
use Inertia\Inertia;

class HomeController extends Controller
{
    //

    public function index()
    {
        // Obtenim dades de la BBDD
        $experiencies = Experiencia::query()
            ->with(['user:id,name'])
            ->where('status', Experiencia::STATUS_PUBLICADA)// Normalitzem el valor d'status en minúscules per evitar problemes de majúscules/minúscules
            ->withCount([
                'votes as positive_votes_count' => fn ($q) => $q->where('value', 1),
                'votes as negative_votes_count' => fn ($q) => $q->where('value', -1),
            ])
            ->latest()
            ->take(3)
            ->get();

        // Renderitzem la pàgina de React i li passem les dades com a array
        return Inertia::render('HomeViatges', [
            'llista' => $experiencies,
            'auth' => [
                'user' => auth()->user(),
            ],
            // 'auth' => auth() -> user(), // null si no hi ha sessió
        ]);
    }
}
