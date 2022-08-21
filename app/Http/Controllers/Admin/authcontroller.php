<?php

namespace App\Http\Controllers\Admin;
use App\User;
use App\esport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Session;
use DB;
use App\Quotation;
use Auth;
use Mail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Crypt;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

      class authcontroller extends controller{

        public function login(Request $request){
          $email=$request->email;
          $pass =$request->pass;
          $users=User::where('email',$email)->first();
          if($users && $users->role=2){
          $auth =Hash::check($pass,$users->password);
          if($auth){
          $data=User::where('email',$email)->where('password',$pass)->get();
          Session::put('data',$data);
          return redirect('/admin/dashboard');
          }
               return redirect()->back()->with('failed','Password salah');
            }
            return redirect()->back()->with('failed','Email Salah');

  }
      public function logout(){
        if(session::get('profiladmin')){
        session::forget('profiladmin');
          return redirect('admin/login');
      }
      else{
        return redirect('admin/login');
      }
    }
    public function dashboard(Request $request){
        if(session::get('data')){
          $data=session::get('data');
          $usercount=db::select("call totaluser()");
          $ordercount=db::select("call countcomp()");
          $countpengguna=User::where('role',0)->count();
          $countvendor=User::where('role',1)->count();
          $countpesan=db::select("call countmes()");
          return view('admin.dashboard')->with('profil',$data)->with('ucount',$usercount)
          ->with('ocount',$ordercount)->with('countv',$countvendor)->with('countp',$countpengguna)->with('countm',$countpesan);
        }
        return redirect('admin/login');
}
public function esport(Request $request){
    if(session::get('data')){
      $data=session::get('data');
      $esport=esport::all();
      $list=$esport->toArray();
      return view('admin.inspiration')->with('profil',$data)->with('esport',$esport);
    }
    return redirect('admin/login');
}
public function kritiksaran(Request $request){
    if(session::get('data')){
      $data=session::get('data');
      $pesan=db::select("call pesanv()");
      return view('admin.pesan')->with('profil',$data)->with('pesan',$pesan);
    }
    return redirect('admin/login');
}
public function formpesan($id){
  if(session::get('data')){
    $data=session::get('data');
    $pesan=db::select("call pesanid($id)");
    $pesan=$pesan[0];
    return view('admin.form-balas')->with('profil',$data)->with('pesan',$pesan);
  }
  return redirect('admin/login');
}

public function deleteesport($id){
      if(session::get('data')){
        $detil = esport::find($id);
        if(!is_null($detil)){
            $detil->delete();
        return response()->json([
          'success' => 'Record has been deleted!'
        ]);
      }

  else{
    return redirect('/');
  }
  }
}
public function sendmail(Request $request){
  $balas=db::unprepared("call balas($request->idp)");
  try{
         Mail::send('admin.email', ['nama' => $request->email, 'pesan' => $request->pesan], function ($message) use ($request)
         {
             $message->subject($request->judul);
             $message->to($request->email);
         });
         return back()->with('alert-success','Berhasil Kirim Email');
     }
     catch (Exception $e){
         return response (['status' => false,'errors' => $e->getMessage()]);
     }
}

public function users(Request $request){
    if(session::get('data')){
      $data=session::get('data');
      $list=User::where('role',0)->orWhere('role',1)->get();
      return view('admin.users')->with('profil',$data)->with('users',$list);
    }
    return redirect('admin/login');
}

public function deleteuser($id){
      if(session::get('data')){
        $detil = User::find($id);
        if(!is_null($detil)){
            $detil->delete();
        return response()->json([
          'success' => 'Record has been deleted!'
        ]);
      }

  else{
    return redirect('/');
  }
  }
}
}
