<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // Basic stats for the vendor/agent
        $totalLeads = Lead::where(function($query) use ($user) {
            $query->where('assign_to', $user->name)
                  ->orWhereIn('vertical_id', $user->verticals->pluck('id'));
        })->count();

        $conversionRate = 12; // Placeholder until we have more data logic

        $recentLeads = Lead::where(function($query) use ($user) {
            $query->where('assign_to', $user->name)
                  ->orWhereIn('vertical_id', $user->verticals->pluck('id'));
        })
        ->with('status')
        ->latest()
        ->limit(5)
        ->get();

        return response()->json([
            'stats' => [
                'total_leads' => $totalLeads,
                'conversion_rate' => $conversionRate,
            ],
            'recent_leads' => $recentLeads,
        ]);
    }
}
