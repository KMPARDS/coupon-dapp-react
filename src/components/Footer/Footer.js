import React, { Component } from 'react';

export default class extends Component {
  render = () => (
    <>
    <footer className="footer_area">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <aside className="f_widget ab_widget">
                  <img src="img/Coupondapp-logo-blue.png" width="180" alt="" />
                  <p>Coupon Dapp is an initiative of Team Era Swap – So, the community can simply share Era Swap in a few simple steps, quickly and efficiently... </p>

                </aside>
              </div>
              <div className="col-lg-5 col-sm-6">
                <aside className="f_widget link_widget">
                  <div className="f_title">
                <h3>Useful Links</h3>
                    <span></span>
                  </div>
                  <ul className="nav flex-column">
                <li><a className="" href="#works" >How it Works </a></li>
                <li><a className="" href="#aboutus" >About</a></li>
                <li><a className="" href="#gifts">Gift ES Tokens</a></li>

                  </ul>
                  <ul className="nav flex-column">
                    <li><a href="terms-and-conditions.pdf" target="_blank" >Terms & Conditions</a></li>
                    <li><a href="privacy_policy.pdf" target="_blank" >Privacy Policy</a></li>
                  </ul>
                </aside>
              </div>
              <div className="col-lg-4 col-sm-6">
                <aside className="f_widget news_widget">
                  <div className="f_title">
                    <h3>Social Links</h3>
                    <span></span>
                  </div>

                  <ul className="nav">

                    <li><a target="_blank" href="https://www.facebook.com/eraswap"><i className="fa fa-facebook-square"></i></a></li>
                <li><a target="_blank" href="https://www.linkedin.com/company/eraswap/"><i className="fa fa-linkedin"></i></a></li>
                <li><a target="_blank" href="https://www.instagram.com/eraswap/?hl=en"><i className="fa fa-instagram"></i></a></li>
                <li><a target="_blank" href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber"><i className="fa fa-youtube"></i></a></li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <div className="justify-content-between d-flex">
              <div className="left">
                <p>© Copyright   <script>document.write(new Date().getFullYear());</script> . All right reserved.</p>
              </div>
              <div className="right">
                <p>Created by <a href="#">Eraswap</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="search_area zoom-anim-dialog mfp-hide" id="test-search">
          <div className="search_box_inner">
              <h3>Search</h3>
              <div className="input-group">
                  <input type="text" className="form-control" placeholder="Enter search keywords" />
                  <span className="input-group-btn">
                      <button className="btn btn-default" type="button"><i className="icon icon-Search"></i></button>
                  </span>
              </div>
          </div>
      </div>
    </>
  );
}
