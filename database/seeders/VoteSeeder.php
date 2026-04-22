<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VoteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('votes')->delete();

        $userIds = DB::table('users')->pluck('id')->all();
        $experienceIds = DB::table('experiences')
            ->where('status', 'publicada')
            ->pluck('id')
            ->all();

        if (empty($userIds) || empty($experienceIds)) {
            return;
        }

        $rows = [];
        $now = Carbon::now();

        foreach ($experienceIds as $experienceId) {
            // Entre 1 i 3 vots per experiència (o el màxim d'usuaris disponibles)
            $votesForExperience = random_int(1, min(3, count($userIds)));
            $randomUsers = collect($userIds)->shuffle()->take($votesForExperience)->values();

            foreach ($randomUsers as $index => $userId) {
                // Lleuger biaix cap al vot positiu
                $value = random_int(1, 100) <= 72 ? 1 : -1;

                $rows[] = [
                    'user_id' => $userId,
                    'experience_id' => $experienceId,
                    'value' => $value,
                    'created_at' => $now->copy()->subMinutes(($index + 1) * random_int(3, 40)),
                    'updated_at' => $now,
                ];
            }
        }

        if (!empty($rows)) {
            DB::table('votes')->insert($rows);
        }
    }
}
