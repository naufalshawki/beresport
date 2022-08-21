import React, {Component} from 'react';
import { Router, Route, withRouter } from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import SweetAlert from 'sweetalert2-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Myevent extends Component{
  constructor(props){
    super(props);
    this.state={wishlist:[],update:false,del:false}
    this.member=this.member.bind(this);
    this.submit=this.submit.bind(this);
    this.delete=this.delete.bind(this);
  }
  delete(e,i,v){
    console.log(i)
      console.log(v)
      confirmAlert({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        buttons: [
          {
            label: 'Ya',
            onClick: () => this.setState({del:true})
          },
          {
            label: 'Tidak',
            onClick: () => ''
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      });

    e.preventDefault();
    var users = JSON.parse(sessionStorage.getItem('udata'));
     var datau = users[0];
    const input={
      ide:i,
      idv:v,
      idu:datau.id,
      token:datau.api_token
    }
    this.setState({
      input:input
    })

  }
  member(e,i,v,s){
    if(e.target.value>s){
      this.setState({
        errorm:true
      })
    }
    else{
    this.setState({
      member: e.target.value,
      ide: i,
      idv: v
    })
  }
}
  submit(e){
    e.preventDefault();
    var users = JSON.parse(sessionStorage.getItem('udata'));
     var datau = users[0];
     const id={
       idu: datau.id,
       token: datau.api_token,
       member: this.state.member,
       ide: this.state.ide,
       idv: this.state.idv
     }
     axios.post('api/v1/updateslot', id).then(response=>{
         this.setState({show:true})
       }).catch(error => {
     this.setState({Error: true})
   })
  }
  componentDidMount(){
   var users = JSON.parse(sessionStorage.getItem('udata'));
    var datau = users[0];
    const id={
      id: datau.id,
      token: datau.api_token
    }
    axios.post('api/v1/myevent', id).then(response=>{
        this.setState({wishlist:response.data.data})
      }).catch(error => {
    this.setState({Error: true})
  })
    }

    componentDidUpdate(){
      if(this.state.updates){
        this.setState({
          updates:false
        })
        var users = JSON.parse(sessionStorage.getItem('udata'));
         var datau = users[0];
         const id={
           id: datau.id,
           token: datau.api_token
         }
         axios.post('api/v1/myevent', id).then(response=>{
             this.setState({wishlist:response.data.data})
           }).catch(error => {
         this.setState({Error: true})
       })
      }
      if(this.state.del){
        axios.post('api/v1/deleteevent', this.state.input).then(response=>{
            this.setState({show1:true,del:false})
          }).catch(error => {
        this.setState({Error: true})
      })
      }
    }

render(){
  if(sessionStorage.getItem('udata')===null){
    window.location.replace('/');
  }
  else{
    var { wishlist } = this.state;
    if(this.state.wishlist.length!==0){
    var favorit = wishlist.map(wishlist =>    <tr>
        <td className="thumbnail-img">

<img className="img-fluid" src={"images/esport/"+wishlist.gambar1} alt="" />

        </td>
        <td className="name-pr">
            <a href={'#/detail/kompetisi-'+wishlist.id} target='_blank'>
{wishlist.judul}
</a>
        </td>
        <td className="price-pr">
            <p><NumberFormat value={wishlist.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> per slot</p>
        </td>
        {wishlist.tipe==='Offline' ? <td className="name-pr" style={{color:'red',fontWeight:'700'}}>
{wishlist.tipe}
</td> : <td className="name-pr" style={{color:'green', fontWeight:'700'}}>
{wishlist.tipe}
</td>}
   <td className="price-pr">
        {wishlist.alamat} / <br/>
        {wishlist.alamat1}
        </td>
        <td className="price-pr">
            <form onSubmit={this.submit}><input type="number" onChange={(e)=>this.member(e,wishlist.id,wishlist.idv,wishlist.slot)} maxLength={wishlist.slot} style={{width:"20%",textAlign:"center"}} defaultValue={wishlist.member} />
  &nbsp;&nbsp;&nbsp;/ {wishlist.slot}
</form>
</td>
<td className="price-pr">

{new Intl.DateTimeFormat("id", {
year: "numeric",
month: "long",
day: "numeric"
}).format(new Date(wishlist.tanggal))}

</td>
        <td className="remove-pr">

<i onClick={(e)=>this.delete(e,wishlist.id,wishlist.idv)} className="fas fa-times"></i>
        </td>
    </tr>);
}
    else{
      var favorit=<div><br/><h1>Belum ada event terdaftar</h1></div>
    }

    return(
    <div className="wishlist-box-main">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <Link to='/event-baru'><button className="btn hvr-hover" style={{color:"white",borderRadius:"7%"}}>Tambah Kompetisi (+)</button></Link>
                  <br/>
                  <br/>
                    <div className="table-main table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Gambar</th>
                                    <th>Judul</th>
                                    <th>Harga</th>
                                    <th>Tipe</th>
                                    <th>Lokasi</th>
                                    <th>Pendaftar / Slot</th>
                                    <th>Tanggal</th>
                                    <th>Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                            {favorit}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <SweetAlert
             show={this.state.errorm}
             title="Gagal"
             text="Masukkan Jumlah Pendaftar Yang Valid!"
             onConfirm={() => this.setState({ errorm: false })}
           />
           <SweetAlert
                    show={this.state.show}
                    title="Berhasil"
                    text="Data Berhasil ditambahkan"
                    onConfirm={() => this.setState({ show: false, update:true })}
                  />
                  <SweetAlert
                           show={this.state.show1}
                           title="Berhasil"
                           text="Data Berhasil dihapus"
                           onConfirm={() => this.setState({ show1: false, updates:true })}
                         />


    </div>
    )
}
}
}
export default Myevent;
