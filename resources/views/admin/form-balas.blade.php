@extends('admin.layouts.admin-main')

@section('content')

<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0 text-dark">Balas Kritik & Saran
        </h1>
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <!-- general form elements -->
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title"></h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form action="sent/submit" method="post" enctype="multipart/form-data" role="form">
              {{csrf_field()}}
                <div class="card-body">
                    <div class="form-group">
                        <label for="title1">Email Pengirim</label>
                        <input type="text" name="email" class="form-control" id="title1" placeholder="Enter title.." value="{{$pesan->email}}" readonly="readOnly" required>
                        <input type="hidden" name="idp" class="form-control" value="{{$pesan->id}}">
                    </div>
                    <div class="form-group">
                        <label for="title1">Kritik dan Saran</label>
                        <input type="text" name="email" class="form-control" id="title1" placeholder="Enter title.." value="{{$pesan->pesan}}" readonly="readOnly" disabled>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Subjek</label>
                            <div class="input-group">
                                <input type="text" name="judul" maxlength="50" class="form-control" placeholder="Subyek Pesan"
                                  required>
                            </div>
                        </div>
                      <!--  <img src="xxx" id="image-preview" class="img-thumbnail text-center" style="max-height:150px; overflow:hidden;"> -->
                        <p class="text-danger" id="notif"></p>
                    </div>

                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label>Isi Pesan</label>
                                <textarea name="pesan" class="ckeditor" id="ckeditor" rows="8" placeholder="Enter ..." required></textarea>
                            </div>
                        </div>


                    </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Kirim</button>
                </div>
            </form>
        </div>
    </div><!-- /.container-fluid -->
</div>
<!-- /.content -->

@endsection
