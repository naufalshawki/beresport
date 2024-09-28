<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\esport;

class Attenders extends Model
{
    //
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function esport()
    {
        return $this->belongsTo(esport::class);
    }
}
