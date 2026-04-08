<?php

namespace App\Providers;

//use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

use App\Models\Experiencia;
use App\Policies\ExperiencePolicy;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        Experiencia::class => ExperiencePolicy::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        
        Gate::before(function ($user, $ability) {
            return $user->role === 'admin' ? true : null; // Els administradors poden fer qualsevol acció
            /* if ($user->role === 'admin') {
                return true; // Els administradors poden fer qualsevol acció
            } */
        });
    }
}
