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
        
        // $isReport = Report::where('user_id', $userId)->where('experience_id', $id)->exists();
        // //Comprovar si l'usuari ja ha reportat l'experiència
        // if ($isReport) {
        //     return response()->json([
        //         'message' => 'Ja has reportat aquesta experiència',
        //         'reported' => true,
        //     ], 400);
        // }
        
        $data = $request->validate([
            'reason' => ['required', 'string', 'min:10', 'max:255'],
        ]);

        Report::firstOrCreate(
            ['user_id' => $userId, 'experience_id' => $id],
            ['reason' => $data['reason'], 'status' => 'pending']
        );

        // Filtrar per is_reported per adaptar-ho a el panell admin actual.
        $experience -> update (['is_reported' => true]);

        return back()->with('success', 'Experiencia reportada correctamente.');
    }
}
