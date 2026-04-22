<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;

class Experiencia extends Model
{
    use HasFactory;

    protected $table = 'experiences';

    // Definim constants per als estats de les experiències
    public const STATUS_PUBLICADA = 'publicada';
    public const STATUS_ESBORRANY = 'esborrany';

    // 1. Camps que permetem omplir des d'un formulari (Protecció Mass Assignment)
    protected $fillable = [
        'user_id',
        'title',
        'body',
        'image_url',
        'latitude',
        'longitude',
        'status',
        'is_reported',
        'published_at',
        'votes_count', // Camp virtual per comptar vots (és un camp caché, no es guarda a la BD)
    ];

    // 2. Convertim automàticament els camps de data i coordenades
    protected $casts = [
        'published_at' => 'datetime',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    // Una experiència pertany a un únic usuari
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Una experiència pot tenir moltes categories (i viceversa)
    public function categories()
    {
        return $this->belongsToMany(Categoria::class, 'category_experience', 'experience_id', 'category_id');
    }

    // Una experiència pot tenir molts vots
    public function votes()
    {
        return $this->hasMany(Vote::class, 'experience_id');
    }

    // Una experiència pot tenir molts reports
    public function reports()
    {
        return $this->hasMany(Report::class, 'experience_id');
    }

    // Mutator per assegurar que l'estat sempre es guarda en minúscules i sense espais
    protected function status(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => strtolower(trim((string) $value))
        );
    }
}
