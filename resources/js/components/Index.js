import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import SweetAlert from 'sweetalert2-react';
import LoadingOverlay from 'react-loading-overlay';

class Index extends Component{
  constructor(props) {
    super(props)
        this.state = {
          products: [], jCart:'', update:false, show:false, cek:[], error:false, refresh:false,isactive:true
        };
        this.wishlist=this.wishlist.bind(this);
      }
  componentDidMount(){
      window.scrollTo(0,0)
         axios.get('api/v1/esport')
         .then(response => {
           this.setState({ products: response.data.data,isactive:false });
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
     componentDidUpdate(){
       if(this.state.refresh){
         this.setState({
           refresh:false
         })
         axios.get('api/v1/esport')
         .then(response => {
           this.setState({ products: response.data.data });
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
  coba(e){
    e.preventDefault();
    console.log(e.target.value)
    var on =   document.querySelectorAll('#Online');
    var off=   document.querySelectorAll('#Offline');
    console.log(on)
    var i= 0, i1=0, lon= on.length, loff= off.length;
    if(e.target.value==='All'){
      for(0; i < lon; i++){
          on[i].style.display='block'
      }
        for(0; i1 < loff; i1++){
            off[i1].style.display='block'
        }
    }

    if(e.target.value==='Online'){
      for(0; i1 < loff; i1++){
          off[i1].style.display='none'
      }
      for(0; i < lon; i++){
          on[i].style.display='block'
      }

    }

     if(e.target.value==='Offline'){
       for(0; i<lon; i++){
         on[i].style.display='none'
     }
       for(0; i1<loff; i1++){
           off[i1].style.display='block'
       }
    }
  }
  checkwish(e){
    for(var l = 0; l < this.state.cek.length; l++) {
    if (this.state.cek[l].id_esport == e) {
        return true;
    }
}
  }
  render(){
    var { products } = this.state;
    var produk = products.slice(0,8).map(products =>
          <div id={products.tipe} title={products.alamat1} className={"col-lg-3 col-md-6 special-grid "+products.tipe.toLowerCase()}>
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
                  {this.checkwish(products.id)===true ? <li><a href="" onClick={(e) => this.wishlist(e, products.id)} data-toggle="tooltip" data-placement="right" title="Add to Wishlist">
                  <i className="fa fa-heart"></i></a></li>:<li><a href="" onClick={(e) => this.wishlist(e, products.id)} data-toggle="tooltip" data-placement="right" title="Add to Wishlist">
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
  return (
    <div>
    <div id="slides-shop" className="cover-slides">
        <ul className="slides-container">
            <li className="text-center">
                <img src="images/banner-01.jpg" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Selamat Datang Di <br /> Beresport</strong></h1>
                            <p className="m-b-40">Ikuti Kompetisi Esports Favorit Kamu <br /> Jelajahi Portal Esports Pertama Di Dunia!</p>
                            <p><Link to='/kompetisi/game-tekken-7/semua' className="btn hvr-hover">Jelajahi</Link></p>
                        </div>
                    </div>
                </div>
            </li>
            <li className="text-center">
                <img src="images/banner-02.jpg" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Selamat Datang Di <br /> Beresport</strong></h1>
                            <p className="m-b-40">Ikuti Kompetisi Esports Favorit Kamu <br /> Jelajahi Portal Esports Pertama Di Dunia!</p>
                            <p><Link to='/kompetisi/game-mobile-legends/semua' className="btn hvr-hover">Jelajahi</Link></p>
                        </div>
                    </div>
                </div>
            </li>
            <li className="text-center">
                <img src="images/banner-03.jpg" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Selamat Datang Di <br /> Beresport</strong></h1>
                            <p className="m-b-40">Ikuti Kompetisi Esports Favorit Kamu <br /> Jelajahi Portal Esports Pertama Di Dunia!</p>
                            <p><Link to='/kompetisi/game-pubgm/semua' className="btn hvr-hover">Jelajahi</Link></p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div className="slides-navigation">
            <a href="#" className="next"><i className="fa fa-angle-right" aria-hidden="true"></i></a>
            <a href="#" className="prev"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
        </div>
    </div>
    <div className="categories-shop">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div className="shop-cat-box" style={{height:"26vh"}}>
                        <img className="img-fluid" style={{backgroundSize:"cover"}} src="images/categories_img_01.jpg" alt="" />
                    <Link to={'/kompetisi/game-mobile-legends/semua'} className="btn hvr-hover">Mobile Legends</Link>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div className="shop-cat-box" style={{height:"26vh"}}>
                        <img className="img-fluid" src="images/categories_img_02.jpg" alt="" style={{backgroundSize:"100%",backgroundPosition:"center"}} />
                        <Link to={'/kompetisi/game-tekken-7/semua'} className="btn hvr-hover">Tekken 7</Link>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div className="shop-cat-box" style={{height:"26vh"}}>
                        <img className="img-fluid" src="images/categories_img_03.jpg" alt="" style={{backgroundSize:"100%",backgroundPosition:"center"}} />
                      <Link to={'/kompetisi/game-pubg-mobile/semua'} className="btn hvr-hover">PUBG Mobile</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

	<div className="box-add-products">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-6 col-sm-12">
					<div className="offer-box-products">
						<img className="img-fluid" src="images/add-img-01.jpg" alt="" />
					</div>
				</div>
				<div className="col-lg-6 col-md-6 col-sm-12">
					<div className="offer-box-products">
						<img className="img-fluid" src="images/add-img-02.jpg" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
<div className="products-box">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="title-all text-center">
                        <h1>Kompetisi Esports</h1>
                        <p>Jelajahi Esports Paling Populer di Indonesia</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="special-menu text-center">
                        <div className="button-group filter-button-group">
                            <button value="All" className="active" data-filter="*">All</button>
                            <button value="Online" data-filter=".online">Online</button>
                            <button value="Offline" data-filter=".offline">Offline</button>
                        </div>
                    </div>
                </div>
            </div>
            <LoadingOverlay
              active={this.state.isactive}
              spinner
              text='Kompetisi Sedang Dimuat...'
              >
            <div key={products} className="row special-list">

                {produk}

              </div>

              </LoadingOverlay>
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
export default Index;
