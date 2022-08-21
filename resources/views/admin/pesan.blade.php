@extends('admin.layouts.admin-main')

@section('content')

<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <h1 class="m-0 text-dark">Kritik dan Saran</h1>
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
              <th>Email</th>
              <th>Pesan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
              @foreach($pesan as $ppesan)
            <tr>
              <td>#{{$ppesan->id}}</td>
              <td>{{$ppesan->email}}</td>
              <td>{{$ppesan->pesan}}</td>
              <td>{{$ppesan->status}}</td>
              <td>
                      <a href="pesan/form-balas-ke-{{$ppesan->id}}" target="_blank">
                      <button href="https://mail.google.com/mail/?view=cm&fs=1&to={{$ppesan->email}}" target="_blank" class="reply btn btn-reply">
                      <i class="fas fa-reply"></i>
                  </button>
                </a>
                  <button href="#" class="delete btn btn-danger" data-id="{{ $ppesan->id }}" data-token="{{csrf_token()}}" title="Reject">
                    <i class="fas fa-times"></i>
                </button>
              </td>
            </tr>
            @endforeach



            </tbody>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Pesan</th>
                <th>Status</th>
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
    				console.log(id);
            console.log(url);
        Swal.fire({
            title: 'Hapus Pesan?',
            text: 'data tidak bisa dikembalikan!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "deletepesan/"+id,
                    type: "DELETE",
                    dataType: "JSON",
                    data: {'id': id, '_method': 'DELETE', '_token': csrf_token},
                    success: function (response) {
                      Swal.fire({
                            type: 'success',
                            title: 'Success!',
                            text: 'Pesan dihapus!'
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
