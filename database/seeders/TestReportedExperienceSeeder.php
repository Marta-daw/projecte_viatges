<?php

namespace Database\Seeders;

use App\Models\Experiencia;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestReportedExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener el primer usuario o crear uno si no existe
        $user = User::first();
        if (! $user) {
            $user = User::create([
                'name' => 'Usuari de Test',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        // Crear una experiencia reportada de prueba
        Experiencia::create([
            'user_id' => $user->id,
            'title' => 'Trekking en Montserrat',
            'body' => 'Una experiencia increíble explorando las montañas de Montserrat. Ideal para amantes de la naturaleza y el senderismo. La ruta ofrece vistas espectaculares de los acantilados y formaciones rocosas únicas.',
            'image_url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3',
            'latitude' => 41.5853,
            'longitude' => 1.8353,
            'status' => 'publicada',
            'is_reported' => true,
            'published_at' => now(),
        ]);
    }
}
