<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseResponseController as Controller;
use Illuminate\Http\Request;
use App\Cart;
use Validator;
use DB;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $cart = Cart::all();
        $data = $cart->toArray();
        return $this->responseApi('success', $data, 'Cart retrieved Successfully', 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $verif=DB::select("call cekprod($request->idp,$request->idu)");
    if($verif!=null){
      $tambahjumlah=DB::unprepared("call tambahsama($request->total,'$request->idu','$request->idp')");
      return $this->responseApi('success', 'berhasil','Cart updated', 200);
    }
    else{
      $tambahkabeh=DB::unprepared("call tambah('$request->idp','$request->idu',$request->total)");
      return $this->responseApi('success', 'berhasil', 'Cart inserted', 200);
}
    }





    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $cart = Cart::find($id);
        if(is_null($cart)){
            return $this->responseApi(false, [], 'Cart not found', 400 );
        } else {
            return $this->responseApi('success', $cart, 'Cart retrieved successfully', 200);
        }
    }
    public function datacarts($id)
    {
      $cart = DB::select("call keranjangdetil($id)");
      if(is_null($cart)){
          return $this->responseApi(false, [], 'Cart not found', 400 );
      } else {
          return $this->responseApi('success', $cart, 'Cart retrieved successfully', 200);
      }
    }
    public function totalharga($id){

      $total = DB::select("call totalhargasemua($id)");
      if(is_null($total)){
          return $this->responseApi(false, [], 'Cart not found', 400 );
      } else {
          return $this->responseApi('success', $total, 'Cart retrieved successfully', 200);
      }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $id_user = $request->id_user;
        $cart = Cart::find($id);
        if(!is_null($cart)){
            (is_null($id_user) ? $cart->id_user = $cart->id_user : $cart->id_user = $id_user);
            $cart->save();
            $data = $cart->toArray();
            return $this->responseApi(true, $data, 'Cart updated sucessfully..', 200);
        } else {
            return $this->responseApi(false, [], 'Cart not found', 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $cart = Cart::find($id);
        if(!is_null($cart)){
            $cart->delete();
            $data = $cart->toArray();
            return $this->responseApi('success', $data, 'Cart deleted..', 200);
        } else {
            return $this->responseApi(false, [], 'Cart not found..', 400);
        }
    }
    public function selesai($id){
      $data = db::unprepared("call pesananselesai($id)");
      return $this->responseApi('success', $data, 'pesanan selesai..', 200);
    }
    public function order($id){
        $data = db::select("call pesanan($id)");
        return $this->responseApi('success', $data, 'pesanan..', 200);
    }
    public function cekbukti($id){
      $data=db::select("call cekbukti($id)");
      return $this->responseApi('success', $data, 'berbukti..', 200);
    }
    public function upload(Request $request){
      $destinationPath="public/img/bukti";
    // $movea = $request->file('imgSrc')->move($destinationPath,$request->file('imgSrc')->getClientOriginalName());
    //            $url_file = "{$request->file('imgSrc')->getClientOriginalName()}";

    $file = $request->file('gambarp');
    $extension = $file->getClientOriginalName();
    $path = public_path().'/img/bukti';
    $uplaod = $file->move($path,$extension);
    $data = db::unprepared("call uploadpayment('$extension','$request->idu')");
    return $this->responseApi('success', $data, 'Bukti Berhasil Diupload', 200);
    }
    public function cekout(Request $request){
        $data = db::select("call checkout('$request->idu')");
        return $this->responseApi('success', $data, 'checkedout..', 200);
    }
    public function pemesanan($id){
      $data = db::select("call pemesanan($id)");
      return $this->responseApi('success', $data, 'pesanan..', 200);
    }
    public function produkdikart(Request $request){
      $data = db::select("call produkdikart('$request->idp','$request->idu')");
      return $this->responseApi('success', $data, 'Cart terambil..', 200);
    }
    public function jumlahcart(Request $request){
        $data = db::select("call jumlahcart('$request->idu')");
        return $this->responseApi('success', $data, 'Jumlah terambil', 200);
    }
    public function hapus($idc){
      $hapus=DB::unprepared("call hapuscart('$idc')");
      return $this->responseApi('success', 'berhasil', 'Cart deleted..', 200);
    }

    public function tambah(Request $request){
      $verif=DB::select("call cekprod('$request->idp','$request->idu')");
  if($verif!=null){
    $tambahjumlah=DB::select("call tambahsama('$request->total','$request->idp','$request->idu')");
  }
  else{
    $tambahkabeh=DB::select("call tambah('$request->idp','$request->idu','$request->quant')");
  }
  return responseApi('success', $data, 'Cart inserted', 200);
  }
    }
