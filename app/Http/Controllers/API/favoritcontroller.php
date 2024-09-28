<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseResponseController as Controller;
use DB;
use App\Models\Favorit;
use App\Models\User;
class favoritcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $list = DB::table('favorits')
        ->join('esports', 'favorits.id_esport', '=', 'esports.id')->where('favorits.id_users',$request->idu)->paginate(10);
        //  $list = DB::table("call select_favorit($request->idu)");
          //$list = (object)$list;
        //  $list = $list->paginate(4);
          //dd($list);
        //  $data=(object)$list;
          return $this->responseApi('success', $list, count($list),'Wishlist Retrieved successfully..', 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        $check=Favorit::where('id_esport',$request->ides)->where('id_users',$request->idu)->first();
        if(!$check){
        $auth=User::where('api_token',$request->token)->first();
        if($auth){
        $input=Favorit::create([
          'id_users' => $request->idu,
          'id_esport' => $request->ides,
        ]);
        $data=$input->toArray();
        return $this->responseApi('Success',$data,'1','Added To Wishlist',200);
      }
      return response()->json('false');
    }
    return response()->json('false',401);
  }

  public function check(Request $request){
    $cek=Favorit::select('id_esport')->where('id_users',$request->idu)->get();
    return $this->responseApi('success',$cek,'..','Checked',200);
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
    public function destroywish(Request $request)
    {
        //
        $iduser = $request->idu;
        $check = Favorit::where('id_users',$iduser)->first();
        if($check){
        $detil = Favorit::find($request->id);
        if(!is_null($detil)){
            $detil->delete();
            $data = $detil->toArray();
            return $this->responseApi(true, $data, '', 'Data deleted sucessfully..', 200);
        }
        else {
            return $this->responseApi(false, [],'', 'Data not found', 400);
        }
    }


          return $this->responseApi(false, [],'', 'Access Denied', 400);
        }

}
