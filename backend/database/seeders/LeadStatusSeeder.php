<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LeadStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'New', 'color' => 'gray', 'sort_order' => 1],
            ['name' => 'Contacted', 'color' => 'info', 'sort_order' => 2],
            ['name' => 'Negotiating', 'color' => 'warning', 'sort_order' => 3],
            ['name' => 'Won', 'color' => 'success', 'sort_order' => 4],
            ['name' => 'Lost', 'color' => 'danger', 'sort_order' => 5],
            ['name' => 'Junk', 'color' => 'secondary', 'sort_order' => 6],
        ];

        foreach ($statuses as $status) {
            \App\Models\LeadStatus::firstOrCreate(['name' => $status['name']], $status);
        }
    }
}
