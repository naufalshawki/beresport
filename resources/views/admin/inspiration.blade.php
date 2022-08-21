@extends('admin.layouts.admin-main')

@section('content')

<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0 text-dark">Kompetisi
            <span class="ml-3">
            </span>
        </h1>
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <table id="inspirationTable" class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Gambar</th>
              <th>Vendor</th>
              <th>Tanggal</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              @foreach($esport as $insp)
            <tr>
              <td>{{$insp->id}}</td>
              <td><a href="{{url('/#/detail/kompetisi-'.$insp->id)}}" target="_blank">{{$insp->judul}}</a>
              </td>
              <td><a href="{{url('images/esport/'.$insp->gambar1)}}" target="_blank">Thumbnail</a></td>
              <td>{{$insp->vendor}}</td>
              <td>{{date('d-m-Y', strtotime($insp->tanggal))}}
              </td>
              <td>
                  <a href="#" class="delete btn btn-danger" data-id="{{$insp->id}}" data-token="{{csrf_token()}}" data-toggle="tooltip" title="Delete Data">
                    <i class="fas fa-trash"></i>
                </a>
              </td>
            </tr>
          @endforeach
            </tbody>
            <tfoot>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Gambar</th>
              <th>Vendor</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
            </tfoot>
          </table>
    </div><!-- /.container-fluid -->
</div>
<!-- /.content -->

<script>
    $(function () {
      $("#inspirationTable").DataTable({
      });
    });

    $('.delete').click(function(){
      event.preventDefault();

        var me = $(this),
            url = me.attr('href');
            title = me.attr('title');
            csrf_token = me.attr('data-token');
            var id = me.attr('data-id');
        Swal.fire({
            title: 'Apa anda yakin ingin menghapus kompetisi?',
            text: 'jika terhapus, data tidak bisa dikembalikan!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus data!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "deleteesport/"+id,
                    type: "DELETE",
                    dataType: "JSON",
                    data: {'id': id, '_method': 'DELETE', '_token': csrf_token},
                    success: function (response) {
                      Swal.fire({
                            type: 'success',
                            title: 'Berhasil!',
                            text: 'Data dihapus!'
                        });
                    setTimeout(function(){
                      location.reload();
                  }, 2000);
                },
                    error: function (xhr) {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Ada yang salah!'
                        });
                    }
                });
            }
        });
    });
</script>
@endsection
