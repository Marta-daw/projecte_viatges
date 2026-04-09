<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Experiencia;
use App\Models\User;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reports')->delete();

        // Assegurem que l'experiència 1 està marcada com a reportada
        DB::table('experiences')->where('id', 1)->update(['is_reported' => true]);

        $reports = [
            [
                'user_id' => 3,
                'experience_id' => 1,
                'reason' => 'Aquesta ruta és perillosa i la descripció no ho avisa.',
                'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1, // Admin (per exemple)
                'experience_id' => 1,
                'reason' => 'He rebut diverses queixes externes.',
                'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];

        DB::table('reports')->insert($reports);
    }
}
