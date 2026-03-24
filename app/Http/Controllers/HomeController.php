<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiencia;
use Inertia\Inertia;

class HomeController extends Controller
{
    //

    public function index()
    {
        //Obtenim dades de la BBDD
        $experiencies = Experiencia::latest()->take(3)->get();

        //Renderitzem la pàgina de React i li passem les dades com a array
        return Inertia::render('HomeViatges', [
            'llista' => $experiencies,
            // 'canLogin' => Route::has('login'),
            // 'canRegister' => Route::has('register'),
            // 'laravelVersion' => Application::VERSION,
            // 'phpVersion' => PHP_VERSION,
        ]);
    }
}
