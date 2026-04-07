<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    //

    protected $fillable = [
        'user_id',
        'experience_id',
        'reason', // Si volem guardar la raó del report
        'status', // Per saber si el report està pendent o revisat
    ];
}
