<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vertical;
use Illuminate\Auth\Access\Response;

class VerticalPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_verticals');
    }

    public function view(User $user, Vertical $vertical): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_verticals');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_verticals');
    }

    public function update(User $user, Vertical $vertical): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_verticals');
    }

    public function delete(User $user, Vertical $vertical): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_verticals');
    }
}
