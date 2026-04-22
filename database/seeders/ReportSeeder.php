<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reports')->delete();

        $users = DB::table('users')->pluck('id')->all();
        $publishedExperienceIds = DB::table('experiences')
            ->where('status', 'publicada')
            ->pluck('id')
            ->all();

        if (count($users) < 1 || count($publishedExperienceIds) < 1) {
            return;
        }

        // Reset flag i marquem algunes experiències com reportades
        DB::table('experiences')->update(['is_reported' => false]);

        $reportedIds = collect($publishedExperienceIds)->shuffle()->take(min(5, count($publishedExperienceIds)))->values();

        $sampleReasons = [
            'Contingut confús o amb informació incompleta.',
            'El text inclou dades que poden no ser correctes.',
            'Descripció massa breu per entendre bé la ruta.',
            'Possible contingut duplicat d’una altra experiència.',
            'Llenguatge poc adequat en alguns fragments.',
        ];

        $now = Carbon::now();
        $rows = [];

        foreach ($reportedIds as $experienceId) {
            $reporterId = $users[array_rand($users)];

            $rows[] = [
                'user_id' => $reporterId,
                'experience_id' => $experienceId,
                'reason' => $sampleReasons[array_rand($sampleReasons)],
                'status' => random_int(1, 100) <= 75 ? 'pending' : 'reviewed',
                'created_at' => $now->copy()->subHours(random_int(1, 72)),
                'updated_at' => $now,
            ];
        }

        if (!empty($rows)) {
            DB::table('reports')->insert($rows);
            DB::table('experiences')->whereIn('id', $reportedIds->all())->update(['is_reported' => true]);
        }
    }
}
