import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import SweetAlert from 'sweetalert2-react';

class About extends Component{
	
  render(){
    return(

    <div className="about-box-main">
        <div className="container">
            <div className="row">
				<div className="col-lg-6">
                    <div className="banner-frame"> <img className="img-fluid" src="images/about-img.jpg" alt="" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <h2 className="noo-sh-title-top">Ini adalah <span>Beresport</span></h2>
                    <p>Beresport adalah portal <italic>E-sports</italic> pertama di Indonesia yang menyediakan tempat bagi para pengada kompetisi memasarkan kompetisinya sekaligus membantu
                    para gamers dalam menemukan kompetisi yang ingin diikutinya. Beresport merupakan inisiatif dari seorang mahasiswa asal Jakarta yang sedang melaksanakan tugas akhir dan diharapkan
                     bisa berguna bagi pemakai nantinya.</p>
                    <p>Beresport dikembangkan selama kurang lebih 4 bulan dan dikerjakan secara individu menggunakan framework yang sama dengan situs-situs mendunia seperti Facebook, Instagram, dan sebagainya.</p>
				      </div>
            </div>
            <div className="row my-5">
                <div className="col-sm-6 col-lg-4">
                    <div className="service-block-inner">
                        <h3>Terpercaya</h3>
                        <p>Website ini tidak memiliki sedikitpun niatan untuk melakukan cybercrime, semua dilakukan hanya untuk membantu gamers dalam mengembangkan komunitas lebih lanjut. </p>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                    <div className="service-block-inner">
                        <h3>Bertekad Besar</h3>
                        <p>Website dikerjakan dengan sepenuh hati dengan harapan maksud dan fungsinya tersalurkan dengan baik.</p>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                    <div className="service-block-inner">
                        <h3>Percaya Diri</h3>
                        <p>Website dikerjakan dengan sepenuh hati dengan harapan maksud dan fungsinya tersalurkan dengan baik.</p>
                    </div>
                </div>
            </div>
                    </div>
    </div>
  )
}
}
export default About;
