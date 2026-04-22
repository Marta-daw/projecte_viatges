<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    //

    public function store(Request $request, int $id)
    {

        $request->validate([
            'value' => ['required', 'in:1,-1'], // Si volem permetre vots positius i negatius
        ]);

        // Lògica per votar una experiència
        $userId = auth()->id();

        Vote::updateOrCreate(
            ['user_id' => $userId, 'experience_id' => $id],
            ['value' => (int) $request->value]
        );

        return back()->with('success', 'Voto registrado correctamente.');
    }

    public function destroy(int $id)
    {
        Vote::where('user_id', auth()->id())
            ->where('experience_id', $id)
            ->delete();

        return back()->with('success', 'Voto eliminado correctamente.');
    }
}
