<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $table = 'categories';

    // L'únic camp que permetem omplir massivament és el nom
    protected $fillable = ['name'];

    // Una categoria pot estar assignada a moltes experiències
    public function experiences()
    {
        return $this->belongsToMany(Experiencia::class, 'category_experience', 'category_id', 'experience_id');
    }
}
