<?php

namespace App\Http\Controllers;

use App\Models\Experiencia;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        //Obtenim dades de la BBDD
        $experiencies = Experiencia::query()
            ->with(['user:id,name'])
            ->withCount([
                'votes as positive_votes_count' => fn ($q) => $q->where('value', 1),
                'votes as negative_votes_count' => fn ($q) => $q->where('value', -1),
            ])
            ->latest()
            ->get();


        //Renderitzem la pàgina de React i li passem les dades com a array
        return Inertia::render('Dashboard', [
            'llista' => $experiencies,
        ]);
    }
}
