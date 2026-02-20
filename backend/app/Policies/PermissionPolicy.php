<?php

namespace App\Policies;

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Illuminate\Auth\Access\Response;

class PermissionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_permissions');
    }

    public function view(User $user, Permission $permission): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_permissions');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_permissions');
    }

    public function update(User $user, Permission $permission): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_permissions');
    }

    public function delete(User $user, Permission $permission): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_permissions');
    }
}
