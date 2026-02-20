<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionUpdateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define new permissions
        $permissions = [
            'manage_roles',
            'manage_permissions',
            'manage_verticals',
            'manage_enquiry_types',
        ];

        // Create permissions if they don't exist
        foreach ($permissions as $permissionName) {
            Permission::findOrCreate($permissionName, 'web');
        }

        // Assign all permissions to Super Admin
        $superAdmin = Role::where('name', 'Super Admin')->first();
        if ($superAdmin) {
            $superAdmin->givePermissionTo(Permission::all());
        }

        // Assign management permissions to Manager
        $manager = Role::where('name', 'Manager')->first();
        if ($manager) {
            $manager->givePermissionTo([
                'manage_verticals',
                'manage_enquiry_types',
                'Add Users',
                'Delete Users',
                'Modify User Permission',
                'view_leads',
                'create_leads',
                'edit_leads',
                'delete_leads',
                'move_leads'
            ]);
        }
    }
}
