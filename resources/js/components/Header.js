import React, {Component} from 'react';
import { Router, Route, withRouter } from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import {useSelector} from 'react-redux';
class Header extends Component{
  constructor(props){
    super(props);
    this.state={jml:'',update:false}
    this.direct=this.direct.bind(this);
    this.searching=this.searching.bind(this);
    this.linking=this.linking.bind(this);
  }
  linking(e,p){
    e.preventDefault();
    window.location.replace('#/kompetisi/game-'+p+'/semua')
  }

  componentDidMount(){
    window.scrollTo(0,0)
    console.log(this.props.location.pathname)
    window.addEventListener('scroll', () => {
        let activeClass = 'normal';
        if(window.scrollY<=10){
            activeClass = 'top';
        }
        this.setState({ activeClass });
     });
  }
  hide(e){
    console.log('keklik')
    if($("#navbar-menu").hasClass('collapse navbar-collapse show')){
    $("#navbar-menu").removeClass("collapse navbar-collapse show").addClass("collapse navbar-collapse");
  }
  else if($("#navbar-menu").hasClass('collapse navbar-collapse')){
  $("#navbar-menu").removeClass("collapse navbar-collapse").addClass("collapse navbar-collapse show");
}
  }
  componentDidUpdate(prevProps){
    if(this.state.searched){
      setTimeout(function () {
        this.setState({
          searched:false
        })
      this.props.history.push('/kompetisi/game-'+this.state.search+'/semua')
      }.bind(this), 2000);
    }
    if(this.state.activeClass==='top'){
        $(".top-search.fixed-menu").removeClass("top-search fixed-menu").addClass("top-search");
    }
    else{
       $(".top-search").removeClass("top-search").addClass("top-search fixed-menu");
    }

  }
  direct(e){
    console.log(e.target.value)
    e.preventDefault();
    this.props.history.push('/'+e.target.value)
  }
  trigger(e){
    e.preventDefault();
   var s = document.querySelectorAll('.main-header.fixed-menu');
   console.log(s.length)
   if(s.length!=0){
       $(".top-search").removeClass("top-search").addClass("top-search fixed-menu");
   }
   else{
      $(".top-search.fixed-menu").removeClass("top-search fixed-menu").addClass("top-search");
   }
  }
logout(e){
  e.preventDefault();
  sessionStorage.removeItem('udata');
  window.location.reload();
}
searching(e){
  console.log(e.target.value)
  sessionStorage.setItem("search",1)
    if(e.target.value==='') {
        this.setState({
        searched:true, search:' '
        })
    }
    else {
        this.setState({
        searched:true, search:e.target.value
      })
    } 
}

  render(){
    if(sessionStorage.getItem('udata')!==null){
    var data = JSON.parse(sessionStorage.getItem('udata'));
    var datau = data[0];
  }
    if(sessionStorage.getItem('udata')===null){
      var loginreg =  <div key={loginreg} className="login-box">
          <select id="basic" onChange={this.direct} className="merahoption" data-placeholder="Sign In">
            <option disabled selected hidden>Akun</option>
            <option value="daftar">Daftar</option>
            <option value="masuk">Masuk</option>
          </select>
        </div>;
      }
    else{
      if(datau.role===0){
        var favorit =
        <Link to='/favorit'>
  <i className="fa fa-heart"></i>
  <span className="badge">{this.props.data}</span>
  <p>&nbsp;Favorit</p>
  </Link>;
}
else{
  var favorit =
  <Link to='/event-saya'>
<i className="fa fa-gamepad"></i>
<span className="badge"></span>
<p>&nbsp;Kompetisi Saya</p>
</Link>;
}
  var loginreg =  <div className="login-box">
        <button id="basic" style={{width:"100%",textAlign:"center",borderRadius:"5%"}} className="merahoption" onClick={this.logout}>Keluar</button>

    </div>;
    var akun =
        <li><Link to='/profil'><i className="fa fa-user s_color"></i> Akun Saya</Link></li>;


      }
    return (
      <div>
<div className="main-top">
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="right-phone-box">
                    <p>Hubungi Kami:- <a href="">+6281246417218</a></p>
                </div>
                <div className="our-link">
                    <ul>
                    <li><Link to="/hubungi-kami"><i className="fas fa-headset"></i> Hubungi Kami</Link></li>
                    {akun}
                    </ul>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    {loginreg}
                <div className="text-slid-box">
                    <div id="offer-box" className="carouselTicker">
                        <ul className="offer-box">
                            <li>
                                <i className="fa fa-gamepad"></i> Mobile Legends
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> PUBG Mobile
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> PUBG
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> Tekken 7
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> Arena Of Valor
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> DOTA 2
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> Counter-Strike: Global Offensive
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> Point Blank
                            </li>
                            <li>
                                <i className="fa fa-gamepad"></i> Free Fire
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<header className="main-header">
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
        <div className="container">
            <div className="navbar-header">
                <button onClick={this.hide} className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-bars"></i>
            </button>
                <a className="navbar-brand" href="/"><img src="images/logo.png" className="logo" alt="" /></a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-menu">
                <ul className="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
                  {this.props.location.pathname==='/' ? <li className="nav-item active"><a className="nav-link" href="">Beranda</a></li> :
                  <li className="nav-item"><a className="nav-link" href="">Beranda</a></li> }
                    <li className="dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown">Game</a>
                        <ul className="dropdown-menu">
                            <li><a onClick={(e)=>this.linking(e,'mobile-legends')}>Mobile Legends</a></li>
                            <li><a onClick={(e)=>this.linking(e,'tekken-7')}>Tekken 7</a></li>
                            <li><a onClick={(e)=>this.linking(e,"pubg-mobile")}>PUBG Mobile</a></li>
                            <li><a onClick={(e)=>this.linking(e,"pubg")}>PUBG</a></li>
                            <li><a onClick={(e)=>this.linking(e,"arena-of-valor")}>Arena of Valor</a></li>
                            <li><a onClick={(e)=>this.linking(e,"dota-2")}>DOTA 2</a></li>
                            <li><a onClick={(e)=>this.linking(e,"cs-go")} >Counter-Strike: Global Offensive</a></li>
                            <li><a onClick={(e)=>this.linking(e,"point-blank")} >Point Blank</a></li>
                            <li><a onClick={(e)=>this.linking(e,"free-fire")} >Free Fire</a></li>
                        </ul>
                    </li>
                  {this.props.location.pathname==='/hubungi-kami' ? <li className="nav-item active"><Link className="nav-link" to="/hubungi-kami">Hubungi Kami</Link></li> :
                   <li className="nav-item"><Link className="nav-link" to="/hubungi-kami">Hubungi Kami</Link></li>}
                    {this.props.location.pathname==='/tentang-kami'? <li className="nav-item active"><Link className="nav-link" to="/tentang-kami">Tentang Beresports</Link></li> :
                     <li className="nav-item"><Link className="nav-link" to="/tentang-kami">Tentang Beresports</Link></li>}
{this.props.location.pathname==='/favorit' ? <li className="side-menu active">
                    {favorit}
        </li> : <li className="side-menu">
                            {favorit}
                </li> }
                </ul>
            </div>
            <div className="attr-nav">
                <ul>
                    <li className="search"><a href="#" onClick={this.trigger}><i className="fa fa-search"></i></a></li>

                </ul>
            </div>
        </div>

    </nav>
</header>

<div className="top-search">
    <div className="container">
        <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-search"></i></span>
            <input type="text" onChange={this.searching} className="form-control" placeholder="Cari Game Favorit Kamu" />
            <span className="input-group-addon close-search"><i className="fa fa-times"></i></span>
        </div>
    </div>
    </div>
    </div>
    )
  }
}
export default withRouter(Header);
