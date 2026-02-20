<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vertical extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * The users that have access to this vertical.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'vertical_user');
    }

    /**
     * The leads that belong to this vertical.
     */
    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }
}
