<?php

namespace Database\Seeders;

use App\Models\Vertical;
use Illuminate\Database\Seeder;

class VerticalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $verticals = [
            'Medical',
            'Construction',
            'IT Hardware',
            'IT Software',
            'Education',
            'Real Estate',
        ];

        foreach ($verticals as $vertical) {
            Vertical::firstOrCreate(['name' => $vertical]);
        }
    }
}
