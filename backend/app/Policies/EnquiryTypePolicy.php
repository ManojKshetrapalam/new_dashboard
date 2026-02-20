<?php

namespace App\Policies;

use App\Models\User;
use App\Models\EnquiryType;
use Illuminate\Auth\Access\Response;

class EnquiryTypePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_enquiry_types');
    }

    public function view(User $user, EnquiryType $enquiryType): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_enquiry_types');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_enquiry_types');
    }

    public function update(User $user, EnquiryType $enquiryType): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_enquiry_types');
    }

    public function delete(User $user, EnquiryType $enquiryType): bool
    {
        return $user->hasRole('Super Admin') || $user->hasPermissionTo('manage_enquiry_types');
    }
}
