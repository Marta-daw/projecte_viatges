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
        Schema::create('category_experience', function (Blueprint $table) {
            // Clau forana cap a categories
            $table->foreignId('category_id')
                ->constrained()
                ->onDelete('cascade');

            // Clau forana cap a experiències
            $table->foreignId('experience_id')
                ->constrained()
                ->onDelete('cascade');

            // Clau primària composta per evitar duplicats exactes
            $table->primary(['category_id', 'experience_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_experience');
    }
};
