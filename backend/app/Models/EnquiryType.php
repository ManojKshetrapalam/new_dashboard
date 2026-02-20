<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnquiryType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'vertical_id'];

    /**
     * Get the vertical that this enquiry type belongs to.
     */
    public function vertical(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Vertical::class);
    }
}
