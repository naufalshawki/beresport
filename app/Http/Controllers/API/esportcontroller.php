<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseResponseController as Controller;
use Illuminate\Http\Request;
use App\esport;
use App\User;
use Validator;
use DB;
use Session;
use Illuminate\Support\Str;

class esportcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function upload($file){


      $extension = $file->getClientOriginalName();
      $path = public_path().'/images/esport';
      $uplaod = $file->move($path,$extension);
      return $extension;
    }
    public function index()
    {
          $date= today()->format('Y-m-d');
      $list = esport::orderBy('id','desc')->where('tanggal','>=',$date)
	  ->select('id','judul','deskripsi','gambar1','alamat2','tanggal','tipe','harga')
	  ->take(8)->get();
      //  $list=esport::all();
        $data = $list->toArray();
      //  $count= $list->count();
        return $this->responseApi('success', $data, 'Multiple','Retrieved successfully..', 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
      //  $input=$request->except('gambar1','gambar2','gambar3','slug_judul');

        $img1=$request->file('img1');
        if($request->img2){
        $img2=$request->file('img2');
        $upload2=$this->upload($img2);
      }
      else{
        $upload2="";
      }
      if($request->img3){
      $img3=$request->file('img3');
      $upload3=$this->upload($img3);
        }
      else{
      $upload3="";
      }
          $esport = esport::create([
          'gambar1'=>$this->upload($img1),
          'gambar2'=>$upload2,
          'gambar3'=>$upload3,
          'idv'=>$request->idv,
          'judul'=>$request->judul,
          'vendor'=>$request->vendor,
          'deskripsi'=>$request->deskripsi,
          'tipe'=>$request->tipe,
          'nama_game'=>$request->namagame,
          'alamat'=>$request->alamat,
          'alamat1'=>$request->alamat1,
          'alamat2'=>$request->alamat2,
          'harga'=>$request->harga,
          'telp'=>'+62'.$request->telp,
          'slug_judul'=>Str::slug($request->judul),
          'slot'=>$request->slot,
          'tanggal'=>$request->tanggal,
      ]);
          $data = $esport->toArray();
          $count= $esport->count();
          return $this->responseApi('success', $data,$count, 'Detail Cart retrieved successfully..', 200);


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
        $detail=esport::find($id);
        if(is_null($detail)){
          return $this->responseApi(false, [],'', 'Detail not found', 400);
      }
      else{
        $data = $detail->toArray();
        $count= $detail->count();
        return $this->responseApi('success',$data,$count,'Detail Retrieved',200);
    }
  }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }
    public function alamat1(Request $request){
      $list = esport::where('alamat1',$request->alamat1)->get();
      $data = $list->toArray();
      $count= $list->count();
      return $this->responseApi('success',$data,$count,'List Retrieved',200);
    }
    public function alamat2(Request $request){
      $list = esport::where('alamat1',$request->alamat1)->where('alamat2',$request->alamat2)->get();
      $data = $list->toArray();
      $count= $list->count();
      return $this->responseApi('success',$data,$count,'List Retrieved',200);
    }

    public function tipe($tipe,$nama){
      $date= today()->format('Y-m-d');
      if($tipe=='semua'||$tipe=='Semua'){
      $list = esport::where('nama_game','LIKE', '%' . $nama . '%')->where('tanggal','>=', $date)->paginate(9);
    }
    else{
      $list = esport::where('tipe',$tipe)->where('nama_game','LIKE', '%' . $nama . '%')->where('tanggal','>=', $date)->paginate(9);
}
      $data = $list->toArray();
      $count= $list->count();
      return $this->responseApi('success',$data,$count,'List Retrieved',200);

    }

    public function ambilv($id){
      $vendor=db::select("call ambilv($id)");

      return $this->responseApi('success',$vendor,'','Vendor Retrieved',200);
    }

        public function cari(Request $request){
          $data=$request->isi;
          $date= today()->format('Y-m-d');
          $list = esport::where([['nama_game','LIKE', '%' . $data . '%'],['tanggal','>=', $date]])->orWhere([['deskripsi','LIKE', '%' . $data . '%'],['tanggal','>=', $date]])->orWhere([['judul','LIKE', '%' . $data . '%'],['tanggal','>=', $date]])
          ->orWhere([['alamat2','LIKE', '%'. $data . '%'],['tanggal','>=', $date]])->get();
          $data = $list->toArray();
          $count= $list->count();
          return $this->responseApi('success',$data,$count,'List Retrieved',200);
        }
    public function namagame($nama){
      $list = esport::where('nama_game','LIKE', '%' . $nama . '%')->get();

      $data = $list->toArray();
      $count= $list->count();
      return $this->responseApi('success',$data,$count,'List Retrieved',200);

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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //
        $detil = esport::find($id);
        if(!is_null($detil)){
            $detil->delete();
            $data = $detil->toArray();
            return $this->responseApi(true, $data, 'Data deleted sucessfully..', 200);
        }
        else {
            return $this->responseApi(false, [], 'Data not found', 400);
        }
      }

      public function updateslot(Request $request){
        $auth=User::where("api_token",$request->token)->where("id",$request->idu)->first();
        if($auth){
          if($request->idu==$request->idv){
            $data=esport::where("id",$request->ide)->first();
            $data->member=$request->member;
            $data->save();
            return $this->responseApi('Success',$data,'1','Data Updated',200);
          }
        }
      }

      public function deleteevent(Request $request)
      {
          //
          $auth=User::where("api_token",$request->token)->where("id",$request->idu)->first();
          if($auth){
            if($request->idu==$request->idv){
          $detil = esport::find($request->ide);
          if(!is_null($detil)){
              $detil->delete();
              $data = $detil->toArray();
              return $this->responseApi(true, $data,'', 'Data deleted sucessfully..', 200);
          }
          else {
              return $this->responseApi(false, [],'', 'Data not found', 400);
          }
        }
        else{
          return $this->responseApi(false, [], '', 'Access Denied', 401);
        }
      }
        else{
          return $this->responseApi(false, [], '', 'Access Denied', 401);
        }

    }
}
