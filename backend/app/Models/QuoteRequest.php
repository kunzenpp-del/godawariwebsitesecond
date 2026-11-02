<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'product',
        'width',
        'height',
        'length',
        'unit',
        'quantity',
        'quantity_2',
        'quantity_3',
        'design_file',
        'comments',
        'status',
        'admin_notes',
        'quoted_price',
    ];

    protected $casts = [
        'width' => 'decimal:2',
        'height' => 'decimal:2',
        'length' => 'decimal:2',
        'quantity' => 'integer',
        'quantity_2' => 'integer',
        'quantity_3' => 'integer',
        'quoted_price' => 'decimal:2',
    ];

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getDimensionsAttribute()
    {
        $parts = [];
        if ($this->width) $parts[] = "W: {$this->width}";
        if ($this->height) $parts[] = "H: {$this->height}";
        if ($this->length) $parts[] = "L: {$this->length}";
        return implode(' × ', $parts) . " {$this->unit}";
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeProcessing($query)
    {
        return $query->where('status', 'processing');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
