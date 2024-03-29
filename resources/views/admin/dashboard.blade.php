@extends('admin.layouts.admin-main')

@section('content')

<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
          <h1 class="m-0 text-dark">Dashboard</h1>
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-6">
          <!-- small card -->
          <div class="small-box bg-info">
            <div class="inner">
              @foreach($ocount as $countorder)
              <h3>{{$countorder->tot}}</h3>
              @endforeach
              <p>Total Kompetisi</p>
            </div>
            <div class="icon">
              <i class="fas fa-calendar"></i>
            </div>
          <!--  <a href="#" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a> -->
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-4 col-6">
          <!-- small card -->
          <div class="small-box bg-warning">
            <div class="inner">
              @foreach($ucount as $countuser)
              <h3>{{$countuser->totid}}</h3>
              @endforeach
              <p>Total Pengguna Terdaftar</p>
            </div>
            <div class="icon">
              <i class="fas fa-user-plus"></i>
            </div>
          <!--  <a href="#" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a> -->
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-4 col-6">
          <!-- small card -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{$countp}}</h3>
              <p>Player Terdaftar</p>
            </div>
            <div class="icon">
              <i class="fas fa-user-plus"></i>
            </div>
          <!--  <a href="#" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a> -->
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-4 col-6">
          <!-- small card -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{$countv}}</h3>
              <p>Vendor Terdaftar</p>
            </div>
            <div class="icon">
              <i class="fas fa-user-plus"></i>
            </div>
          <!--  <a href="#" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a> -->
          </div>
        </div>
        <div class="col-lg-4 col-6">
          <!-- small card -->
          <div class="small-box bg-warning">
            <div class="inner">
              @foreach($countm as $countmes)
              <h3>{{$countmes->totpesan}}</h3>
              <p>Kritik dan Saran</p>
              @endforeach
            </div>
            <div class="icon">
              <i class="fas fa-envelope"></i>
            </div>
          <!--  <a href="#" class="small-box-footer">
              More info <i class="fas fa-arrow-circle-right"></i>
            </a> -->
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content -->

{{-- Time --}}
<script type="text/javascript">
  // 1 detik = 1000
  window.setTimeout("waktu()", 1000);

  function waktu() {
      var tanggal = new Date();
      setTimeout("waktu()", 1000);
      document.getElementById("clock").innerHTML = tanggal.getHours() + ":" + tanggal.getMinutes() + ":" + tanggal
          .getSeconds() + " WIB";
  }

</script>
{{-- Date --}}
<script type="text/javascript">
  window.setTimeout('hari()', 1000); //meload function secara terus menerus
  var hariseminggu = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  var bulansetahun = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December');

  function hari() {
      var hari = new Date(); //membuat objek waktu
      var hariini = hariseminggu[hari.getDay()] + ", " + hari.getDate() + " " + bulansetahun[hari.getMonth()] + " " + hari
          .getFullYear(); //menempatkan data waktu pada variabel
      document.getElementById('showdate').innerHTML = hariini; //menampilkan variabel hariini pada html
  }

</script>
@endsection
