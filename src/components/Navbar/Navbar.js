import React, { Component } from 'react';

export default class extends Component {
  render = () => (
    <header className="header_area menu_two header_style">
      <div className="header_menu">
		    <nav className="navbar navbar-expand-lg navbar-light bg-light">
			    <a className="navbar-brand" href="index.html">
					  <img className="main_logo" src="img/Coupondapp-logo.png" alt="" width="180" />
					  <img className="mobile_logo" src="img/Coupondapp-logo-blue.png" width="230"  alt="" />
          </a>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					 <span></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
					  <ul className="nav navbar-nav ml-auto">
  						<li className="active">
  							<a className="" href="#works" >How it Works </a>
  						</li>
  						<li className="">
  							<a className="" href="#aboutus" >About</a>
  						</li>
  						<li className="">
  							<a className="" href="#gifts">Gift ES Tokens</a>
  						</li>
  						<li className="">
  							<a className="" href="#" >Login</a>
  						</li>
  					</ul>
  					<ul className="nav navbar-nav navbar-right">
  						<li>
                <a className="popup-with-zoom-anim" href="#test-search"><i className="icon icon-Search"></i></a>
              </li>
  					</ul>
  				</div>
  			</nav>
      </div>
    </header>
  );
}
