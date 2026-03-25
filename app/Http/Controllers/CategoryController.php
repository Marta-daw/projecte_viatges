<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Categoria::all();

        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }
}
