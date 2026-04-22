<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin Viatges',
                'email' => 'admin@viatges.cat',
                'password' => Hash::make('password123'), // Contrasenya encriptada
                'role' => 'admin',
                'bio' => 'Administrador principal de la plataforma Viatges.',
                'avatar_url' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Marc Viatger',
                'email' => 'marc@exemple.com',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'bio' => 'Apassionat de la muntanya i la fotografia de paisatges.',
                'avatar_url' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Laura Explora',
                'email' => 'laura@exemple.com',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'bio' => 'Sempre buscant racons històrics i escapades romàntiques.',
                'avatar_url' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}