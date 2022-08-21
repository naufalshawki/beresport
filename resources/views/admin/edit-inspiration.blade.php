@extends('admin.layouts.admin-main')

@section('content')

<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0 text-dark">Create new / Edit blog
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
            <form action="submit" method="post" enctype="multipart/form-data" role="form">
              {{csrf_field()}}
              @foreach($insp as $detail)
              <input type="hidden" value="{{$detail->id}}" name="idb">
              <input type="hidden" value="{{$detail->gambar}}" name="image">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                              <label for="event">Event</label>
                              <input type="text" name="event" value="{{$detail->event}}" maxlength="50" class="form-control" id="event" placeholder="Enter event.." required>
                          </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vendor</label>
                                <input type="text" name="vendor" maxlength="50" value="{{$detail->vendor}}" class="form-control" id="event" placeholder="Vendor Name.." required>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="img-source">Image</label>
                        <div class="input-group">
                            <input type="file" name="imagen" id="img-source" class="form-control-file"
                              >
                        </div>
                    </div>
                    <img src="{{url('img/inspiration/'.$detail->gambar)}}" id="image-preview" class="img-thumbnail text-center" style="max-height:150px; overflow:hidden;">
                  </div>
                <!-- /.card-body -->

                <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Post</button>
                </div>
                @endforeach
            </form>
        </div>
    </div><!-- /.container-fluid -->
</div>
<!-- /.content -->

@endsection
