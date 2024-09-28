<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class esport extends Model
{
     protected $primaryKey = 'id';
     protected $fillable = [
          'judul', 'vendor','deskripsi','gambar1','gambar2','gambar3',
          'tipe','nama_game','slug_judul','alamat','alamat1','alamat2','harga','telp','slot','member','tanggal','idv'
      ];

     public $timestamps = false;

     public function attenders()
     {
          return $this->belongsToMany(User::class, 'attenders'); // Specify pivot table
     }
}
