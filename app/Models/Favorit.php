<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorit extends Model
{
    //
    protected $primaryKey = 'id_favorit';
    protected $fillable = [
      'id_users','id_esport'
     ];
     public $timestamps = false;
}
