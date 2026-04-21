<?php

namespace App\Http\Controllers;

use App\Models\Experiencia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Consulta base reutilitzable d'experiències publicades.
     *
     * Inclou l'autor mínim necessari i el recompte de vots positius/negatius
     * per evitar càlculs repetits al frontend.
     */
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

    /**
     * Renderitza la home amb dues estratègies:
     * - Visitant: només 3 experiències recents, sense càrrega progressiva.
     * - Usuari autenticat: paginació inicial i suport per infinite scroll.
     */
    public function index()
    {
        $isAuthenticated = auth()->check();

        if (! $isAuthenticated) {
            $latestExperiences = $this->publishedExperiencesQuery()
                ->take(3)
                ->get();

            return Inertia::render('HomeViatges', [
                'llista' => $latestExperiences,
                'pagination' => [
                    'current_page' => 1,
                    'last_page' => 1,
                    'has_more_pages' => false,
                    'per_page' => 3,
                ],
                'auth' => [
                    'user' => null,
                ],
            ]);
        }

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

    /**
     * Endpoint JSON per carregar més experiències al fer scroll.
     *
     * Per seguretat funcional, els visitants no poden paginar i sempre
     * reben una resposta buida.
     */
    public function loadMore(Request $request)
    {
        if (! auth()->check()) {
            return response()->json([
                'data' => [],
                'current_page' => 1,
                'has_more_pages' => false,
                'per_page' => 3,
            ]);
        }

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