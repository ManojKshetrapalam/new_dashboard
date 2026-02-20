<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $verticals = \App\Models\Vertical::all();
        if ($verticals->isEmpty()) return;

        $vendors = [
            [
                'business_name' => 'Grand Palace Venue',
                'contact_person' => 'Rajesh Sharma',
                'email' => 'rajesh@grandpalace.com',
                'mobile' => '9876543210',
                'vertical_id' => $verticals->random()->id,
                'status' => 'Active',
                'subscription_starts_at' => now()->subMonths(2),
                'subscription_expires_at' => now()->addMonths(10),
            ],
            [
                'business_name' => 'Royal Catering',
                'contact_person' => 'Priya Mehta',
                'email' => 'priya@royalcatering.com',
                'mobile' => '9876543211',
                'vertical_id' => $verticals->random()->id,
                'status' => 'Subscribed',
                'subscription_starts_at' => now()->subDays(5),
                'subscription_expires_at' => now()->addYear(),
            ],
            [
                'business_name' => 'Snap Studio',
                'contact_person' => 'Amit Verma',
                'email' => 'amit@snapstudio.com',
                'mobile' => '9876543212',
                'vertical_id' => $verticals->random()->id,
                'status' => 'Registered',
            ],
            [
                'business_name' => 'Old Decorators',
                'contact_person' => 'Suresh Gupta',
                'email' => 'suresh@olddecor.com',
                'mobile' => '9876543213',
                'vertical_id' => $verticals->random()->id,
                'status' => 'Expired',
                'subscription_starts_at' => now()->subYear(),
                'subscription_expires_at' => now()->subMonths(1),
            ],
        ];

        foreach ($vendors as $vendor) {
            \App\Models\Vendor::firstOrCreate(['email' => $vendor['email']], $vendor);
        }
    }
}
