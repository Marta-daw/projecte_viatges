<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_banned',
        'bio',
        'avatar_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Un usuari pot crear moltes experiències
    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    // Un usuari pot votar moltes experiències (i viceversa)
    public function votes()
    {
        return $this->belongsToMany(Experience::class, 'votes', 'user_id', 'experience_id')->withTimestamps();
    }

    // Un usuari pot reportar moltes experiències
    public function reports()
    {
        return $this->hasMany(Report::class, 'user_id');
    }
}
