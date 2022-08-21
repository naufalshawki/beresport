<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseResponseController extends Controller
{
    public function responseApi($success, $data, $count, $msg, $code){
        return response()->json([
            'success' => $success,
            'data'=> $data,
            'jumlah'=>$count,
            'message' => $msg
        ], $code);
    }
}
