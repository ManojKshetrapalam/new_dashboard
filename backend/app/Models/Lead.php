<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'vertical_id',
        'name',
        'mobile',
        'city',
        'enquiry_for',
        'assign_to',
        'lead_status_id',
        'follow_up_at',
        'revenue_amount',
    ];

    protected $casts = [
        'follow_up_at' => 'datetime',
    ];

    /**
     * Get the notes for the lead.
     */
    public function notes(): HasMany
    {
        return $this->hasMany(LeadNote::class)->latest();
    }

    /**
     * Get the status of the lead.
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(LeadStatus::class, 'lead_status_id');
    }

    /**
     * Get the vertical that the lead belongs to.
     */
    public function vertical(): BelongsTo
    {
        return $this->belongsTo(Vertical::class);
    }
}
