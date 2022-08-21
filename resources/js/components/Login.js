import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect, withRouter} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import LoadingOverlay from 'react-loading-overlay';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {isSignedIn: false, show: false, reload:false, failed:false, userdata:{}};

    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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


  handleLogin(e){
    e.preventDefault();
    this.setState({
      isactive:true
    })
    const users = {
      email: this.state.email,
      password: this.state.pass
    }
     let uri = 'api/v1/login';
     axios.post(uri, users).then(response => {
       console.log(response.status)
       if (response.status === 200) {
           this.setState({ isSignedIn:true, isactive:false, userdata:response.data.data });
           if(response.data.data[0].status==='BELUM VERIFIKASI'){
             this.setState({
               errorv:true,isactive:false
             })
           }
           else{
           sessionStorage.setItem("udata", JSON.stringify(this.state.userdata)); // after signing up, set the state to true. This will trigger a re-render
          window.location.replace('/');
         }
       }
       else if(response.status===201){
        this.setState({failed1:true,isactive:false})
       }
         })
     .catch(error =>{
       this.setState({failed:true,isactive:false});
       console.log('tester');
     });
     }

componentWillMount(){
  window.scrollTo(0,0)
}


  render(){
    if(sessionStorage.getItem('udata')!==null){
      return <Redirect to = {{pathname:"/"}} />;
    }
    return(
  <div>
  <LoadingOverlay
    active={this.state.isactive}
    spinner
    text='Mohon Tunggu...'
    >
 <SweetAlert
  show={this.state.failed}
  title="Login gagal"
  text="Email tidak ditemukan"
  onConfirm={() => this.setState({failed: false})}
 /><SweetAlert
  show={this.state.failed1}
  title="Login gagal"
  text="Password Yang Anda Masukkan Salah"
  onConfirm={() => this.setState({failed1: false})}
 />
 <SweetAlert
  show={this.state.errorv}
  title="Login gagal"
  text="Silahkan Verifikasi Email Anda Terlebih Dahulu"
  onConfirm={() => this.setState({errorv: false})}
 />
 <div className="limiter">
   <div className="container-login100">
     <div className="wrap-login100">

       <div className="login100-pic"><br/>
         <br/><img src="images/beresport1.png"/>
       </div>
        <form className="login100-form validate-form" onSubmit={this.handleLogin}>
        <span className="login100-form-title">
        Masuk
        </span>


        <div className="wrap-input100 validate-input" data-validate = "Email dibutuhkan">
          <input className="input100" type="email" onChange={this.email} placeholder="Masukkan Email" required />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
        </div>
        <div className="wrap-input100 validate-input" data-validate = "Kata sandi dibutuhkan">
          <input className="input100" id="pass" type="password" pattern=".{8,16}" onChange={this.password} placeholder="Masukkan Kata Sandi" required title="harus berisi 8-16 karakter"/>
        <i className="fa fa-eye" aria-hidden="true" style={{border:"none", position:"absolute", right:"5%", top:"30%", borderRadius:"100%"}} onClick={this.showpass1} value="Show" id="showpass"></i>
          <span className="focus-input100"></span>
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
        </div>

        <div className="container-login100-form-btn">
          <button className="login100-form-btn" type="submit">
           Masuk
          </button>
        </div>
        <Link to="/daftar"><p style={{marginLeft:"2%",marginTop:"0"}}>Belum Punya Akun? Daftar Di sini!</p></Link>
      </form>
    </div>
    </div>
    </div>
    </LoadingOverlay>
    </div>
    )
  }
}

export default withRouter(Login);
