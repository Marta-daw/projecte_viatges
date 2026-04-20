<?php

namespace App\Http\Controllers;

use App\Models\Experiencia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    private function publishedExperiencesQuery()
    {
        return Experiencia::query()
            ->with(['user:id,name'])
            ->where('status', Experiencia::STATUS_PUBLICADA)
            ->withCount([
                'votes as positive_votes_count' => fn($q) => $q->where('value', 1),
                'votes as negative_votes_count' => fn($q) => $q->where('value', -1),
            ])
            ->latest();
    }

    public function index()
    {
        $perPage = 6;
        $paginator = $this->publishedExperiencesQuery()->paginate($perPage);

        return Inertia::render('HomeViatges', [
            'llista' => $paginator->items(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'has_more_pages' => $paginator->hasMorePages(),
                'per_page' => $paginator->perPage(),
            ],
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function loadMore(Request $request)
    {
        $page = max(1, (int) $request->integer('page', 1));
        $perPage = (int) $request->integer('per_page', 6);
        $perPage = min(max($perPage, 3), 24);

        $paginator = $this->publishedExperiencesQuery()->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $paginator->items(),
            'current_page' => $paginator->currentPage(),
            'has_more_pages' => $paginator->hasMorePages(),
            'per_page' => $paginator->perPage(),
        ]);
    }
}