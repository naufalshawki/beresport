@extends('admin.layouts.admin-main')

@section('content')

<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0 text-dark">Blogs

        </h1>
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <table id="myTable" class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nama</th>
              <th>Status</th>
              <th>Role</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
              @foreach($users as $list)
            <tr>
              <td>{{$list->id}}</td>
              <td>{{$list->email}}
              </td>
              <td>{{$list->nama}}</td>
              <td>{{$list->status}}</td>
              <td>{{$list->role==1 ? 'Player' : 'Pengada Kompetisi'}}</td>
              <td><a href="{{url('images/avatar/'.$list->gambar)}}" target="_blank">Avatar</a></td>
              <td>

                  <a href="#" class="delete btn btn-danger" data-id="{{$list->id}}" data-token="{{csrf_token()}}" data-toggle="tooltip" title="Delete Data">
                    <i class="fas fa-trash"></i>
                </a>
              </td>
            </tr>
            @endforeach


            </tbody>
            <tfoot>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nama</th>
              <th>Status</th>
              <th>Role</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
            </tfoot>
          </table>
    </div><!-- /.container-fluid -->
</div>
<!-- /.content -->

<script>
    $(function () {
      $("#myTable").DataTable({
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
            title: 'Apa anda yakin ingin menghapus user ini?',
            text: 'Data tidak bisa dikembalikan!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "deleteuser/"+id,
                    type: "DELETE",
                    dataType: "JSON",
                    data: {'id': id, '_method': 'DELETE', '_token': csrf_token},
                    success: function (response) {
                      Swal.fire({
                            type: 'success',
                            title: 'Sukses!',
                            text: 'User Dihapus!'
                        });
                    setTimeout(function(){
                      location.reload();
                  }, 2000);
                },
                    error: function (xhr) {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        });
                    }
                });
            }
        });
    });

</script>
@endsection
