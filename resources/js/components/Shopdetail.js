import React, {Component} from 'react';
import { Router, Route, withRouter } from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import { Lightbox } from 'react-modal-image';
import SweetAlert from 'sweetalert2-react';
class Shopdetail extends Component{
  constructor(props){
    super(props)
    this.state={detail:{}, sisa:'', open:false, target:'', vendori:{},cek:[]}
    this.modal=this.modal.bind(this);
    this.close=this.close.bind(this);
    this.wishlist=this.wishlist.bind(this);
  }
  checkwish(e){
    for(var l = 0; l < this.state.cek.length; l++) {
    if (this.state.cek[l].id_esport == e) {
        return true;
        break;
    }
}
  }
  componentDidMount(){
    window.scrollTo(0, 0)
      const { match: { params } } = this.props;
         axios.get('api/v1/esport/' + params.idv)
         .then(response => {
           axios.get('api/v1/ambilv/' + response.data.data.idv).then(res=>{
             this.setState({
               vendori: res.data.data[0], detail:response.data.data, sisa: response.data.data.slot - response.data.data.member
             })
           })
           console.log(this.state.sisa)
         })
         .catch(function (error) {
           console.log(error);
         })
         if(sessionStorage.getItem('udata')!==null){
           var users = JSON.parse(sessionStorage.getItem('udata'));
            var datau = users[0];
            const id={
              idu: datau.id
            }
         axios.post('api/v1/cekwishlist', id).then(response=>{
             this.setState({cek:response.data.data})
           })
       }
     }
     wishlist(e, i){
       e.preventDefault();
       var ucheck=sessionStorage.getItem('udata');
       if(ucheck!==null){
       var data = JSON.parse(sessionStorage.getItem('udata'));
       var datau = data[0];
       if(datau.role===0){
       console.log(e.target.value)
       const input ={
         idu: datau.id,
         ides: i,
         token: datau.api_token
       }
       axios.post('api/v1/tambahwishlist', input).then(response=>{
             this.props.parentup();
             this.setState({
               refresh:true
             })
  }).catch(error =>{
    this.setState({error:true});
    console.log('tester');
    // make API call
  })
 }
 else{
  this.setState({error1:true})
 }
 }
 else{
  this.setState({error2:true})
 }
 }

     componentDidUpdate(){

     }
     modal(e){
       e.preventDefault();
       console.log(e.target.src)
       this.setState({
         target: e.target.src, open: true
       })
     }
     close(e){
       e.preventDefault();
       this.setState({
         open:false
       })
     }
  render(){
    var { detail } = this.state;
      var { vendori } = this.state;
    console.log(detail.judul);
    var judul = <h2>{detail.judul} Oleh {detail.vendor}</h2>;
    var harga = <h5><NumberFormat value={detail.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> per slot</h5>;
    var slot = <p className="available-stock"><span> Tersisa {this.state.sisa} / <a href=""> dari {detail.slot} slot </a></span></p>;
    var deskripsi = <p dangerouslySetInnerHTML={{__html: detail.deskripsi}} />;
    var alamat = <p className="available-stock"><span> Lokasi: {detail.alamat} / {detail.alamat1} </span></p>;
    var alamatlengkap = <p style={{color:'black',fontWeight:"700"}}>{detail.alamat2}, {detail.alamat1}, {detail.alamat}</p>;
    if(detail.tipe==='Online'){
    var tipe = <h5 style={{textTransform:'uppercase', color:'#34eb34'}}>{detail.tipe}</h5>;
  }
  else{
        var tipe = <h5 style={{textTransform:'uppercase', color:'red'}}>{detail.tipe}</h5>;
  }
  return(
    <div key={vendori}>
    { this.state.open && (
      <Lightbox
        large={this.state.target}
        alt="Tampilan Layar Penuh"
        onClose={this.close}
        hideDownload={true}
        hideZoom={true}
      />
    ) }
    <div className="shop-detail-box-main">
        <div className="container">
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-6">
                    <div id="carousel-example-1" className="single-product-slider carousel slide" data-ride="carousel">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                            <img className="d-block w-100" onClick={this.modal} src={'images/esport/'+detail.gambar1} alt="First slide" /> </div>
                            {detail.gambar2 ? <div className="carousel-item"> <img className="d-block w-100" onClick={this.modal} src={'images/esport/'+detail.gambar2} alt="Second slide" /> </div> : ''}
                            {detail.gambar3 ? <div className="carousel-item"> <img className="d-block w-100" onClick={this.modal} src={'images/esport/'+detail.gambar3} alt="Third slide" /> </div> : ''}
                        </div>
                        <a className="carousel-control-prev" href="#carousel-example-1" role="button" data-slide="prev">
						<i className="fa fa-angle-left" aria-hidden="true"></i>
						<span className="sr-only">Previous</span>
					</a>
                        <a className="carousel-control-next" href="#carousel-example-1" role="button" data-slide="next">
						<i className="fa fa-angle-right" aria-hidden="true"></i>
						<span className="sr-only">Next</span>
					</a>
                    {detail.gambar2 || detail.gambar3 ? <ol className="carousel-indicators">
                            <li data-target="#carousel-example-1" data-slide-to="0" className="active">
                                <img className="d-block w-100 img-fluid" src={'images/esport/'+detail.gambar1} alt="" />
                            </li>
                        {detail.gambar2  ?  <li data-target="#carousel-example-1" data-slide-to="1">
                                <img className="d-block w-100 img-fluid" src={'images/esport/'+detail.gambar2} alt="" />
                            </li> : ''}
                        {detail.gambar3  ?  <li data-target="#carousel-example-1" data-slide-to="2">
                                <img className="d-block w-100 img-fluid" src={'images/esport/'+detail.gambar3} alt="" />
                            </li> : ''}
                        </ol> : ''}
                    </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-6">
                    <div className="single-product-details">
                        <h2>{judul}</h2>
                        {tipe}
                {detail.harga>0 ? harga : 'Turnamen Gratis!'}
                        {slot}
						<h4>Detail Lebih</h4>
            <div style={{borderRadius:"1.3vw",color:'black',lineHeight:'1.5',border:"1px solid #636261",boxShadow:'2px 5px 15px 10px #888888',paddingTop:"2%",paddingLeft:"2%"}}>
        	{deskripsi}
          </div>
          <br/>
          <br/>
						<ul>
							<li>
								<div className="form-group quantity-box">
									<label className="control-label" style={{fontWeight:'bold'}}>Alamat Lengkap</label>
								{detail.tipe==='Online'	? <p style={{color:'black',fontWeight:"700"}}>Kompetisi Dijalankan Secara Online</p> : detail.tipe==='Offline' ? <p style={{color:'black',fontWeight:"700"}}>{detail.alamat2}, {detail.alamat1}, {detail.alamat}</p> : ''}
								</div>
							</li>
						</ul>

						<div className="price-box-bar">
							<div className="cart-and-bay-btn">
							{detail.tipe==="Offline"	? <a className="btn hvr-hover" data-fancybox-close="" target="_blank" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(detail.alamat2)}>Buka di Google Maps</a>:''}
							</div>
						</div>

						<div className="add-to-btn">
							<div className="add-comp">
								{this.checkwish(detail.id)===true ? <a className="btn hvr-hover" style={{color:'white'}}><i className="fas fa-heart"></i> Sudah ada di favorit</a> : <a className="btn hvr-hover" style={{color:'white'}} onClick={(e) => this.wishlist(e, detail.id)}><i className="far fa-heart"></i> Tambah Ke Favorit</a>}
                <a className="btn hvr-hover" target="_blank" href={"https://api.whatsapp.com/send?phone="+detail.telp}><i className="fab fa-whatsapp"></i> Hubungi Penyelenggara</a>
                </div>
							<div className="share-bar">
            		<a className="btn hvr-hover" target='_blank' href={"https://www.facebook.com/sharer/sharer.php?u="+window.location.href}><i className="fab fa-facebook" aria-hidden="true"></i></a>
							<a className="btn hvr-hover" target='_blank' href={"https://twitter.com/intent/tweet?text="+window.location.href}><i className="fab fa-twitter" aria-hidden="true"></i></a>
							</div>
						</div>
                    </div>
                </div>
            </div>

			<div className="row my-5">
				<div className="card card-outline-secondary my-4">
					<div className="card-header">
						<h2>Pengada Kompetisi</h2>
					</div>
					<div className="card-body">
						<div className="media mb-3">
							<div className="mr-2">
                                <img className="rounded-circle"
                                src={'images/avatar/'+vendori.gambar}
                                alt="Generic placeholder image"
                                style={{maxWidth:"6vw",height:'auto'}} />
							</div>
							<div className="media-body" style={{width:"1000px"}}>
              <h2><strong>{vendori.nama}</strong></h2>
              "{vendori.deskripsi}"
							</div>
						</div>
					</div>
				  </div>
			</div>



        </div>
    </div>
    <SweetAlert
     show={this.state.error}
     title="Gagal"
     text="Kompetisi Sudah ada Di Wishlist"
     onConfirm={() => this.setState({ error: false })}
   />
   <SweetAlert
    show={this.state.error1}
    title="Gagal"
    text="Anda Terdaftar Sebagai Pengada Kompetisi"
    onConfirm={() => this.setState({ error1: false })}
  />
   <SweetAlert
        show={this.state.error2}
        title="Gagal"
        text="Silahkan Login Terlebih Dahulu"
        onConfirm={() => this.setState({ error2: false })}
      />
    </div>
    )
  }
}
export default Shopdetail;
