import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect, withRouter} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import LoadingOverlay from 'react-loading-overlay';

class Myaccount extends Component{
  constructor(){
    super();
    this.state={profil:{}, profileup:{}, error:false, show:false, update:false, isactive:true};
    this.previewImage = this.previewImage.bind(this);
    this.name = this.name.bind(this);
    this.pass = this.pass.bind(this);
    this.passc = this.passc.bind(this);
    this.desc = this.desc.bind(this);
    this.edit = this.edit.bind(this);

  }

  componentDidMount(){
      window.scrollTo(0,0);
    if(sessionStorage.getItem('udata')===null){
      window.location.replace('/');
    }
    else{
      var users = JSON.parse(sessionStorage.getItem('udata'));
       var datau = users[0];
       const id={
         token: datau.api_token,
         id: datau.id
       }
       axios.post('api/v1/editprofile', id).then(response=>{
           this.setState({profil:response.data.data[0], isactive:false})
         })
    }
  }
  previewImage(e){
   var contents = e.target.files[0];
   this.setState({selectedFile1: contents});
    var oFReader = new FileReader();
     oFReader.readAsDataURL(document.getElementById("img-source1").files[0]);

    oFReader.onload = function(oFREvent) {
      document.getElementById("profpict").src = oFREvent.target.result;
    };
  }
  name(e){
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  }
  pass(e){
    e.preventDefault();
    this.setState({
      pass: e.target.value
    })
  }
  passc(e){
    e.preventDefault();
    this.setState({
      passc: e.target.value
    })
  }
  desc(e){
    e.preventDefault();
    this.setState({
      desc: e.target.value
    })
  }

  showpass1(e){
      e.preventDefault();
    var x = document.getElementById("pass");
    if (x.type === "password") {
    x.type = "text";
    $("#showpass").removeClass("fa fa-eye").addClass("fa fa-eye-slash");
    }
    else if(x.type==="text"){
    x.type = "password";
    $("#showpass").removeClass("fa fa-eye-slash").addClass("fa fa-eye");
    }
  }
  showpassc(e){
    e.preventDefault();
  var y = document.getElementById("confpass");
  if (y.type === "password") {
    y.type = "text";
  $("#showpass2").removeClass("fa fa-eye").addClass("fa fa-eye-slash");
  } else if(y.type==="text"){
    y.type = "password";
      $("#showpass2").removeClass("fa fa-eye-slash").addClass("fa fa-eye");
  }
  }
  edit(e){
    e.preventDefault();
    if(!this.state.name&&!this.state.passc&&!this.state.desc&&this.state.selectedFile1){
      this.setState({
        none:true
      })
    }
    else{
    console.log(this.state.pass)
    var users = JSON.parse(sessionStorage.getItem('udata'));
     var datau = users[0];
     const data = new FormData();
       data.append('idu',datau.id);
       if(this.state.name){
       data.append('nama',this.state.name);
     }
     else{
          data.append('nama',datau.nama);
     }
       if(this.state.selectedFile1){
       data.append('img',this.state.selectedFile1);
     }
       data.append('password',this.state.pass);
       if(this.state.passc){
       data.append('c_password',this.state.passc);
        }
       if(this.state.desc){
       data.append('deskripsi',this.state.desc);
        }
        else{
          data.append('deskripsi',datau.deskripsi);
        }
    axios.post('api/v1/editprofile/update', data, {
          headers:{"Content-Type": "multipart/form-data"}
          }).then(response=>{
        this.setState({show:true})
      })
      .catch(error =>{
        this.setState({
          error:true
        })
      });
  }
}
  componentDidUpdate(){
    if(this.state.update){
      this.setState({
        update:false
      })
       const user = {
         email: this.state.profil.email,
         password: this.state.pass
       }
        let uri = 'api/v1/login';
        axios.post(uri, user).then(response => {
              this.setState({ profileup:response.data.data });
              sessionStorage.setItem("udata", JSON.stringify(this.state.profileup));
              window.location.reload();

  })
  }
}
render(){
  var {profil} = this.state;

  return(
    <div key={this.state.profil}>
    <LoadingOverlay
      active={this.state.isactive}
      spinner
      text='Mohon Tunggu...'
      >
    <br/>
    <br/>
    <div className="container bootstrap snippets">
<div className="row">
  <div className="col-xs-12 col-sm-9">
    <form className="form-horizontal" onSubmit={this.edit}>
        <div className="panel panel-default">
          <div className="panel-body text-center">
        {profil.gambar===null ? <img id="profpict" src="https://bootdey.com/img/Content/avatar/avatar6.png" style={{maxHeight:'30vh',width:'auto'}} className="img-circle profile-avatar" alt="User avatar"/> :
        <img id="profpict" src={'images/avatar/'+profil.gambar} style={{maxHeight:'30vh',width:'auto'}} className="img-circle profile-avatar" alt="User avatar"/>}
           <br/>
           <br/>
          <center> <input type="file" id="img-source1" onChange={this.previewImage} className="form-control" style={{width:"30%"}}/> </center>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
      <div className="panel panel-default">
        <div className="panel-heading">
        <h3 className="panel-title">Data Diri</h3>
        </div>
        <br/>
        <div className="panel-body">
        <div className="form-group">
          <label className="col-sm-2 control-label">Email</label>
          <div className="col-sm-10">
            <input type="text" value={profil.email} readOnly="readOnly" className="form-control" />
          </div>
        </div>
          <div className="form-group">
            {profil.role===1 ? <label className="col-sm-2 control-label">Nama Vendor</label> : <label className="col-sm-2 control-label">Nama Lengkap</label>}
            <div className="col-sm-10">
              <input type="text" className="form-control" maxLength="50" defaultValue={profil.nama} placeholder={profil.nama} onChange={this.name}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Jenis Pengguna</label>
            <div className="col-sm-10">
              <input type="text" readOnly="readOnly" value={profil.role===0 ? "Player/Pengguna" : profil.role===1 ? "Vendor/Pengada Kompetisi" : '' } className="form-control" />
            </div>
            </div>
          {profil.role===1 ?
            <div className="form-group">
              <label className="col-sm-2 control-label" >Deskripsi Vendor</label>
              <div className="col-sm-10">
                <textarea rows="3" maxLength="255" className="form-control" onChange={this.desc} defaultValue={profil.deskripsi}></textarea>
              </div>
            </div> : ''}
            <div className="form-group">
              <label className="col-sm-2 control-label">Ubah Kata Sandi</label>
              <div className="col-sm-10">
                <input type="password" name="c_password" id="confpass" pattern=".{8,16}" onChange={this.passc} className="form-control" title="harus berisi 8-16 karakter"/>
  <button className="fa fa-eye" aria-hidden="true" style={{border:"none", position:"absolute", right:"5%", top:"30%", borderRadius:"100%"}} onClick={this.showpassc} value="Show" id="showpass2"></button>
              </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Kata Sandi*</label>
            <div className="col-sm-10">
              <input type="password" id="pass" pattern=".{8,16}" onChange={this.pass} className="form-control" required />
                <button className="fa fa-eye" aria-hidden="true" style={{border:"none", position:"absolute", right:"5%", top:"30%", borderRadius:"100%"}} onClick={this.showpass1} value="Show" id="showpass"></button>
            </div>
        </div>
        </div>
      </div>


      <div className="panel panel-default">
        <div className="panel-body">
          <div className="form-group">
            <div className="col-sm-10 col-sm-offset-2">
              <button type="submit" className="btn btn-primary">Ubah Data</button>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
</div>

<SweetAlert
 show={this.state.show}
 title="Berhasil"
 text="Data Berhasil Diperbarui"
 onConfirm={() => this.setState({ show: false, update:true})}
/>
<SweetAlert
show={this.state.none}
title="Gagal!"
text="Tidak ada yang diubah"
onConfirm={() => this.setState({none: false})}
/>
<SweetAlert
show={this.state.error}
title="Gagal!"
text="Password Yang Anda Masukkan Salah!"
onConfirm={() => this.setState({error: false})}
/>
</LoadingOverlay>
    </div>
  )
}
}

export default Myaccount;
