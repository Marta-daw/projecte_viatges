<?php

namespace App\Http\Controllers;
use App\Models\Experiencia;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    //

    public function store (Request $request, int $id)
    {

        $request->validate([
            'value' => ['required', 'in:1,-1'] // Si queremos permitir votos positivos y negativos
        ]);

        // Lógica para votar una experiencia
        $userId = auth()->id();

        Vote::updateOrCreate(
            ['user_id' => $userId, 'experience_id' => $id],
            ['value' => (int) $request->value]
        );

        return back()->with('success', 'Voto registrado correctamente.');
    }

    //toggle per votar o eliminar el vot
    public function destroy (int $id)
    {
        Vote::where('user_id', auth()->id())
            ->where('experience_id', $id)
            ->delete();

        return back()->with('success', 'Voto eliminado correctamente.');
    }
}

