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
              <div className="col-lg-6 col-sm-6">
                <aside className="f_widget link_widget">
                  <div className="f_title">
                    <h3>Useful Links</h3>
                    <span></span>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <ul className="nav flex-column">
                           <li><a className="" href="/" >Home </a></li>
                          <li><a className="" href="#works" >How it Works </a></li>
                          <li><a className="" href="#aboutus" >About Us</a></li>
                          <li><a className="" href="/new" >New Coupon</a></li>
                          <li><a className="" href="/redeem">Redeem Coupon</a></li>
                         </ul>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                          <ul className="nav flex-column">
                            <li><a href="http://eraswaptoken.io/pdf/era-swap-howey-test-letter-august7-2018.pdf"
                              target="_blank">Howey Test</a></li>
                            <li><a href="https://eraswaptoken.io/pdf/es-statuary-warning.pdf" target="_blank">Statuary Warning</a></li>
                            <li><a href="http://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank">ES White
                                Paper </a></li>
                                
                            <li><a href="https://eraswaptoken.io/pdf/eraswap-terms-conditions.pdf"
                              target="_blank">Era Swap Terms & Conditions</a></li>
                            <li><a href="pdf/coupon-terms-conditions.pdf" target="_blank">Terms & Conditions</a></li>
                            <li><a href="pdf/privacy_policy_coupondapp.pdf" target="_blank">Privacy Policy</a></li>
                           </ul>
                  </div>
                  </div>
                </aside>
              </div>
              <div className="col-lg-3 col-sm-6">
                <aside className="f_widget news_widget">
                  <div className="f_title">
                    <h3>Social Links</h3>
                    <span></span>
                  </div>

                  <ul className="nav">
                    <li><a href="https://www.facebook.com/eraswap" target="_blank"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/eraswap/" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="https://www.instagram.com/eraswap/?hl=en" target="_blank"><i class="fa fa-instagram"></i></a> </li>
                    <li><a href="https://twitter.com/EraSwapTech" target="_blank"><i class="fa fa-twitter"></i></a>
                    </li>
                    <li><a href="https://medium.com/@eraswap" target="_blank"><i class="fa fa-medium"></i></a>
                    </li>
                    <li><a href="https://eraswap.tumblr.com/" target="_blank"><i class="fa fa-tumblr"></i></a>
                    </li>
                    <li><a href="https://t.me/eraswap" target="_blank"><i class="fa fa-telegram"></i></a>
                    </li>
                    <li> <a href="https://github.com/KMPARDS" target="_blank"><i class="fa fa-github"></i></a>
                    </li>
                    <li><a href="https://www.reddit.com/user/EraSwap" target="_blank"><i class="fa fa-reddit"></i></a> </li>
                    <li><a href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber" target="_blank"><i class="fa fa-youtube"></i></a></li>
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
