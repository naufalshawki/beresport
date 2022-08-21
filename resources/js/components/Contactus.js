import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import SweetAlert from 'sweetalert2-react';

class Contactus extends Component{
constructor(){
  super();
  this.state={show:false}
  this.submit=this.submit.bind(this);
  this.email=this.email.bind(this);
  this.pesan=this.pesan.bind(this);
}
email(e){
  e.preventDefault();
  this.setState({
    email:e.target.value
  })
}
pesan(e){
  e.preventDefault();
  this.setState({
    pesan:e.target.value
  })
}
componentDidUpdate(){
  if(this.state.updates){
    this.setState({
      updates:false
    })
    window.location.reload();
  }
}
componentDidMount(){
   window.scrollTo(0,0)
}
submit(e){
  e.preventDefault();
  const input={
    email:this.state.email,
    pesan:this.state.pesan
  }
  axios.post('api/v1/kirimpesan',input).then(res=>
  this.setState({
    show:true
  }));
}
render(){

return(
    <div className="contact-box-main">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-sm-12">
                    <div className="contact-form-right">
                        <h2>Hubungi Kami</h2>
                        <p>Hubungi kami jika masalah, kritik, maupun saran agar website dapat berkembang lebih baik lagi.</p>
                        <form id="contactForm" onSubmit={this.submit}>
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="email" onChange={this.email} placeholder="Email Anda" id="email" className="form-control" name="name" required data-error="Masukkan Email Anda" />
                                        <div className="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <textarea onChange={this.pesan} className="form-control" id="message" placeholder="Pesan Anda" rows="4" data-error="Tulis Pesan Anda" required></textarea>

                                    </div>
                                    <div className="submit-button text-center">
                                        <button className="btn hvr-hover" id="submit" type="submit">Kirim Pesan</button>
                                        <div id="msgSubmit" className="h3 text-center hidden"></div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
				<div className="col-lg-4 col-sm-12">
                    <div className="contact-info-left" style={{color:"black"}}>
                        <h2>Informasi Kontak</h2>
                        <p>Informasi seputar kontak perusahaan</p>
                        <ul>
                            <li>
                                <p style={{color:"black"}}><i className="fas fa-map-marker-alt"></i>Alamat: PT. BeriCorps Indonesia <br/>Jalan Raya Mimpi Indah,<br/> JT 13420 </p>
                            </li>
                            <li>
                                <p style={{color:"black"}}><i className="fas fa-phone-square"></i>No. Telp: <a href="tel:+1-888705770">+62-812 464 172 18</a></p>
                            </li>
                            <li>
                                <p style={{color:"black"}}><i className="fas fa-envelope"></i>Email: <a href="mailto:beresport@gmail.com">beresport@gmail.com</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <SweetAlert
                 show={this.state.show}
                 title="Berhasil"
                 text="Data Berhasil dihapus"
                 onConfirm={() => this.setState({ show: false, updates:true })}
               />
    </div>

)
}
}
export default Contactus;
