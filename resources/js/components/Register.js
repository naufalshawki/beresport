import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect, withRouter} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import { useForm } from "react-hook-form";
import LoadingOverlay from 'react-loading-overlay';

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {isSignedUp: false, show: false, reload:false, failed:false};

    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.confpassword = this.confpassword.bind(this);
    this.role = this.role.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  email(e){
    e.preventDefault();
    this.setState({
      email: e.target.value
    })
  }

  password(e){
    e.preventDefault();
    this.setState({
      pass: e.target.value
    })
  }
  confpassword(e){
    e.preventDefault();
    this.setState({
      confpass: e.target.value
    })
  }
  role(e){
    e.preventDefault();
    this.setState({
      role: e.target.value
    })
  }


  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.pass)
    console.log(this.state.confpass)
    if(!this.state.role){
      alert('Silahkan Pilih Jenis Akun');
    }
    else if (this.state.pass === this.state.confpass) {
      this.setState({
        isactive:true
      })
      const users = {
        email: this.state.email,
        password: this.state.pass,
        role: this.state.role
      }
      let uri = 'api/v1/daftar';
      axios.post(uri, users).then(response => {
        if (response.status === 200) {
            this.setState({ isactive:false, show:true });
            sessionStorage.setItem("register",1); // after signing up, set the state to true. This will trigger a re-render
          }
          })
      .catch(error =>{
        this.setState({failed:true,isactive:false});
        console.log('tester');
        // make API call
      });
   }
   else {
     alert("Kata sandi tidak sesuai");
     }
}
componentWillMount(){
  window.scrollTo(0,0)
}
componentDidUpdate(){
  if (this.state.isSignedUp) {
   // redirect to home if signed up
  window.location.replace('/');
 }
}

loginpage(){

}


  render(){
    return(
  <div>
  <LoadingOverlay
    active={this.state.isactive}
    spinner
    text='Mohon Tunggu...'
    >
  <SweetAlert
   show={this.state.show}
   title="Pendaftaran Berhasil"
   text="Segera Verifikasi Email Anda, Terima kasih"
   onConfirm={() => this.setState({ show: false, isSignedUp:true})}
 />

 <SweetAlert
  show={this.state.failed}
  title="Pendaftaran gagal"
  text="Email sudah digunakan"
  onConfirm={() => this.setState({failed: false})}
 />
 <div className="limiter">
   <div className="container-login100">
     <div className="wrap-login100">

       <div className="login100-pic"><br/>
         <br/><img src="images/beresport1.png"/>
       </div>

        <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
        <span className="login100-form-title">
          Daftar
        </span>


        <div className="wrap-input100 validate-input" data-validate = "Email dibutuhkan">
          <input className="input100" type="email" onChange={this.email} placeholder="Masukkan Email" required title="masukkan email" />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
        </div>
        <div className="wrap-input100 validate-input" data-validate = "Kata sandi dibutuhkan">
          <input className="input100" id="pass" type="password" pattern=".{8,16}" onChange={this.password} placeholder="Masukkan Kata Sandi" required title="harus berisi 8-16 karakter"/>
        <button className="fa fa-eye" aria-hidden="true" style={{border:"none", position:"absolute", right:"5%", top:"30%", borderRadius:"100%"}} onClick={this.showpass1} value="Show" id="showpass"></button>
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
        </div>
        <div className="wrap-input100 validate-input" data-validate = "Konfirmasi Kata Sandi">
          <input className="input100" id="confpass" type="password" onChange={this.confpassword} placeholder="Konfirmasi Kata sandi" required title="Password Tidak Sama" />
         <button className="fa fa-eye" aria-hidden="true" style={{border:"none", position:"absolute", right:"5%", top:"30%", borderRadius:"100%"}} onClick={this.showpassc} value="Show" id="showpass2"></button>
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
        </div>
        <div className="wrap-input100 validate-input" data-validate = "Daftar Sebagai">
          <select className="input100" onChange={this.role} required>
          <option selected hidden>Daftar Sebagai</option>
          <option value="0">Pengguna/Player</option>
          <option value="1">Pengada Kompetisi (Vendor)</option>
          <span className="focus-input100"></span>
          </select>
        </div>

        <div className="container-login100-form-btn">
          <button className="login100-form-btn" type="submit">
           Daftar
          </button>
        </div>
       <Link to="/masuk"><p style={{marginLeft:"2%",marginTop:"0"}}>Sudah Punya Akun? Masuk Di sini!</p></Link>
      </form>
    </div>
    </div>
    </div>

   </LoadingOverlay>

    </div>
    )
  }
}

export default withRouter(Register);
