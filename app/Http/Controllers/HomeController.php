<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experiencia;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $experiencies = Experiencia::latest()->take(3)->get();
        return Inertia::render('HomeViatges', [
            'llista' => $experiencies,
        ]);
    }
}