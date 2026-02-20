<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->foreignId('lead_status_id')
                ->nullable()
                ->after('assign_to')
                ->constrained('lead_statuses')
                ->nullOnDelete();
            
            $table->decimal('revenue_amount', 12, 2)->default(0)->after('lead_status_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropForeign(['lead_status_id']);
            $table->dropColumn(['lead_status_id', 'revenue_amount']);
        });
    }
};
