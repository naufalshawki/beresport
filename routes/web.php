<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/{path?}', 'index');
Route::group(['prefix' => 'authentication'], function () {
Route::get('/verify', 'API\usercontroller@verify')->name('signup.verify');
});

Route::group(['prefix' => 'admin'], function () {
  Route::get('/login', function(){
      return view('admin.login');
  });
Route::post('/login/submit', 'Admin\authcontroller@login');
Route::get('/dashboard', 'Admin\authcontroller@dashboard');
Route::get('/esport', 'Admin\authcontroller@esport');
Route::get('/users', 'Admin\authcontroller@users');
Route::get('/pesan', 'Admin\authcontroller@kritiksaran');
Route::get('/pesan/form-balas-ke-{id}', 'Admin\authcontroller@formpesan');
Route::post('/pesan/sent/submit', 'Admin\authcontroller@sendmail');
Route::delete('/deleteesport/{id}','Admin\authcontroller@deleteesport');
Route::delete('/deletepesan/{id}','Admin\authcontroller@deletepesan');
Route::delete('/deleteuser/{id}','Admin\authcontroller@deleteuser');

});
