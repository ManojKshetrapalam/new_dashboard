<?php

namespace App\Policies;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_roles');
    }

    public function view(User $user, Role $role): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_roles');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_roles');
    }

    public function update(User $user, Role $role): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_roles');
    }

    public function delete(User $user, Role $role): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_roles');
    }
}
