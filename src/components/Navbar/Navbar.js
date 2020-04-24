import React, { Component } from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import NavbarElement from './NavbarElement';
import axios from 'axios';

const ethers = require('ethers');
const { chainId, network } = require('../../config');

export default class extends Component {
  state = {
    isWalletConnected: false,
    imgUrl: null,
    metamaskChainId: null,
  };

  intervalId = null;

  componentDidMount = () => {
    this.intervalId = setInterval(() => {
      let newState = {};
      /// @dev wallet checker
      const isWalletConnected = !!window.wallet && !!window.wallet.address;
      if (isWalletConnected !== this.state.isWalletConnected) {
        newState.isWalletConnected = isWalletConnected;
        this.updateWalletProfilePic(isWalletConnected && window.wallet);
      }

      if (window.ethereum) {
        /// @dev metamask chain id checker
        const metamaskChainId = +window.ethereum.chainId;
        if (newState.metamaskChainId !== this.state.metamaskChainId) {
          newState.metamaskChainId = metamaskChainId;
        }

        /// @dev wallet address change checker
        if (window.wallet && window.wallet.isMetamask) {
          const newAddress = window.ethereum.selectedAddress;

          if (newAddress !== window.wallet.address) {
            this.metamaskLogin();
          }
        }
      }

      this.setState(newState);
    }, 100);
  };

  updateWalletProfilePic = async (wallet) => {
    const address = wallet.address;
    if (!address) {
      return this.setState({ imgUrl: null });
    }
    const url =
      process.env.TIMESWAPPERS_SERVER_URL || 'https://apis.timeswappers.com';

    const formData = new FormData();
    formData.append('user', address.toLowerCase());

    const response = await axios.post(
      url + '/api/users/by-walletaddress',
      formData
    );

    const imgUrl = response.data.avatar
      ? url + '/' + response.data.avatar.slice(0)
      : '';

    this.setState({ imgUrl });
  };

  metamaskLogin = async () => {
    await window.ethereum.enable();

    const metamaskWeb3Provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    );
    window.wallet = metamaskWeb3Provider.getSigner();
    window.wallet.address = window.ethereum.selectedAddress;
    window.wallet.isMetamask = true;

    // window.wallet.address = window.ethereum.selectedAddress;
    this.updateWalletProfilePic(window.wallet);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  render = () => (
    <>
      <header className="header_area menu_two header_style">
        <div className="header_menu">
          <Navbar bg="dark" expand="lg" className="container">
            <a
              className="navbar-brand"
              onClick={() => this.props.history.push('/')}
            >
              <img
                className="main_logo"
                src="img/Coupondapp-logo.png"
                alt=""
                width="180"
              />
              <img
                className="mobile_logo"
                src="img/Coupondapp-logo-blue.png"
                width="230"
                alt=""
              />
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <ul className="nav navbar-nav ml-auto">
                <NavbarElement name="Home" path="/" parentProps={this.props} />
                <NavbarElement
                  name="New Coupon"
                  path="/new"
                  parentProps={this.props}
                />
                <NavbarElement
                  name="Redeem Coupon"
                  path="/redeem"
                  parentProps={this.props}
                />
                <li className="navbar-element">
                  <Dropdown alignRight>
                    <Dropdown.Toggle
                      variant="outline-light"
                      id="dropdown-basic"
                    >
                      {this.state.isWalletConnected ? (
                        <>
                          Welcome{' '}
                          <img
                            className="navbar-avatar"
                            src={this.state.imgUrl || '/img/empty-avatar.png'}
                          />{' '}
                          {(() => {
                            // display address
                            if (!window.wallet) return;
                            return (
                              window.wallet.address.slice(0, 4) +
                              '...' +
                              window.wallet.address.slice(38)
                            );
                          })()}
                        </>
                      ) : (
                        <>Connect Wallet</>
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="login-dropdown-color">
                      {!this.state.isWalletConnected ? (
                        <>
                          <Dropdown.Item
                            onClick={() => {
                              window.open(
                                'https://eraswap.life/',
                                '',
                                'width=1001,height=650'
                              );
                            }}
                          >
                            Using Era Swap Life
                          </Dropdown.Item>
                          <Dropdown.Item
                            className={
                              (
                                this.state.metamaskChainId !== null
                                  ? this.state.metamaskChainId !== chainId
                                  : true
                              )
                                ? 'disabled'
                                : null
                            }
                            disabled={
                              this.state.metamaskChainId !== null
                                ? this.state.metamaskChainId !== chainId
                                : true
                            }
                            onClick={this.metamaskLogin}
                          >
                            Metamask{' '}
                            {window.ethereum &&
                            +window.ethereum.chainId !== chainId ? (
                              <span style={{ color: 'red' }}>
                                (Change to {network})
                              </span>
                            ) : null}
                          </Dropdown.Item>
                        </>
                      ) : (
                        <>
                          <Dropdown.Item
                            onClick={() => {
                              window.wallet = null;
                            }}
                          >
                            Logout
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
      <div className="navbar-static-placeholder"></div>
    </>
  );
}
