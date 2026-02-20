<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ManagerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $manager = $request->user();
        
        // Ensure the user is a manager (custom logic depending on your role system)
        if (!$manager->hasRole('Manager') && !$manager->hasRole('Super Admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $date = $request->input('date', Carbon::today()->toDateString());
        $subordinates = $manager->subordinates;
        $subordinateIds = $subordinates->pluck('id');
        $subordinateNames = $subordinates->pluck('name');

        // 1. Team Activity (Logins & Daily Stats)
        $teamActivity = $subordinates->map(function ($user) use ($date) {
            $stats = $this->getUserStatsForDate($user, $date);
            
            $lastLogin = $user->loginActivities()
                ->whereDate('login_at', $date)
                ->latest()
                ->first();

            return [
                'id' => $user->id,
                'name' => $user->name,
                'last_login' => $lastLogin ? $lastLogin->login_at : null,
                'is_logged_in' => (bool)$lastLogin,
                'leads_assigned' => $stats['assigned'],
                'leads_connected' => $stats['connected'],
                'leads_converted' => $stats['converted'],
            ];
        });

        // 2. Aggregated Team Stats
        $aggregatedStats = [
            'total_assigned' => $teamActivity->sum('leads_assigned'),
            'total_connected' => $teamActivity->sum('leads_connected'),
            'total_converted' => $teamActivity->sum('leads_converted'),
        ];

        // 3. Combined Team Leads Feed with Remarks
        $teamLeads = Lead::whereIn('assign_to', $subordinateNames)
            ->with(['status', 'notes.user'])
            ->latest('updated_at')
            ->paginate(15);

        return response()->json([
            'aggregated_stats' => $aggregatedStats,
            'team_activity' => $teamActivity,
            'team_leads' => $teamLeads,
        ]);
    }

    private function getUserStatsForDate($user, $date)
    {
        // Assigned today
        $assigned = Lead::where('assign_to', $user->name)
            ->whereDate('created_at', $date)
            ->count();

        // Connected (Status 'Contacted', ID 2)
        // Note: Without history, we check current status and updated_at
        $connected = Lead::where('assign_to', $user->name)
            ->where('lead_status_id', 2)
            ->whereDate('updated_at', $date)
            ->count();

        // Converted (Status 'Won', ID 4)
        $converted = Lead::where('assign_to', $user->name)
            ->where('lead_status_id', 4)
            ->whereDate('updated_at', $date)
            ->count();

        return [
            'assigned' => $assigned,
            'connected' => $connected,
            'converted' => $converted,
        ];
    }
}
