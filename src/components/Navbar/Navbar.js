import React, { Component } from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import NavbarElement from './NavbarElement';

export default class extends Component {
  render = () => (
    <header className="header_area menu_two header_style">
      <div className="header_menu">
        <Navbar bg="dark" expand="lg" className="container">
			    <a className="navbar-brand" href="index.html">
					  <img className="main_logo" src="img/Coupondapp-logo.png" alt="" width="180" />
					  <img className="mobile_logo" src="img/Coupondapp-logo-blue.png" width="230"  alt="" />
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
					  <ul className="nav navbar-nav ml-auto">
  						<NavbarElement name="Home" path="/" parentProps={this.props} />
  						<NavbarElement name="New Coupon" path="/new" parentProps={this.props} />
  						<NavbarElement name="Redeem Coupon" path="/redeem" parentProps={this.props} />
  						<li className="navbar-element">
                <Dropdown alignRight>
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    Dropdown Button
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="login-dropdown-color">
                    <Dropdown.Item href="#/action-1">Using Era Swap Life</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Metamask</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

  						</li>
  					</ul>
  				</Navbar.Collapse>
  			</Navbar>
      </div>
    </header>
  );
}
