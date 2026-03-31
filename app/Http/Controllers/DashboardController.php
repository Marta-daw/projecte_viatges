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
        $experiencies = Experiencia::latest()->take(3)->get();

        //Renderitzem la pàgina de React i li passem les dades com a array
        return Inertia::render('Dashboard', [
            'llista' => $experiencies,
        ]);
    }
}
