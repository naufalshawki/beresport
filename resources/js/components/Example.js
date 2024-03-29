import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="row my-4">
                            <div className="col-12">
                                <h2 className="noo-sh-title">Meet Our Team</h2>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="hover-team">
                                    <div className="our-team"> <img src="images/img-1.jpg" alt="" />
                                        <div className="team-content">
                                            <h3 className="title">Williamson</h3> <span className="post">Web Developer</span> </div>
                                        <ul className="social">
                                            <li>
                                                <a href="#" className="fab fa-facebook"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-twitter"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-google-plus"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-youtube"></a>
                                            </li>
                                        </ul>
                                        <div className="icon"> <i className="fa fa-plus" aria-hidden="true"></i> </div>
                                    </div>
                                    <div className="team-description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna diam, maximus ut ullamcorper quis, placerat id eros. Duis semper justo sed condimentum rutrum. Nunc tristique purus turpis. Maecenas vulputate. </p>
                                    </div>
                                    <hr className="my-0" /> </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="hover-team">
                                    <div className="our-team"> <img src="images/img-2.jpg" alt="" />
                                        <div className="team-content">
                                            <h3 className="title">Kristiana</h3> <span className="post">Web Developer</span> </div>
                                        <ul className="social">
                                            <li>
                                                <a href="#" className="fab fa-facebook"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-twitter"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-google-plus"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-youtube"></a>
                                            </li>
                                        </ul>
                                        <div className="icon"> <i className="fa fa-plus" aria-hidden="true"></i> </div>
                                    </div>
                                    <div className="team-description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna diam, maximus ut ullamcorper quis, placerat id eros. Duis semper justo sed condimentum rutrum. Nunc tristique purus turpis. Maecenas vulputate. </p>
                                    </div>
                                    <hr className="my-0" /> </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="hover-team">
                                    <div className="our-team"> <img src="images/img-3.jpg" alt="" />
                                        <div className="team-content">
                                            <h3 className="title">Steve Thomas</h3> <span className="post">Web Developer</span> </div>
                                        <ul className="social">
                                            <li>
                                                <a href="#" className="fab fa-facebook"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-twitter"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-google-plus"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-youtube"></a>
                                            </li>
                                        </ul>
                                        <div className="icon"> <i className="fa fa-plus" aria-hidden="true"></i> </div>
                                    </div>
                                    <div className="team-description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna diam, maximus ut ullamcorper quis, placerat id eros. Duis semper justo sed condimentum rutrum. Nunc tristique purus turpis. Maecenas vulputate. </p>
                                    </div>
                                    <hr className="my-0" /> </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="hover-team">
                                    <div className="our-team"> <img src="images/img-1.jpg" alt="" />
                                        <div className="team-content">
                                            <h3 className="title">Williamson</h3> <span className="post">Web Developer</span> </div>
                                        <ul className="social">
                                            <li>
                                                <a href="#" className="fab fa-facebook"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-twitter"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-google-plus"></a>
                                            </li>
                                            <li>
                                                <a href="#" className="fab fa-youtube"></a>
                                            </li>
                                        </ul>
                                        <div className="icon"> <i className="fa fa-plus" aria-hidden="true"></i> </div>
                                    </div>
                                    <div className="team-description">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna diam, maximus ut ullamcorper quis, placerat id eros. Duis semper justo sed condimentum rutrum. Nunc tristique purus turpis. Maecenas vulputate. </p>
                                    </div>
                                    <hr className="my-0" /> </div>
                            </div>
                        </div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
