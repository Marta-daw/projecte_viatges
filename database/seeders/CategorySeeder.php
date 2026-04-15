<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->delete();

        $categories = [
            'Aventures',
            'Muntanyisme',
            'Familiar',
            'Històric',
            'Romàntic',
            'Cultura',
            'Gastronomia',
            'Relax',
            'Platja',
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}