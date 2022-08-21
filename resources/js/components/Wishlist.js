import React, {Component} from 'react';
import { Router, Route, withRouter } from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SweetAlert from 'sweetalert2-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

class Wishlist extends Component{
  constructor(props){
    super(props);
    this.state={wishlist:[],updates:false,number:1,hasmore:false}
    this.updatedata=this.updatedata.bind(this);
  }
  delete(e,i){
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
      id:i,
      idu:datau.id
    }
    this.setState({
      input:input
    })

  }
  updatedata(){
    this.setState({
      fetchn:true
    })
  }
  componentDidMount(){
    window.scrollTo(0,0);
   this.firstfetch();
    }
    firstfetch(){
      var users = JSON.parse(sessionStorage.getItem('udata'));
       var datau = users[0];
       const id={
         idu: datau.id
       }
      axios.post('api/v1/wishlist?page=1', id).then(response=>{
        if(response.data.data.data.length>=10){
          this.setState({
            hasmore:true
          })
        }
          this.setState({wishlist:response.data.data.data, total:response.data.data.total})
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
           idu: datau.id
         }
         axios.post('api/v1/wishlist?page=1', id).then(response=>{
             this.setState({wishlist:response.data.data.data})
           })
         var i;
         for(i=2; i<=this.state.number; i++){
         axios.post('api/v1/wishlist?page='+i, id).then(response=>{
             this.setState({wishlist:this.state.wishlist.concat(response.data.data.data)})
           })
      }
    }

    if(this.state.fetchn){
      console.log('coba');
      this.setState({
        fetchn:false
      })
      this.infinitedata();
    }
      if(this.state.del){
        this.setState({del:false})
        axios.post('api/v1/deletewish', this.state.input).then(response=>{
          this.props.parentup();
          })
      }
    }

render(){
  if(sessionStorage.getItem('udata')===null){
    window.location.replace('/');
  }
  else{
    var { wishlist } = this.state;
    var favorit = wishlist.map(wishlist =>    <tr>
        <td className="thumbnail-img">
            <a>
<img className="img-fluid" src={"images/esport/"+wishlist.gambar1} alt="" />
</a>
        </td>
        <td className="name-pr">
            <Link to={'/detail/kompetisi-'+wishlist.id_esport}>
{wishlist.judul}
</Link>
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
            <a>
{wishlist.slot-wishlist.member} / {wishlist.slot}
</a>
</td>
<td className="price-pr">
<strong>
{new Intl.DateTimeFormat("id", {
year: "numeric",
month: "long",
day: "numeric"
}).format(new Date(wishlist.tanggal))}
</strong>
</td>
        <td className="remove-pr">
        <a style={{color:"white"}} className="btn hvr-hover" target="_blank" href={"https://api.whatsapp.com/send?phone="+wishlist.telp}><i className="fab fa-whatsapp"></i></a>

  <a style={{color:"white",marginLeft:"5%"}} onClick={(e)=>this.delete(e,wishlist.id_favorit)} className="btn hvr-hover"><i className="fas fa-times"></i></a>

        </td>
    </tr>);

    return(
    <div className="wishlist-box-main">
        <div className="container">
          <div className="boxmerah"><i className="fa fa-heart" style={{color:"red"}}></i> Kompetisi Favorit ({this.state.total})</div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="table-main table-responsive">
                    <InfiniteScroll
dataLength={this.state.wishlist.length}
next={this.updatedata}
hasMore={this.state.hasmore}
loader={ <center><ClipLoader

size={150}
color={"red"}
loading={true}
/>
<br/>
<br/>
<br/>
<br/>
</center>}
scrollThreshold={0.6}
>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Gambar</th>
                                    <th>Judul</th>
                                    <th>Harga</th>
                                    <th>Tipe</th>
                                    <th>Lokasi</th>
                                    <th>Sisa/Slot</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>

                            {favorit}
                            </tbody>

                        </table>

                                                    </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
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
infinitedata(){
  var users = JSON.parse(sessionStorage.getItem('udata'));
   var datau = users[0];
   const id={
     idu: datau.id
   }
  axios.post('api/v1/wishlist?page='+(this.state.number+1), id).then(response=>{
    if(response.data.data.data.length<10){
     this.setState({hasmore:false})
   }
      this.setState({wishlist:this.state.wishlist.concat(response.data.data.data), number:this.state.number+1})
    });
}
}
export default Wishlist;
