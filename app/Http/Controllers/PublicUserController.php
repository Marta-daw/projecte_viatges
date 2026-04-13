<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class PublicUserController extends Controller
{
    public function show(User $user)
    {
        $publicExperiences = $user->experiences()
            ->where('status', 'publicada')
            ->with(['user:id,name', 'categories:id,name'])
            ->withCount([
                'votes as positive_votes_count' => fn($q) => $q->where('value', 1),
                'votes as negative_votes_count' => fn($q) => $q->where('value', -1),
            ])
            ->latest()
            ->get();

        return Inertia::render('PublicUserProfile', [
            'profileUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'bio' => $user->bio,
                'avatar_url' => $user->avatar_url,
                'created_at' => $user->created_at,
            ],
            'experiences' => $publicExperiences,
            'stats' => [
                'published_count' => $publicExperiences->count(),
            ],
        ]);
    }
}
