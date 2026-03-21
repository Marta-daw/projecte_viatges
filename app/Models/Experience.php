<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    //
    protected $table = 'experiences';

    protected $fillable = [
        'user_id',
        'title',
        'body',
        'image_url',
        'latitude',
        'longitude',
        'status',
        'published_at',
    ];

    // Relación con el usuario creador
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
