import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
import RichTextEditor from 'react-rte';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import LoadingOverlay from 'react-loading-overlay';

class Addevent extends Component{
  constructor(props){
  super(props);
  this.state={success:false, token:{},value: RichTextEditor.createEmptyValue()};
  this.judul = this.judul.bind(this);
  this.selectgame = this.selectgame.bind(this);
  this.selectmode = this.selectmode.bind(this);
  this.details = this.details.bind(this);
  this.alamat1 = this.alamat1.bind(this);
  this.alamat2 = this.alamat2.bind(this);
  this.alamat3 = this.alamat3.bind(this);
  this.telp = this.telp.bind(this);
  this.harga = this.harga.bind(this);
  this.tanggal = this.tanggal.bind(this);
  this.slot = this.slot.bind(this);
  this.previewImage3 = this.previewImage3.bind(this);
  this.previewImage2 = this.previewImage2.bind(this);
  this.previewImage = this.previewImage.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.onChange = this.onChange.bind(this);

}


onChange(value){
    this.setState({value, detail:value.toString('html')})
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );

    }
  }
  previewImage(e){
    var gam=document.getElementById("img-source1").files[0];
    if(gam.size>2000000){
      alert('Gambar Melebihi Batas Max. 2MB')
      $('#img-source1').val('');
      return;
    }
    else{
   var contents = e.target.files[0];
   this.setState({selectedFile1: contents});
    var oFReader = new FileReader();
     oFReader.readAsDataURL(document.getElementById("img-source1").files[0]);

    oFReader.onload = function(oFREvent) {
      document.getElementById("image-preview1").src = oFREvent.target.result;
      document.getElementById("notif").innerHTML = "Image not saved yet*";
    };
  }
}
  previewImage2(e) {
    var gam=document.getElementById("img-source2").files[0];
    if(gam.size>2000000){
      alert('Gambar Melebihi Batas Max. 2MB')
      $('#img-source2').val('');
      return;
    }
    else{
   var contents = e.target.files[0];
   this.setState({selectedFile2: contents});
    var oFReader = new FileReader();
     oFReader.readAsDataURL(document.getElementById("img-source2").files[0]);

    oFReader.onload = function(oFREvent) {
      document.getElementById("image-preview2").src = oFREvent.target.result;
      document.getElementById("notif").innerHTML = "Image not saved yet*";
    };

  }
}
  previewImage3(e){
    var gam=document.getElementById("img-source3").files[0];
    if(gam.size>2000000){
      alert('Gambar Melebihi Batas Max. 2MB')
      $('#img-source3').val('');
      return;
    }
    else{
   var contents = e.target.files[0];
   this.setState({selectedFile3: contents});
    var oFReader = new FileReader();
     oFReader.readAsDataURL(document.getElementById("img-source3").files[0]);

    oFReader.onload = function(oFREvent) {
      document.getElementById("image-preview3").src = oFREvent.target.result;
      document.getElementById("notif").innerHTML = "Image not saved yet*";
    };
  }
}
  details(e){
    e.preventDefault();
    this.setState({
      detail: e.target.value
    })
  }
  selectmode(e){
    this.setState({
      mode: e.target.value
    })
  }
  selectgame(e){
    this.setState({
      game: e.target.value
    })
  }
  alamat1(e){
    this.setState({
      alamat1: e.target.value
    })
  }
  alamat2(e){
    this.setState({
      alamat2: e.target.value
    })
  }
  alamat3(e){
    this.setState({
      alamat3: e.target.value
    })
  }
  judul(e){
    this.setState({
      judul: e.target.value
    })
    console.log(this.state.judul);
  }
  telp(e){
    this.setState({
      telp: e.target.value
    })
  }
  harga(e){
    this.setState({
      harga: e.target.value
    })
  }
  slot(e){
    this.setState({
      slot: e.target.value
    })
  }
  tanggal(e){
    this.setState({
      tanggal: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    if($('#alamatawal').val===""){
        alert('Silahkan lengkapi alamat');
        return;
    }
    if(this.state.detail.length>160){
      alert('Deskripsi Maksimal 160 Karakter');
      return;
    }
    this.setState({
      isactive:true
    })
  //  if(sessionStorage.getItem("userData")!==null){
  //  var uDataStr = sessionStorage.getItem("userData");
  //  var datauser = JSON.parse(uDataStr);
  //  var arr = datauser[0];
  console.log(this.state.game);
  var role = JSON.parse(sessionStorage.getItem('udata'));
  var role1 = role[0];
    const data = new FormData();
  //  const input = data.append;
      data.append('judul',this.state.judul);
          data.append('idv',role1.id);
      data.append('namagame',this.state.game);
      data.append('telp',this.state.telp);
      data.append('harga',this.state.harga);
      if(this.state.mode==='Online'){
      data.append('alamat','Online');
      data.append('alamat1','Online');
      data.append('alamat2','Online');
    }
    else{
    data.append('alamat',this.state.alamat1);
    data.append('alamat1',this.state.alamat2);
    data.append('alamat2',this.state.alamat3);
    }
      data.append('tipe',this.state.mode);
      data.append('deskripsi',this.state.detail);
      data.append('img1',this.state.selectedFile1);
      if(this.state.selectedFile2){
        data.append('img2',this.state.selectedFile2);
      }
      if(this.state.selectedFile3){
        data.append('img3',this.state.selectedFile3);
      }
      data.append('vendor',role1.nama);
      data.append('tanggal',this.state.tanggal);
      data.append('slot',this.state.slot);


    let uri = '/api/v1/esport';
    axios.post(uri, data, {
          headers:{"Content-Type": "multipart/form-data"}
          }).then(response => {
      if (response.status === 200) {
          this.setState({ success: true,show:true,isactive:false }); // after signing up, set the state to true. This will trigger a re-render
        }

    });
  }
//}
componentDidUpdate(){
  if(this.state.direct){
    this.props.history.push('/event-saya')
  }
}
  componentDidMount(){
    var role = JSON.parse(sessionStorage.getItem('udata'));
    var role1 = role[0];
    if(role1.nama===null){
      this.props.history.push('/profil');
    }
  var elem = document.querySelectorAll('.first')
  for(var i =0; i < elem.length; i++){
    elem[i].addEventListener('change',function(e){
      if(e.target.value == 'DKI Jakarta'){
         document.getElementById('dki').style.display = 'inline-block'
         document.getElementById('bekasi').style.display = 'none'
         document.getElementById('lain').style.display = 'none'
      }
      if(e.target.value == 'Bekasi'){
         document.getElementById('bekasi').style.display = 'inline-block'
         document.getElementById('dki').style.display = 'none'
         document.getElementById('lain').style.display = 'none'
      }
      if(e.target.value == 'Lainnya'){
         document.getElementById('bekasi').style.display = 'none'
         document.getElementById('dki').style.display = 'none'
         document.getElementById('lain').style.display = 'inline-block'
      }
      if(e.target.value == ''){
         document.getElementById('dki').style.display = 'none'
         document.getElementById('bekasi').style.display = 'none'
         document.getElementById('lain').style.display = 'none'
      }
    })

    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#txtDate').attr('min', maxDate);
  }
  var elemg = document.querySelectorAll('#tipetur')
  for(var i =0; i < elemg.length; i++){
    elemg[i].addEventListener('change',function(e){
      if(e.target.value == 'Online'){
  $("#alamatawal option[value='Online']").attr("selected","selected");
        $("#alamatawal").attr({
 "disabled" : true
});
$("#alamatlengkaps").attr({
"value" : "Kompetisi Berjalan Secara Online",
"placeholder" : "Kompetisi Berjalan Secara Online",
"readOnly":true});
      }
      else{
        $("#alamatawal").attr({
        "disabled" : false
      });
      $("#alamatlengkaps").attr({
      "value" : "",
      "readOnly":false});
            }

    })

}
}



    render(){
      const toolbarConfig = {
   // Optionally specify the groups to display (displayed in the order listed).
   display: ['INLINE_STYLE_BUTTONS','FullScreen'],
   INLINE_STYLE_BUTTONS: [
     {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
     {label: 'Italic', style: 'ITALIC'},
     {label: 'Underline', style: 'UNDERLINE'}
   ]
 };
      var role = JSON.parse(sessionStorage.getItem('udata'));
      var role1 = role[0];
      console.log(role1.role)
      if(sessionStorage.getItem('udata')===null || role1.role===0){
        window.location.replace('/');
      }
      else{
        return(
            <div>
            <LoadingOverlay
              active={this.state.isactive}
              spinner
              text='Mohon Tunggu...'
              >
    <form onSubmit={this.handleSubmit}>

        <div className="container">
            <div className="row mb-5">
                <div className="col-12">

                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="innerWrapper singleOrder mb-3">
                        <div className="orderBox">
                            <h2>KOMPETISI</h2>
                        </div>
                        <br/>
                        <div className="form-group row">
                            <label for="" className="col-md-3 text-center mt-3 control-label"><strong>Pengada Kompetisi
                                </strong></label>
                            <div className="col-md-7">
                                <input type="text" onChange={this.vendor} value={role1.nama} readOnly="readOnly" className="form-control" />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="col-md-12 col-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Gambar 1*</h4>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                <img src="img/noa.jpg" id="image-preview1" className="img-thumbnail text-center" style={{maxHeight:"150px", overflow:"hidden"}}/>
                                                </div>
                                                <div className="col-md-8">
                                                    <label>Masukkan Gambar (Maks 2MB/Gambar)</label>
                                                    <input type="file" id="img-source1" onChange={this.previewImage} className="form-control" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <div className="col-md-12 col-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Gambar 2</h4>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                <img src="img/noa.jpg" id="image-preview2" className="img-thumbnail text-center" style={{maxHeight:"150px", overflow:"hidden"}}/>

                                                </div>
                                                <div className="col-md-8">
                                                    <label>Masukkan Gambar (Maks 2MB/Gambar)</label>
                                                    <input type="file" id="img-source2" onChange={this.previewImage2} className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <div className="col-md-12 col-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Gambar 3</h4>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                <img src="img/noa.jpg" id="image-preview3" className="img-thumbnail text-center" style={{maxHeight:"150px", overflow:"hidden"}}/>

                                                </div>
                                                <div className="col-md-8">
                                                    <label>Masukkan Gambar (Maks 2MB/Gambar)</label>
                                                    <input type="file" id="img-source3" onChange={this.previewImage3} className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <div className="form-group row">
                                      <label for="" className="col-md-4 control-label">Slot</label>
                                      <div className="col-md-4">
                                      <input type="number" min="2" max="50" placeholder="Max. 50 Slot" className="form-control" onChange={this.slot} title="Maksimal 50 slot"  required/>

                                      </div>
                                      </div>
                                <div className="form-group row">
                                    <label for="" className="col-md-4 control-label">Provinsi</label>
                                    <div className="col-md-8">
                                      <select id="alamatawal" className="first form-control" onChange={this.alamat1} >
                                             <option value="" disabled selected hidden>Provinsi</option>
                                             <option value="DKI Jakarta">DKI Jakarta</option>
                                             <option value="Bekasi">Bekasi</option>
                                             <option value="Lainnya">Lainnya</option>
                                             <option value="Online" hidden>Online</option>
                                            </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="" className="col-md-4 control-label">Kota</label>
                                    <div className="col-md-8">
                                    <input type="text" id="lain" style={{display:"none"}} className="form-control" onChange={this.alamat2}
                                        placeholder="Masukkan Nama Kota"  />
                                      <select id="dki" style={{display:"none"}} className="form-control" onChange={this.alamat2}>
                                            <option value="" disabled selected hidden>Kota/Kabupaten</option>
                                             <option value="Jakarta Timur">Jakarta Timur</option>
                                             <option value="Jakarta Utara">Jakarta Utara</option>
                                             <option value="Jakarta Pusat">Jakarta Pusat</option>
                                             <option value="Jakarta Barat">Jakarta Barat</option>
                                             <option value="Jakarta Selatan">Jakarta Selatan</option>
                                            </select>
                                      <select id="bekasi" style={{display:"none"}} className="form-control" onChange={this.alamat2}>
                                              <option value="" disabled selected hidden>Kota/Kabupaten</option>
                                             <option value="Bekasi Timur">Bekasi Timur</option>
                                             <option value="Bekasi Utara">Bekasi Utara</option>
                                             <option value="Bekasi Selatan">Bekasi Selatan</option>
                                             <option value="Bekasi Barat">Bekasi Barat</option>
                                      </select>
                                    </div>
                                </div>

                                <div className="form-group row">
                              <label for="" className="col-md-4 control-label">Alamat Lengkap</label>
                                  <div className="col-md-8">
                              <textarea id="alamatlengkaps" className="form-control" maxLength="160" style={{overflow:"auto"}} onChange={this.alamat3} rows="4"
                            placeholder="Alamat Lengkap untuk Google Maps. Maksimal 160 Karakter" required></textarea>
                                              </div>
                                              </div>
                                </div>
                            <div className="col-md-6 col-12">
                                <div className="col-md-12 col-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><strong>Rincian Kompetisi</strong></h4>
                                        </div>
                                        <div className="panel-body">
                                            <small className=" text-center">
                                                <p className="control-label text-danger"></p>
                                            </small>
                                            <div className="form-group row">
                                                <label for="" className="col-md-5 control-label">Judul Kompetisi*</label>
                                                <div className="col-md-7">
                                                    <input type="text" className="form-control" onChange={this.judul}
                                                        placeholder="Cth: Mobile Legend Competition Jakarta" required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="" className="col-md-5 control-label">Whatsapp (+62)*</label>
                                                <div className="col-md-7">
                                                    <input type="text" className="form-control" onChange={this.telp}
                                                        placeholder="Masukkan nomor (tanpa 0 didepan)" required />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label for="" className="col-md-5 control-label">Biaya Registrasi per Tim/Orang Rp.*</label>
                                                <div className="col-md-7">
                                                    <input type="number" min="0" max="999999999" onChange={this.harga} className="harga form-control"
                                                        placeholder="isi 0 jika gratis" required />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="" className="col-md-5 control-label">Game</label>
                                                <div className="col-md-7">
                                                  <select id="namagame" className="form-control" onChange={this.selectgame}>
                                                        <option value="" disabled selected hidden>Pilih Esports Game</option>
                                                         <option value="ml,mobile-legends,mobilelegends,mobile legends">Mobile Legends</option>
                                                         <option value="pb,point-blank,pointblank,point blank">Point Blank</option>
                                                         <option value="ff,freefire,free-fire,free fire">Free Fire</option>
                                                         <option value="aov,arenaofvalor,arena-of-valor, arena of valor">Arena Of Valor</option>
                                                         <option value="cs-go, csgo, cs go,">CS: GO</option>
                                                         <option value="dota-2, dota 2">Dota 2</option>
                                                         <option value="tekken-7, tekken 7">Tekken 7</option>
                                                         <option value="pubg">PUBG</option>
                                                         <option value="pubgm, pubg-mobile, pubg mobile">PUBG mobile</option>
                                                         <option value="etc">Lainnya(tulis di deskripsi/judul)</option>
                                                        </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="" className="col-md-5 control-label">Mode Turnamen</label>
                                                <div className="col-md-7">
                                                <select id="tipetur" className="form-control" onChange={this.selectmode} >
                                                       <option value="" disabled selected hidden>Pilih Mode Turnamen</option>
                                                       <option value="Offline">Offline</option>
                                                       <option value="Online">Online</option>
                                                      </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="" className="col-md-5 control-label">Tanggal Pelaksanaan</label>
                                                <div className="col-md-7">
                                                <input type="date" id="txtDate" className="form-control" onChange={this.tanggal}  required/>

                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label for="" className="col-md-5 control-label">Deskripsi</label>
                                                <div className="col-md-7">
                                                <RichTextEditor
                                                toolbarConfig={toolbarConfig}
       value={this.state.value}
       onChange={this.onChange}
       placeholder='Silahkan'
     />
                                                </div>
                                            </div>
                                            <br/>
                                            <br/>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 mb-5">
                            <div className="btn-group" role="group" aria-label="...">
                                <button type="submit" className="checking btn" id="roundedButton"><h5>Tambah Kompetisi</h5></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <SweetAlert
     show={this.state.show}
     title="Berhasil"
     text="Kompetisi Berhasil Ditambahkan"
     onConfirm={() => this.setState({ show: false, direct:true })}
   />
   </LoadingOverlay>
</div>
)
}
}
}
export default Addevent;
