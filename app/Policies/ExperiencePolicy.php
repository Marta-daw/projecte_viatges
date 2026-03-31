<?php

namespace App\Policies;

use App\Models\Experiencia;
use App\Models\User;
//use Illuminate\Auth\Access\Response;

class ExperiencePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Experiencia $experiencia): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Experiencia $experiencia): bool
    {
        //$this -> authorize('update', $experiencia);
        return (int) $user->id === (int) $experiencia->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Experiencia $experiencia): bool
    {
        //$this -> authorize('delete', $experiencia);
        return (int) $user->id === (int) $experiencia->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Experiencia $experiencia): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Experiencia $experiencia): bool
    {
        return false;
    }
}
