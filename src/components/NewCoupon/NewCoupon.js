import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

const ethers = require('ethers');
const assert = require('assert');

export default class extends Component {
  state = {
    userBalance: null,
    esAmount: '',
    inputError: '',
  };

  intervalId = null;

  componentDidMount = () => {
    const updateBalance = async () => {
      if (window.wallet) {
        const balance = await window.esInstance.functions.balanceOf(
          window.wallet.address
        );

        if (!balance.eq(this.state.userBalance || 0)) {
          this.setState({ userBalance: balance });
        }
      }
    };

    updateBalance();

    this.intervalId = setInterval(updateBalance, 14000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  render = () => (
    <div className="welcome-area v2 wow fadeInUp" id="home">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 align-self-center">
            <div className="welcome-right">
              <div className="welcome-text">
                <h1>Create Era Swap Coupon</h1>
                <p>
                  Send Crypto via Email, WhatsApp, SMS or even through a
                  traditional letter!
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 offset-1 align-self-center">
            <div className="v2 welcome-progress create-coupon-form-1">
              <InputGroup
                className={this.state.inputError ? 'red-border' : null}
              >
                <FormControl
                  placeholder="Enter coupon amount"
                  className={['large'].filter((c) => !!c).join(' ')}
                  value={this.state.esAmount}
                  onChange={(event) => {
                    const newState = {};
                    newState.inputError = '';
                    try {
                      try {
                        ethers.utils.parseEther(event.target.value || '0');
                      } catch (error) {
                        throw new Error(
                          'Invalid amount: ' + event.target.value
                        );
                      }

                      newState.esAmount = event.target.value;

                      assert.ok(
                        !!this.state.userBalance,
                        'Wallet not loaded. Please load you wallet by clicking connect wallet in Navbar'
                      );

                      assert.ok(
                        this.state.userBalance.gte(
                          ethers.utils.parseEther(event.target.value || '0')
                        ),
                        `Insufficient Balance${
                          this.state.userBalance
                            ? ` (${window.lessDecimals(
                                this.state.userBalance
                              )} ES)`
                            : ''
                        }`
                      );
                    } catch (error) {
                      newState.inputError = error.message;
                    }

                    this.setState(newState);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    className="large"
                    variant="outline-secondary"
                    disabled
                  >
                    ES
                  </Button>
                </InputGroup.Append>
              </InputGroup>

              {this.state.inputError ? (
                <Alert variant="danger" style={{ marginTop: '1rem' }}>
                  {this.state.inputError}
                </Alert>
              ) : null}

              <Button
                disabled={!!this.state.inputError || !this.state.esAmount}
                className="create-coupon-button"
                block={true}
              >
                Create Coupon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
