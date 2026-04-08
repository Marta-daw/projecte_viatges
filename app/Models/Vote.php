<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    // Model per a la taula de vots, si volem guardar informació addicional sobre els vots (com el valor del vot) podríem utilitzar aquest model. Si només volem una relació many-to-many simple, no és necessari crear un model específic.
    protected $fillable = [
        'user_id',
        'experience_id',
        'value', // Si volem guardar el valor del vot (per exemple, +1 o -1)
    ];
}
