<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseResponseController as Controller;
use Illuminate\Http\Request;
use App\User;
use App\esport;
use Mail;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\RegistersUsers;
use Session;
use App\Quotation;
use Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Crypt;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class usercontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     protected function respondForSuccess($stat, $msg, $code)
  {
      return response()->json([
          'success' => $stat,
          'message' => $msg
      ], $code);
  }
     public function daftar(Request $request){
      $exist=db::select("call cekemail('$request->email')");
      if($exist==null)   {
      $password = hash::make($request->password);
         $user = User::create([
         'email' => $request->email,
         'password' => $password,
         'role' => $request->role,
         'api_token' => Str::random(50),
     ]);

       Mail::to($request->email)->send(new VerifyEmail($user));
         $stat = true;
         $msg = 'Silahkan verifikasi email anda untuk melanjutkan';
         $code = 200;
         return $this->respondForSuccess($stat, $msg, $code);
      }
      else{
        $stat = false;
            $msg = 'email sudah digunakan';
            $code = 401;
            return $this->respondForSuccess($stat, $msg, $code);

      }
    }

       public function verify()
   {
      if (empty(request('token'))) {
          // if token is not provided
          return redirect('/');
      }
      // decrypt token as email
      $decryptedEmail = Crypt::decrypt(request('token'));
      //dd($decryptedEmail);
      // find user by email
      $user = DB::SELECT("CALL userstatus('$decryptedEmail')");
      //$user = User::whereEmail($decryptedEmail)->first();
      //dd($user);
      $user=$user[0];
      //dd($user);
      if ($user->status == 'TERVERIFIKASI') {
          // user is already active, do something
          return redirect('/')->with('message','Email sudah diaktifkan');
      }
      // otherwise change user status to "activated"
      $update=db::unprepared("call statusverifying('$decryptedEmail')");
    // $user->status = 'activated';
     // $user->save();
      // autologin
     // Auth::loginUsingId($user->id);
      return redirect('/')->with('message','Akun Berhasil Diaktifkan! Silahkan Masuk');
   }

   public function login(Request $request){
     $email=$request->email;
     $pass =$request->password;

     $data = User::where('email',$email)->first();
      if($data){ //apakah email tersebut ada atau tidak
          if(Hash::check($pass,$data->password)){
              $users=User::where('email',$email)->get();
               $data=$users->toArray();
               return $this->responseApi('success',$users,'1','Logged In',200);
  }
  else{
     return $this->responseApi('failed','','','Wrong password',201);
  }

       return $this->responseApi('failed','','','Email not found',401);

}
}
      public function edit(Request $request)
        {
      $auth=User::where('api_token',$request->token)->first();
      if($auth){
      $detail = User::where('id',$request->id)->get();
      $data=$detail->toArray();
      return $this->responseApi('Success',$data,'1','Detail Retrieved',200);
        }
        else{
          return response()->json(['Access Denied',400]);
        }
      }

      public function editv(Request $request)
        {
      $auth=User::where('api_token',$request->token)->first();
      if($auth){
      $detail = esport::where('idv',$request->id)->get();
      $data=$detail->toArray();
      return $this->responseApi('Success',$data,'success','Retrieved',200);
        }
        else{
          return response()->json(['Access Denied',400]);
        }
      }
  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
    public function update(Request $request)
    {
      $data = User::where('id',$request->idu)->first();
      $password = $request->password;
        $auth= Hash::check($password,$data->password);
        if($auth && $data){
      $data->nama = $request->nama;
      if($request->img!=null){
      $data->gambar = $this->upload($request->img);
    }
      if($request->c_password!=null){
        $data->password = Hash::make($request->c_password);
      }
      else{
      $data->password = Hash::make($request->password);
    }
      $data->deskripsi = $request->deskripsi;
      $data->save();
      $detail=$data->toArray();
      return $this->responseApi('Success',$data,'1','Data Updated',200);
    }
    else{
      return $this->responseApi('Failed','','','Access Denied',400);
    }
  }

    public function upload($file){


      $extension = $file->getClientOriginalName();
      $path = public_path().'/images/avatar';
      $uplaod = $file->move($path,$extension);
      return $extension;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
  public function saran(Request $request){
    $add=db::unprepared("call tambahsaran('$request->pesan','$request->email')");
    return response()->json(['success'],200);
  }





    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   
    }
