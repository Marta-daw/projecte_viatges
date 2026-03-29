<?php

namespace App\Http\Controllers;
use App\Models\Experiencia;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    //

    public function vote (Request $request, $id)
    {

        $request->validate([
            'value' => ['required', 'integer', 'in:1,-1'], // Si queremos permitir votos positivos y negativos
        ]);

        // Lógica para votar una experiencia
        $experience = Experiencia::findOrFail($id);
        $userId = auth()->id();

        $experience->votes()->updateOrCreate(
            ['user_id' => $userId],
            ['value' => $request->value] // Per defecte, el valor del vot és +1
        );

        return response()->json([
            'message' => 'Vot registrat',
            'voted' => true,
            'votesCount' => $experience -> votes() -> cout(),
        ], 200);
    }

    //toggle per votar o eliminar el vot
    public function toggleVote (Request $request, $id)
    {
        $experience = Experiencia::findOrFail($id);
        $userId = auth()->id();
        $value = $request->value; // Per defecte, el valor del vot és +1

        $isVoted = $experience->votes()->where('user_id', $userId)->first();

        if ($isVoted) {
            if ($isVoted->value == $value) {
                // Si el usuario ya ha votado lo mismo, eliminamos el voto
                $isVoted->votes()->detach($userId);
                $votedByUser = null;
            } else {
                // Botón contrario — cambiar voto
                $experience->votes()->updateExistingPivot($userId, ['value' => $value]);
                $votedByUser = $value;
            }
        } else {
            // Sin voto previo — crear
            $experience->votes()->attach($userId, ['value' => $value]);
            $votedByUser = $value;
        }
        return redirect()->back()->with([
            'votesCount'  => $experience->votes()->sum('value'),
            'positiveVotes' => $experience->votes()->where('value', 1)->count(),
            'negativeVotes' => $experience->votes()->where('value', -1)->count(),
            'votedByUser' => $votedByUser,
        ]);
    }
}

