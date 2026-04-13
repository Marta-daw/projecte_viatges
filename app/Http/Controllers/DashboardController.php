<?php

namespace App\Http\Controllers;

use App\Models\Experiencia;
use App\Models\Categoria;
use Inertia\Inertia;

class DashboardController extends Controller
{
    
    //
    public function index()
    {

        $authId= auth()->id();
        //Obtenim dades de la BBDD
        $experiencies = Experiencia::query()
            ->with(['user:id,name'])
            ->withCount([
                'votes as positive_votes_count' => fn($q) => $q->where('value', 1),
                'votes as negative_votes_count' => fn($q) => $q->where('value', -1),
            ])
            ->latest()
            ->get()
            ->map(function ($exp) use ($authId){
                $exp -> can = [
                    'update' => $authId != null && (int) $exp->user_id === (int) $authId,
                    'delete' => $authId !== null && (int) $exp->user_id === (int) $authId,
                ];
                return $exp;
            });

        $categories = Categoria::all();

        
        //Renderitzem la pàgina de React i li passem les dades com a array
        return Inertia::render('Dashboard', [
            // 'llista' => $experiencies,
            // 'categories' => $categories,
            'llista' => Experiencia::with(['categories', 'user'])->where('status', 'publicada')->latest()->get(),
            'categories' => Categoria::all(),
        ]);
    }
}
