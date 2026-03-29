<?php

namespace App\Http\Controllers;
use App\Models\Experiencia;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    // Lógica para reportar una experiencia
    public function report (Request $request, $id)
    {
        $experience = Experiencia::findOrFail($id);
        $userId = auth()->id();
        
        $isReport = Report::where('user_id', $userId)->where('experience_id', $id)->exists();
        //Comprovar si l'usuari ja ha reportat l'experiència
        if ($isReport) {
            return response()->json([
                'message' => 'Ja has reportat aquesta experiència',
                'reported' => true,
            ], 400);
        }
        
        $request->validate([
            'reason' => ['nullable', 'string', 'max:255'],
        ]);

        Report::create([
            'user_id' => $userId,
            'experience_id' => $experience->id,
            'reason' => $request->reason,
            'status' => 'pendent', // O 'revisat' segons la lògica que vulguem implementar
        ]);

        return response()->json([
            'message' => 'Experiencia reportada correctament',
        ], 200);
    }
}
