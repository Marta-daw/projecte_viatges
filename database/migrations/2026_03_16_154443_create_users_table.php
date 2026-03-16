<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('name'); // Nom de l'usuari
            $table->string('email')->unique();
            $table->string('password');

            $table->text('bio')->nullable(); // Biografía del usuario
            $table->string('avatar_url')->nullable();

            $table->enum('role', ['user', 'admin'])->default('user');

            // Aquest camp l'afegeix laravel per defecte, es molt útil per a la funció "Recordar sessió"
            $table->rememberToken();

            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
