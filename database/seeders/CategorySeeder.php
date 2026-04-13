<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Aventures',
            'Muntanyisme',
            'Familiar',
            'Històric',
            'Romàntic',
            'Cultura',
            'Gastronomia',
            'Relax',
            'Platja'
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}