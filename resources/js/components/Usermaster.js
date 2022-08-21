import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect, withRouter, Switch} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import Register from './Register';
import Login from './Login';

class Usermaster extends Component{

componentWillMount(){
  window.scrollTo(0,0);
}
pindahl(){
   document.getElementById('logn').style.display = 'inline-block'
     document.getElementById('regist').style.display = 'none'
}

pindahr(){
   document.getElementById('registlogn').style.display = 'inline-block'
     document.getElementById('logn').style.display = 'none'
}

  render(){

    return(
  <div>
<div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100">

      <div className="login100-pic" data-tilt><br/>
        <br/><img src="img/tokopon2.png"/>
      </div>
      <div id="regist">
      <Register/>
      </div>
    </div>
  </div>
</div>
</div>
    )
  }
}

export default withRouter(Usermaster);
