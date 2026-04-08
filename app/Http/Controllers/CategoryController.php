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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories'
        ]);

        Categoria::create($validated);

        return redirect()->back()->with('success', 'Categoria creada!');
    }

    public function update(Request $request, Categoria $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id
        ]);

        $category->update($validated);

        return redirect()->back()->with('success', 'Categoria actualitzada!');
    }

    public function destroy(Categoria $category)
    {
        $category->delete();

        return redirect()->back()->with('success', 'Categorea eliminada!');
    }
}
