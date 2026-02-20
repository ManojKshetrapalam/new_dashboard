<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        
        $query = Lead::with(['status', 'vertical']);

        $subordinateNames = $user->subordinates->pluck('name')->toArray();

        if ($request->view === 'marketplace') {
            // Leads in user's vertical but NOT yet assigned to them specifically
            // and likely in a 'New' or 'Available' status
            $query->whereIn('vertical_id', $user->verticals->pluck('id'))
                  ->where('assign_to', '!=', $user->name)
                  ->whereNotIn('assign_to', $subordinateNames) // Managers shouldn't see team leads in marketplace
                  ->whereNull('assign_to');
        } else {
            $query->where(function($query) use ($user, $subordinateNames) {
                $query->where('assign_to', $user->name)
                      ->orWhereIn('assign_to', $subordinateNames) // Manager can see team leads
                      ->orWhereIn('vertical_id', $user->verticals->pluck('id'));
            });
        }

        // Filtering
        if ($request->filled('status')) {
            $query->whereHas('status', function($q) use ($request) {
                $q->where('name', $request->status);
            });
        }
        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('mobile', 'like', '%' . $request->search . '%');
            });
        }

        return response()->json($query->latest()->paginate(15));
    }

    public function purchase(Request $request, $id)
    {
        $user = auth()->user();
        $lead = Lead::whereNull('assign_to')->findOrFail($id);

        // Simple purchase logic: assign to user
        $lead->update([
            'assign_to' => $user->name,
            // You might want to update status to 'Purchased' or 'Contacted'
        ]);

        return response()->json(['message' => 'Lead purchased successfully', 'lead' => $lead]);
    }

    public function show($id)
    {
        $user = auth()->user();
        $subordinateNames = $user->subordinates->pluck('name')->toArray();
        
        $lead = Lead::where(function($query) use ($user, $subordinateNames) {
            $query->where('assign_to', $user->name)
                  ->orWhereIn('assign_to', $subordinateNames)
                  ->orWhereIn('vertical_id', $user->verticals->pluck('id'));
        })->with(['status', 'vertical', 'notes.user'])->findOrFail($id);

        return response()->json($lead);
    }

    public function addNote(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $user = auth()->user();
        $subordinateNames = $user->subordinates->pluck('name')->toArray();
        
        $lead = Lead::where(function($query) use ($user, $subordinateNames) {
            $query->where('assign_to', $user->name)
                  ->orWhereIn('assign_to', $subordinateNames)
                  ->orWhereIn('vertical_id', $user->verticals->pluck('id'));
        })->findOrFail($id);

        $note = $lead->notes()->create([
            'user_id' => $user->id,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Note added successfully', 'note' => $note->load('user')]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'lead_status_id' => 'required|exists:lead_statuses,id',
            'follow_up_at' => 'nullable|date',
        ]);

        $user = auth()->user();
        $subordinateNames = $user->subordinates->pluck('name')->toArray();
        
        $lead = Lead::where(function($query) use ($user, $subordinateNames) {
            $query->where('assign_to', $user->name)
                  ->orWhereIn('assign_to', $subordinateNames)
                  ->orWhereIn('vertical_id', $user->verticals->pluck('id'));
        })->findOrFail($id);

        $updateData = ['lead_status_id' => $request->lead_status_id];
        if ($request->has('follow_up_at')) {
            $updateData['follow_up_at'] = $request->follow_up_at;
        }

        $lead->update($updateData);

        return response()->json(['message' => 'Lead status updated successfully', 'lead' => $lead->load('status')]);
    }

    public function upcomingFollowups(Request $request)
    {
        $user = auth()->user();
        $now = \Carbon\Carbon::now();
        // Look for leads with follow-ups scheduled between now and the next 10 minutes
        // This gives a safe window for periodic polling (e.g. every 1-2 mins)
        $reminderWindow = $now->copy()->addMinutes(10);

        $leads = Lead::where('assign_to', $user->name)
            ->whereBetween('follow_up_at', [$now, $reminderWindow])
            ->with('status')
            ->get();

        return response()->json($leads);
    }
}
