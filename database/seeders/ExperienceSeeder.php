<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            [
                'user_id' => 2,
                'title' => 'Ruta pels Pirineus: Vall de Núria',
                'body' => '## Una escapada inoblidable
Aquest cap de setmana hem fet una ruta impressionant per la **Vall de Núria**. Hem agafat el cremallera des de Ribes de Freser. 
* Vistes espectaculars.
* Clima perfecte.
Recomano portar bon calçat i aigua.',
                'image_url' => 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
                'latitude' => 42.3961,
                'longitude' => 2.1534,
                'status' => 'publicada',
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'user_id' => 3,
                'title' => 'Cap de setmana romàntic a Roma',
                'body' => '## La Ciutat Eterna
No hi ha res com passejar de nit pel centre de Roma. Vam visitar el Coliseu i vam tirar una moneda a la Fontana di Trevi.
> "Roma no es va fer en un dia, però es pot estimar en un segon."
Un viatge 10/10.',
                'image_url' => 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
                'latitude' => 41.8902,
                'longitude' => 12.4922,
                'status' => 'publicada',
                'published_at' => Carbon::now()->subDays(1),
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'user_id' => 2,
                'title' => 'Trekking pel Montseny (Esborrany)',
                'body' => 'Encara estic preparant les fotos d\'aquesta ruta. Aviat actualitzaré el post!',
                'image_url' => null,
                'latitude' => 41.7833,
                'longitude' => 2.4000,
                'status' => 'esborrany',
                'published_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];

        DB::table('experiences')->insert($experiences);

        // Relacionamos las experiencias con las categorías en la tabla pivot category_experience
        // Asumiendo que: 1=Aventures, 2=Muntanyisme, 3=Familiar, 4=Històric, 5=Romàntic
        DB::table('category_experience')->insert([
            ['experience_id' => 1, 'category_id' => 2], // Vall de Núria -> Muntanyisme
            ['experience_id' => 1, 'category_id' => 1], // Vall de Núria -> Aventures
            ['experience_id' => 2, 'category_id' => 5], // Roma -> Romàntic
            ['experience_id' => 2, 'category_id' => 4], // Roma -> Històric
        ]);
    }
}