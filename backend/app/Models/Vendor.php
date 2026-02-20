<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_name',
        'contact_person',
        'email',
        'mobile',
        'vertical_id',
        'status',
        'subscription_starts_at',
        'subscription_expires_at',
    ];

    /**
     * Get the vertical this vendor belongs to.
     */
    public function vertical(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Vertical::class);
    }
}
