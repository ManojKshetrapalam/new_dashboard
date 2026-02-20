<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function profile()
    {
        $user = auth()->user();
        // Assuming Vendor is related to User or can be retrieved via some logic
        // For now, let's mock the vendor data associated with the user
        return response()->json([
            'business_name' => 'Grand Weddings by ' . $user->name,
            'status' => 'Active',
            'plan' => 'Premium Vendor',
            'expires_at' => now()->addMonths(6)->toDateString(),
            'features' => [
                'Exclusive Leads',
                'Advanced Analytics',
                'Priority Support'
            ]
        ]);
    }

    public function updateSubscription(Request $request)
    {
        // Placeholder for subscription update logic
        return response()->json(['message' => 'Subscription update requested. Our team will contact you soon.']);
    }
}
