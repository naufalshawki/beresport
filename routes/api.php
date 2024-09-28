<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([

    'middleware' => 'api',
    'prefix' => 'v1'

], function ($router) {

   //Route::apiResource('/products', 'API\ProductController');
  // Route::get('/productsbyterjual', 'API\ProductController@sortByTerjual');
    //Route::apiResource('/alamats', 'API\AlamatController');
    //Route::apiResource('/orders', 'API\OrderController');
    //Route::post('/carts', 'API\CartController@store');
    //Route::get('/users/{id}/alamats', 'API\AlamatController@userAlamat');
    //Route::get('/cari/{query}', 'API\ProductController@cari');
    //Route::get('/carts/{id}', 'API\CartController@datacarts');
    //Route::get('/hapuscarts/{id}', 'API\CartController@hapus');
    //Route::get('/cartshrg/{id}', 'API\CartController@totalharga');
    //Route::post('/jumlahcarts', 'API\CartController@jumlahcart');
  //  Route::post('/produkdikart', 'API\CartController@produkdikart');
    Route::post('/editprofile','API\usercontroller@edit');
    Route::post('/editprofile/update','API\usercontroller@update');
    Route::post('/login','API\usercontroller@login');
    Route::post('/daftar', 'API\usercontroller@daftar');
    Route::apiResource('/esport', 'API\esportcontroller');
    Route::get('/esportk/{kat}','API\esportcontroller@kategori');
    Route::get('/esportt/{tipe}-{nama}','API\esportcontroller@tipe');
    Route::get('/esportn/{nama}','API\esportcontroller@namagame');
    Route::post('/esportcari','API\esportcontroller@cari');
    Route::get('/ambilv/{id}','API\esportcontroller@ambilv');
  //  Route::get('/pemesanan/{id}', 'API\CartController@pemesanan');
  //  Route::get('/order/{id}', 'API\CartController@order');
    //Route::post('/uploadbukti','API\CartController@upload');
    //Route::get('/cekbukti/{id}', 'API\CartController@cekbukti');
    //Route::get('/selesai/{id}', 'API\CartController@selesai');
    Route::post('/wishlist','API\favoritcontroller@index');
    Route::post('/myevent','API\usercontroller@editv');
    Route::post('/tambahwishlist','API\favoritcontroller@store');
    Route::post('/deletewish','API\favoritcontroller@destroywish');
    Route::post('/kirimpesan','API\usercontroller@saran');
    Route::post('/cekwishlist','API\favoritcontroller@check');
    Route::post('/updateslot','API\esportcontroller@updateslot');
    Route::post('/deleteevent','API\esportcontroller@deleteevent');
    Route::get('/esport/{id}/attenders', 'API\esportcontroller@attenders');
//    Route::get('/produscts/{$id}', 'API\ProductController@show');

});
