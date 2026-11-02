<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'label',
        'full_name',
        'phone',
        'province',
        'district',
        'city',
        'ward',
        'street',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFullAddressAttribute()
    {
        $parts = array_filter([
            $this->street,
            $this->ward ? "Ward {$this->ward}" : null,
            $this->city,
            $this->district,
            $this->province,
        ]);

        return implode(', ', $parts);
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }
}
