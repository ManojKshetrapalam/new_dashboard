<?php

namespace Database\Seeders;

use App\Models\EnquiryType;
use Illuminate\Database\Seeder;

class EnquiryTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            'Venue',
            'Catering',
            'Photography',
            'Decoration',
            'Mehendi',
            'Music',
            'Other',
        ];

        foreach ($types as $type) {
            EnquiryType::firstOrCreate(['name' => $type]);
        }
    }
}
