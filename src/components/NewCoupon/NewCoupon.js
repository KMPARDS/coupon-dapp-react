import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

const ethers = require('ethers');
const assert = require('assert');

export default class extends Component {
  state = {
    currentScreen: 0,
    userBalance: null,
    esAmount: '',
    inputError: '',
    couponBytes: '',
    spinner0: false,
    spinner1: false,
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
              {(() => {
                switch (this.state.currentScreen) {
                  case 0:
                    return (
                      <>
                        <InputGroup
                          className={
                            this.state.inputError ? 'red-border' : null
                          }
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
                                  ethers.utils.parseEther(
                                    event.target.value || '0'
                                  );
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
                                    ethers.utils.parseEther(
                                      event.target.value || '0'
                                    )
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
                          disabled={
                            !!this.state.inputError ||
                            !this.state.esAmount ||
                            this.state.spinner0
                          }
                          className="create-coupon-button"
                          block={true}
                          onClick={() => {
                            this.setState({ spinner0: true });
                            const couponBytes = ethers.utils.randomBytes(64);
                            setTimeout(() => {
                              this.setState({
                                currentScreen: 1,
                                couponBytes,
                                spinner0: false,
                              });
                            }, 1000);
                          }}
                        >
                          {!this.state.spinner0 ? (
                            <>Create Coupon</>
                          ) : (
                            <>Generating coupon...</>
                          )}
                        </Button>
                      </>
                    );
                  case 1:
                    return (
                      <>
                        <h3>Step 2</h3>
                        Download the coupon by clicking below button. This
                        coupon will be activated once all the steps are
                        completed.
                        <Button
                          disabled={this.state.spinner1}
                          block={true}
                          className="create-coupon-button"
                          onClick={() => {
                            this.setState({ spinner1: true });
                            setTimeout(() => {
                              const element = document.createElement('a');
                              const file = new Blob(
                                [
                                  window.generateCouponFileJson(
                                    this.state.couponBytes
                                  ),
                                ],
                                {
                                  type: 'text/plain',
                                }
                              );
                              element.href = URL.createObjectURL(file);
                              element.download = `ES-${this.state.esAmount
                                .split('.')
                                .join('-')}-${ethers.utils
                                .keccak256(this.state.couponBytes)
                                .slice(2, 8)}.coupondapp`;
                              document.body.appendChild(element); // Required for this to work in FireFox
                              element.click();
                              this.setState({
                                spinner1: false,
                                currentScreen: 2,
                              });
                            }, 1000);
                          }}
                        >
                          {!this.state.spinner1 ? (
                            <>Download</>
                          ) : (
                            <>Generating file...</>
                          )}
                        </Button>
                      </>
                    );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
