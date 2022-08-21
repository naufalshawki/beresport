import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import SweetAlert from 'sweetalert2-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from "react-spinners/ClipLoader";


class Shop extends Component{
      constructor(props){
          super();
          this.state={products:[], update:false, tipe:'', error:false,
          Pn:1, hasmore:false, ap:1, scroll:true,
          cek:{}, dpr:'', cari:false, tunggu:false, lokasi:'',lokasi2:'',
          queue:2}
          this.tipe=this.tipe.bind(this);
          this.wishid=this.wishid.bind(this);
      {/*    this.search=this.search.bind(this);
          this.ddown=this.ddown.bind(this); */}
          this.updatedata=this.updatedata.bind(this);
          this.lokasi=this.lokasi.bind(this);
          this.lokasi2=this.lokasi2.bind(this);
          }
      datafetch(){
        const { match: { params } } = this.props;
       axios.get('api/v1/esportt/'+params.tipe+'-'+params.game+'?page='+1)
       .then(response => {
         if(response.data.data.data<9){
           this.setState({hasmore:false})
         }
         else{
           this.setState({hasmore:true})
         }
         this.setState({ products: response.data.data.data, queue:2  });
       })

         window.scrollTo({top: 0, behavior: 'smooth'});
      }
      infinitedata(){
        const { match: { params } } = this.props;
       axios.get('api/v1/esportt/'+params.tipe+'-'+params.game+'?page='+this.state.queue)
       .then(response => {
         this.setState({ products: this.state.products.concat(response.data.data.data), queue:this.state.queue+1 });
         if(response.data.data.data.length<9){
           this.setState({hasmore:false})
         }
       })
      }
      updatedata(){
        this.setState({
          fetchn:true
        })
      }
      componentDidMount(){
        this.ddown();
        this.datafetch();
        this.wishid();
      }

      wishid(){
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

      lokasi(e){
    e.preventDefault();
    this.setState({
      lokasi: e.target.value, lokasi2:''
    })
}
lokasi2(e){
  e.preventDefault();
  this.setState({
    lokasi2: e.target.value
  })
}
      componentDidUpdate(prevProps){
        if(this.props.location.pathname !== prevProps.location.pathname){
        this.datafetch();
       }
       if(this.state.fetchn){
         this.setState({
           fetchn:false
         })
         this.infinitedata();


       }
       if(this.state.update){
         this.wishid();
         this.setState({
           update:false
         })
       }
      }
      checkwish(e){
        for(var l = 0; l < this.state.cek.length; l++) {
        if (this.state.cek[l].id_esport == e) {
            return true;
             break;
        }
    }
      }
      tipe(e){
        console.log(e)
        this.setState({
          tipe:e
        })
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
                update:true
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

render(){
var { products }=this.state;
if(!this.state.tunggu){
var produk1 = products.filter(products=>products.alamat.match(this.state.lokasi)&&products.alamat1.match(this.state.lokasi2)&&products.tipe.match(this.state.tipe)).map(products=>
  <div title={products.alamat1} className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
      <div className="products-single fix">
      <div className="box-img-hover">
          <div className="type-lb">
              <p className="sale">{products.tipe}</p>
          </div>
          <div className="imageboks" style={{height:"18vh", width:"28vh"}}>
          <img src={'images/esport/'+products.gambar1} className="img-fluid" alt="Image" />
          </div>
          <div className="mask-icon">
              <ul>
                  <li><Link to={'/detail/kompetisi-'+products.id} data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></Link></li>
          {this.checkwish(products.id)===true ? <li><a href="" onClick={(e) => this.wishlist(e, products.id)} data-toggle="tooltip" data-placement="right" title="Tambah Ke Favorit">
          <i className="fa fa-heart"></i></a></li>:<li><a href="" onClick={(e) => this.wishlist(e, products.id)} data-toggle="tooltip" data-placement="right" title="Tambah Ke Favorit">
          <i className="far fa-heart"></i></a></li>}
              </ul>
              <a className="cart"> {new Intl.DateTimeFormat("id", {
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(new Date(products.tanggal))}</a>
          </div>
      </div>
      <div className="why-text">
          <h4>{products.judul}</h4>
          {products.harga === 0 ? <h5>Gratis</h5> : <h5><NumberFormat value={products.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/></h5>}
      </div>
      </div>
  </div>

)
var loaders = <><div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
    <div className="products-single fix">
    <div className="box-img-hover">
        <div className="type-lb">
            <p className="sale"></p>
        </div>
        <div className="imageboks" style={{height:"18vh", width:"28vh"}}>
        </div>
        <div className="mask-icon">
            <ul>
            </ul>
            <a className="cart"> </a></div>
    </div>
    <div className="why-text">
        <h4></h4>
    </div>
    </div>
</div>
<br/><br/><br/>
</>

var produk2=products.filter(products=>products.alamat.match(this.state.lokasi)&&products.alamat1.match(this.state.lokasi2)).slice(0,12).map(products=>
  <div title={products.alamat2} className="list-view-box">
      <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className="products-single fix">
                  <div className="box-img-hover">
                      <div className="type-lb">
                          <p className="new">{products.tipe}</p>
                      </div>
                      <img src={'images/esport/'+products.gambar1} className="img-fluid" alt="Image"/>
                      <div className="mask-icon">
                          <ul>
                              <li><Link to={'/detail/kompetisi-'+products.id} data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></Link></li>
                              {this.checkwish(products.id)===true ? <li><a href="" onClick={(e) => this.wishlist(e, products.id)} data-toggle="tooltip" data-placement="right" title="Tambah Ke Favorit">
                              <i className="fa fa-heart"></i></a></li>:<li><a href="" onClick={(e) => this.wishlist(e, products.id)} data-toggle="tooltip" data-placement="right" title="Tambah Ke Favorit">
                              <i className="far fa-heart"></i></a></li>}
                                </ul>

                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-8 col-xl-8">
              <div className="why-text full-width">
                  <h4>{products.judul}</h4>
                <h6 style={{fontWeight:"700", fontSize:"0.8vw"}}><NumberFormat value={products.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> per slot</h6>
                <h6 style={{fontWeight:"700", fontSize:"0.8vw"}}>Tersisa {products.slot-products.member} dari {products.slot} slot</h6>
                  <a className="btn hvr-hover" onClick={(e) => this.wishlist(e, products.id)}>Tambah ke favorit</a>
              </div>
          </div>
      </div>
  </div>
)
}
else{
  var produk1=<div></div>
    var produk2=<div></div>
}
return(
  <>
    <div className="shop-box-inner">
        <div className="container">
            <div className="row">
                <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
                    <div className="right-product-box">
                        <div className="product-item-filter row">
                            <div className="col-12 col-sm-8 text-center text-sm-left">
                            <div className="toolbar-sorter-right">
                                <span>Tipe</span>
                                <select id="basic" style={{background:"red",marginLeft:"3%",marginTop:"2.5%",color:"white",textTransform:'capitalize'}}
                                data-placeholder="$ USD" onChange={(e) => this.tipe(e.target.value)}>
                                <option data-display="Pilih Tipe" disabled selected hidden>Pilih</option>
                                <option value="">Semua</option>
                                <option value="Offline">Offline</option>
                                <option value="Online">Online</option>
                                </select>
                            </div>
                                <div className="toolbar-sorter-right">
                                    <span>Lokasi</span>
    <select id="basic" className="first" style={{background:"red",marginTop:"2.5%",color:"white",textTransform:'capitalize'}}
    data-placeholder="$ USD" onChange={this.lokasi}>
                  <option value="" disabled selected hidden>Provinsi</option>
                  <option value="">Semua</option>
                  <option value="DKI Jakarta">DKI Jakarta</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                    <select id="bekasi" style={{background:"red",marginTop:"2.5%",marginLeft:"5%",color:"white",textTransform:'capitalize',display:'none'}} onChange={this.lokasi2} required>
                            <option value="" disabled selected hidden>Kota/Kabupaten</option>
                            <option value="">Semua</option>
                           <option value="Bekasi Timur">Bekasi Timur</option>
                           <option value="Bekasi Utara">Bekasi Utara</option>
                           <option value="Bekasi Selatan">Bekasi Selatan</option>
                           <option value="Bekasi Barat">Bekasi Barat</option>
                    </select>
                    <select id="dki" style={{background:"red",marginTop:"2.5%",color:"white",marginLeft:"5%",textTransform:'capitalize',display:'none'}}  onChange={this.lokasi2} required>
                   <option value="" disabled selected hidden>Kota/Kabupaten</option>
                   <option value="">Semua</option>
                   <option value="Jakarta Timur">Jakarta Timur</option>
                   <option value="Jakarta Utara">Jakarta Utara</option>
                   <option value="Jakarta Pusat">Jakarta Pusat</option>
                   <option value="Jakarta Barat">Jakarta Barat</option>
                               <option value="Jakarta Selatan">Jakarta Selatan</option>

</select>

                                </div>
                                <p>Menampilkan <strong>{this.state.products.length}</strong> Hasil</p>

                            </div>
                            <div className="col-12 col-sm-4 text-center text-sm-right">
                                <ul className="nav nav-tabs ml-auto">
                                    <li>
                                        <a className="nav-link active" href="#grid-view" data-toggle="tab"> <i className="fa fa-th"></i> </a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="#list-view" data-toggle="tab"> <i className="fa fa-list-ul"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="product-categorie-box">
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane fade show active" id="grid-view">
                                <InfiniteScroll
         dataLength={this.state.products.length}
         next={this.updatedata}
         hasMore={this.state.hasmore}
         loader={ <center><ClipLoader

          size={150}
          color={"red"}
          loading={this.state.products.length >= 9}
        />
        <br/>
        <br/>
        <br/>
        <br/>
      </center>}
      scrollThreshold={0.6}
       >
                                    <div key={products} className="row">
                                    {produk1}
                                    </div>
</InfiniteScroll>
                                    <div style={{marginLeft:"40%"}}>
                                    {this.state.products.length===0 ? <strong>Data Tidak Ditemukan</strong> :''}
                                    </div>
                                </div>

                                <div role="tabpanel" className="tab-pane fade" id="list-view">

                                  {produk2}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
                    <div className="product-categori">
                    
                        <div className="filter-sidebar-left">
                            <div className="title-left" style={{marginLeft:"1vw"}}>
                                <h3>Menu</h3>
                            </div>
                            <div className="list-group list-group-collapse list-group-sm list-group-tree" id="list-group-men" data-children=".sub-men">
                                <div className="list-group-collapse sub-men">
                                    <a className="list-group-item list-group-item-action" data-toggle="collapse" aria-expanded="true" aria-controls="sub-men1">Judul Game
								</a>
                                    <div className="collapse show" id="sub-men1" data-parent="#list-group-men">
                                        <div className="list-group">
                                            <Link to='/kompetisi/game-mobile-legends/semua' className="list-group-item list-group-item-action">Mobile Legends </Link>
                                            <Link to='/kompetisi/game-pubg-mobile/semua' className="list-group-item list-group-item-action">PUBG Mobile </Link>
                                            <Link to='/kompetisi/game-tekken-7/semua' className="list-group-item list-group-item-action">Tekken 7 </Link>
                                            <Link to='/kompetisi/game-pubg/semua' className="list-group-item list-group-item-action">PUBG </Link>
                                            <Link to='/kompetisi/game-dota-2/semua' className="list-group-item list-group-item-action">DOTA 2 </Link>
                                            <Link to='/kompetisi/game-free-fire/semua' className="list-group-item list-group-item-action">Free Fire </Link>
                                            <Link to='/kompetisi/game-csgo/semua' className="list-group-item list-group-item-action">Counter Strike: Global Offensive </Link>
                                            <Link to='/kompetisi/game-aov/semua' className="list-group-item list-group-item-action">Arena of Valor </Link>
                                            <Link to='/kompetisi/game-point-blank/semua' className="list-group-item list-group-item-action">Point Blank </Link>
                                            <Link to='/kompetisi/game-etc/semua' className="list-group-item list-group-item-action">Lainnya </Link>
                                          </div>
                                    </div>
                                </div>
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
    </>
    )
  }
  ddown(){
        var elem = document.querySelectorAll('.first')
        for(var i =0; i < elem.length; i++){
          elem[i].addEventListener('change',function(e){
            if(e.target.value == 'DKI Jakarta'){
               document.getElementById('dki').style.display = 'inline-block'
               document.getElementById('bekasi').style.display = 'none'
               document.getElementById('like').style.display = 'none'
            }
            if(e.target.value == 'Bekasi'){
               document.getElementById('bekasi').style.display = 'inline-block'
               document.getElementById('dki').style.display = 'none'
               document.getElementById('like').style.display = 'none'
            }
            if(e.target.value == 'Lainnya'){
               document.getElementById('like').style.display = 'inline-block'
               document.getElementById('star').style.display = 'none'
               document.getElementById('set').style.display = 'none'
            }
            if(e.target.value == ''){
               document.getElementById('dki').style.display = 'none'
               document.getElementById('bekasi').style.display = 'none'
               document.getElementById('set').style.display = 'none'
            }
          })
      }
    }

}
export default Shop;
