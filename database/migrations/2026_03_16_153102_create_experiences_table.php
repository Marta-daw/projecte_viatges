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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            // Relació amb l'usuari creador
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('title'); // Títol

            // Text de longitud variable (ideal per markdown o HTML)
            $table->longText('body');

            // Imatge destacada (ruta o URL del CDN)
            $table->string('image_url')->nullable();

            // Coordenades per a Google Maps o OpenStreetMap + Leaflet
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            // Estat: esborrany, publicada o rebutjada
            $table->enum('status', ['esborrany', 'publicada', 'rebutjada'])->default('esborrany');

            // Si l'experiència té reports
            $table->boolean('is_reported')->default(false);

            // Data de publicació real
            $table->timestamp('published_at')->nullable();

            // Crea automàticament 'created_at' i 'updated_at'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
