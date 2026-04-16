<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiencia;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $experiencies = Experiencia::query()
            ->with(['user:id,name'])
            ->where('status', Experiencia::STATUS_PUBLICADA)//Normalitzem el valor de status a minúscules per evitar problemes de majúsculas/minúsculas
            ->withCount([
                'votes as positive_votes_count' => fn ($q) => $q->where('value', 1),
                'votes as negative_votes_count' => fn ($q) => $q->where('value', -1),
            ])
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('HomeViatges', [
            'llista' => $experiencies,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
}