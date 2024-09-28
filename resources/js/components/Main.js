import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allreduce from './reducer';
import Contactus from './Contactus';
import About from './about';
import Header from './Header';
import Footer from './Footer';
import Index from './Index';
import Shopdetail from './Shopdetail';
import Wishlist from './Wishlist';
import Addevent from './Addevent';
import Login from './Login';
import Register from './Register';
import Usermaster from './Usermaster';
import Myaccount from './Myaccount';
import Myevent from './Myevent';
import Shop from './Shop';
import Reduxcoba from './Reduxcoba';

const store = createStore(allreduce);
export default class Main extends Component{
  constructor(props){
    super(props);
    this.state={update:false, show:false}
    this.updates=this.updates.bind(this);
  }

  componentDidMount(){
      if(sessionStorage.getItem('udata')!==null){
        var users = JSON.parse(sessionStorage.getItem('udata'));
         var datau = users[0];
         const id={
           idu: datau.id
         }
         axios.post('api/v1/wishlist?page=1', id).then(response=>{
            console.log(response.data.data.total)
             this.setState({jml:response.data.data.total})
           })
      }
      }

  updates(){
    this.setState({
      update:true
    })
  }
  componentDidUpdate(props){
    if(this.state.update){
      var users = JSON.parse(sessionStorage.getItem('udata'));
       var datau = users[0];
       const id={
         idu: datau.id
       }
       axios.post('api/v1/wishlist?page=1', id).then(response=>{

           this.setState({jml:response.data.data.total, update:false, show:true})

   })
  }
}

  render(){
    return(
      <Routers>
        <Provider store={store}>
        <Header data={this.state.jml}/>
        <Switch>
            <Route exact path="/" render={(props) => <Index {...props} parentup={this.updates} />}/>
              <Route path="/detail/kompetisi-:idv" component={(props) => <Shopdetail {...props} parentup={this.updates} />} />
              <Route path="/favorit" render={(props) => <Wishlist {...props} parentup={this.updates} />}/>
              <Route path="/event-saya" component={Myevent} />
              <Route path="/event-baru" component={Addevent} />
              <Route path="/daftar" component={Register} />
              <Route path="/masuk" component={Login} />
              <Route path="/profil" component={Myaccount} />
              <Route path="/hubungi-kami" component={Contactus} />
              <Route path="/tentang-kami" component={About} />
              <Route path="/kompetisi/game-:game/:tipe" render={(props) => <Shop {...props} parentup={this.updates} />} />
        </Switch>
        <Footer/>
      <SweetAlert
      show={this.state.show}
      title="Berhasil"
      text="Kompetisi Berhasil Ditambahkan Ke Wishlist"
      onConfirm={() => this.setState({ show: false })}
    />
      </Provider>
    </Routers>

  );
}
}
if (document.getElementById('app')) {
        ReactDOM.render(<Main />, document.getElementById('app'));
      }
