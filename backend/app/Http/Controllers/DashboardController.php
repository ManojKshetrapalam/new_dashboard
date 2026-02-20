<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use App\Models\LeadStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Filters
        $startDate = $request->input('startDate', now()->startOfMonth()->toDateString());
        $endDate = $request->input('endDate', now()->endOfMonth()->toDateString());
        $verticalId = $request->input('verticalId');

        // Base query for leads
        $leadQuery = Lead::query()
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);

        if ($verticalId) {
            $leadQuery->where('vertical_id', $verticalId);
        }

        // Apply Hierarchy Filtering
        if (!$user->hasRole('Super Admin')) {
            if ($user->hasAnyRole(['Manager', 'Team Lead'])) {
                $subordinateNames = User::where('reporting_to_id', $user->id)
                    ->pluck('name')
                    ->push($user->name);
                $leadQuery->whereIn('assign_to', $subordinateNames);
            } else {
                $leadQuery->where('assign_to', $user->name);
            }
        }

        // Aggregate Stats
        $totalLeads = (clone $leadQuery)->count();
        $totalRevenue = (clone $leadQuery)->sum('revenue_amount');
        
        $wonStatusId = LeadStatus::where('name', 'Won')->first()?->id;
        $wonLeads = (clone $leadQuery)->where('lead_status_id', $wonStatusId)->count();
        $wonRevenue = (clone $leadQuery)->where('lead_status_id', $wonStatusId)->sum('revenue_amount');
        
        $conversionRate = $totalLeads > 0 ? round(($wonLeads / $totalLeads) * 100, 2) : 0;

        // Team Performance (Filtered)
        $teamPerformance = [];
        if ($user->hasAnyRole(['Super Admin', 'Manager', 'Team Lead'])) {
            $relevantUsers = [];
            if ($user->hasRole('Super Admin')) {
                $relevantUsers = User::all();
            } else {
                $relevantUsers = User::where('reporting_to_id', $user->id)
                    ->orWhere('id', $user->id)
                    ->get();
            }

            foreach ($relevantUsers as $member) {
                $memberLeadsQuery = Lead::where('assign_to', $member->name)
                    ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);
                
                if ($verticalId) {
                    $memberLeadsQuery->where('vertical_id', $verticalId);
                }

                $memberLeadsCount = $memberLeadsQuery->count();
                $memberWonCount = (clone $memberLeadsQuery)->where('lead_status_id', $wonStatusId)->count();
                $memberRevenue = (clone $memberLeadsQuery)->where('lead_status_id', $wonStatusId)->sum('revenue_amount');
                
                $teamPerformance[] = [
                    'name' => $member->name,
                    'leads' => $memberLeadsCount,
                    'conversion' => $memberLeadsCount > 0 ? round(($memberWonCount / $memberLeadsCount) * 100, 2) : 0,
                    'revenue' => (float)$memberRevenue,
                ];
            }
        }

        // Vendor Funnel Stats (Filtered by vertical)
        $vendorQuery = \App\Models\Vendor::query();
        if ($verticalId) {
            $vendorQuery->where('vertical_id', $verticalId);
        }

        $vendorFunnel = [
            'Registered' => (clone $vendorQuery)->where('status', 'Registered')->count(),
            'Subscribed' => (clone $vendorQuery)->where('status', 'Subscribed')->count(),
            'Active'     => (clone $vendorQuery)->where('status', 'Active')->count(),
            'Expired'    => (clone $vendorQuery)->where('status', 'Expired')->count(),
        ];

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalLeads' => $totalLeads,
                'totalRevenue' => (float)$totalRevenue,
                'wonRevenue' => (float)$wonRevenue,
                'conversionRate' => $conversionRate,
            ],
            'teamPerformance' => $teamPerformance,
            'vendorFunnel' => $vendorFunnel,
            'verticals' => \App\Models\Vertical::all(['id', 'name']),
            'filters' => [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'verticalId' => $verticalId,
            ],
            'user' => [
                'name' => $user->name,
                'role' => $user->getRoleNames()->first(),
            ]
        ]);
    }

    public function exportLeads(Request $request)
    {
        $user = Auth::user();
        $startDate = $request->input('startDate', now()->startOfMonth()->toDateString());
        $endDate = $request->input('endDate', now()->endOfMonth()->toDateString());
        $verticalId = $request->input('verticalId');

        $query = Lead::query()
            ->with(['vertical', 'status'])
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);

        if ($verticalId) {
            $query->where('vertical_id', $verticalId);
        }

        // Apply Hierarchy Filtering
        if (!$user->hasRole('Super Admin')) {
            if ($user->hasAnyRole(['Manager', 'Team Lead'])) {
                $subordinateNames = User::where('reporting_to_id', $user->id)
                    ->pluck('name')
                    ->push($user->name);
                $query->whereIn('assign_to', $subordinateNames);
            } else {
                $query->where('assign_to', $user->name);
            }
        }

        $leads = $query->get();
        $fileName = 'leads_export_' . now()->format('Ymd_His') . '.csv';

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function() use($leads) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Date', 'Name', 'Mobile', 'City', 'Vertical', 'Status', 'Assigned To', 'Revenue']);

            foreach ($leads as $lead) {
                fputcsv($file, [
                    $lead->created_at->format('Y-m-d H:i'),
                    $lead->name,
                    $lead->mobile,
                    $lead->city,
                    $lead->vertical?->name,
                    $lead->status?->name,
                    $lead->assign_to,
                    $lead->revenue_amount,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
