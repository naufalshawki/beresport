import React, {Component} from 'react';
import { Router, Route, withRouter } from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';


class Footer extends Component{
  render(){

  return(
    <div>
    <div className="instagram-box">
        <div className="main-instagram owl-carousel owl-theme">
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-01.jpg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-02.jpg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-03.jpg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-04.jpg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-05.jpg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-06.jpeg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-07.jpg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-08.png" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ins-inner-box">
                    <img src="images/instagram-img-05.jpg" alt="" />
                    <div className="hov-in">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <footer>
            <div className="footer-main">
                <div className="container">
    				<div className="row">
    					<div className="col-lg-4 col-md-12 col-sm-12">
    						<div className="footer-top-box">
    							<h3>Business Time</h3>
    							<ul className="list-time">
    								<li>Monday - Friday: 08.00am to 05.00pm</li> <li>Saturday: 10.00am to 08.00pm</li> <li>Sunday: <span>Closed</span></li>
    							</ul>
    						</div>
    					</div>

    					<div className="col-lg-4 col-md-12 col-sm-12">
    						<div className="footer-top-box">
    							<h3>Sosial Media</h3>
    							<p>Masuk Ke sosial media.</p>
    							<ul>
                                    <li><a><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                                    <li><a><i className="fab fa-google-plus" aria-hidden="true"></i></a></li>
                                    <li><a><i className="fa fa-rss" aria-hidden="true"></i></a></li>
                                    <li><a><i className="fab fa-pinterest-p" aria-hidden="true"></i></a></li>
                                    <li><a><i className="fab fa-whatsapp" aria-hidden="true"></i></a></li>
                                </ul>
    						</div>
    					</div>
    				</div>
    				<hr/>
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="footer-widget">
                                <h4>Tentang Beresport</h4>
                                <p>Portal E-sports Pertama Di Indonesia.</p>
    						          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="footer-link">
                                <h4>Informasi</h4>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="footer-link-contact">
                                <h4>Hubungi Kami</h4>
                                <ul>
                                    <li>
                                        <p><i className="fas fa-map-marker-alt"></i>Address: Cipinang Jaya <br/>Jakarta Timur,<br/> 13420 </p>
                                    </li>
                                    <li>
                                        <p><i className="fas fa-phone-square"></i>Phone: <a href="tel:+62-81246417218">+62-81246417218</a></p>
                                    </li>
                                    <li>
                                        <p><i className="fas fa-envelope"></i>Email: <a href="mailto:beresportscorps@gmail.com">beresportscorps@gmail.com</a></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div className="footer-copyright">
            <p className="footer-company">All Rights Reserved. &copy; 2020 </p>
        </div>
        <a href="#" id="back-to-top" title="Back to top">&uarr;</a>
        </div>

  )
  }
}
export default Footer;
