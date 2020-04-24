import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import TransactionModal from '../TransactionModal/TransactionModal';

const ethers = require('ethers');
const assert = require('assert');
const { network } = require('../../config');

export default class extends Component {
  state = {
    currentScreen: 0,
    userBalance: null,
    userAllowance: null,
    esAmount: '',
    inputError: '',
    couponBytes: new Uint8Array(),
    spinner0: false,
    spinner1: false,
    showApproveTransactionModal: false,
    approveTxHash: null,
    showNewCouponTransactionModal: false,
    newCouponTxHash: null,
  };

  intervalId = null;

  componentDidMount = () => {
    const updateBalance = async () => {
      if (window.wallet) {
        const balance = await window.esInstance.functions.balanceOf(
          window.wallet.address
        );
        const allowance = await window.esInstance.functions.allowance(
          window.wallet.address,
          window.couponDappInstance.address
        );

        if (
          !balance.eq(this.state.userBalance || 0) ||
          !allowance.eq(this.state.userAllowance || 0)
        ) {
          this.setState({ userBalance: balance, userAllowance: allowance });
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
                  case 2:
                    return (
                      <>
                        <h3>Step 3</h3>

                        {!this.state.approveTxHash ? (
                          <>
                            <p>
                              You have to make an allowance transaction of{' '}
                              {this.state.esAmount} ES to create your coupon.
                            </p>
                            {this.state.userAllowance &&
                            this.state.userAllowance.gte(
                              ethers.utils.parseEther(this.state.esAmount)
                            ) ? (
                              <>
                                <Alert variant="info">
                                  This ÐApp just noticed that you have enough
                                  allowance to activate your new coupon.
                                </Alert>
                                <Button
                                  block={true}
                                  onClick={() =>
                                    this.setState({ currentScreen: 3 })
                                  }
                                >
                                  Proceed to Step 4
                                </Button>
                              </>
                            ) : (
                              <>
                                <Alert variant="warning">
                                  Please note that, no funds (ES) will be
                                  transferred in this transaction since this is
                                  only an approve transaction. After this
                                  transaction there is one more transaction in
                                  which you transfer tokens which activates the
                                  coupon.
                                </Alert>
                                Press the below button to make the approve
                                transaction.
                                <Button
                                  disabled={
                                    this.state.showApproveTransactionModal
                                  }
                                  block={true}
                                  onClick={() =>
                                    this.setState({
                                      showApproveTransactionModal: true,
                                    })
                                  }
                                >
                                  {!this.state.showApproveTransactionModal ? (
                                    <>Approve</>
                                  ) : (
                                    <>Approve in progress...</>
                                  )}
                                </Button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <p>
                              Your approve transaction is confirmed (
                              <a
                                href={`https://${
                                  network !== 'homestead' ? network + '.' : ''
                                }etherscan.io/tx/${this.state.approveTxHash}`}
                              >
                                EtherScan Link
                              </a>
                              ).
                            </p>
                            <Alert variant="warning">
                              Please note, coupon is not yet activated. Please
                              go to step 4 and activate coupon.
                            </Alert>
                            <Button
                              onClick={() =>
                                this.setState({ currentScreen: 3 })
                              }
                            >
                              Go to Step 4
                            </Button>
                          </>
                        )}
                      </>
                    );
                  case 3:
                    return (
                      <>
                        <h3>Step 4</h3>
                        {!this.state.newCouponTxHash ? (
                          <>
                            Please click the below button to activate your
                            coupon.
                            <Button
                              disabled={
                                this.state.showNewCouponTransactionModal
                              }
                              block={true}
                              onClick={() =>
                                this.setState({
                                  showNewCouponTransactionModal: true,
                                })
                              }
                            >
                              {!this.state.showNewCouponTransactionModal ? (
                                <>Activate New Coupon</>
                              ) : (
                                <>Transaction in progress...</>
                              )}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Alert variant="success">
                              Your coupon is activated! You can view your
                              transaction on{' '}
                              <a
                                href={`https://${
                                  network !== 'homestead' ? network + '.' : ''
                                }etherscan.io/tx/${this.state.newCouponTxHash}`}
                              >
                                EtherScan
                              </a>
                              .
                            </Alert>
                            Now you can share the coupon to your friend through
                            email or whatsapp.
                          </>
                        )}
                      </>
                    );
                }
              })()}
            </div>
          </div>
        </div>
      </div>

      <TransactionModal
        show={this.state.showApproveTransactionModal}
        hideFunction={() =>
          this.setState({ showApproveTransactionModal: false })
        }
        ethereum={{
          transactor: window.esInstance.functions.approve,
          estimator: window.esInstance.estimate.approve,
          contract: window.esInstance,
          contractName: 'Era Swap Contract',
          arguments: [
            window.couponDappInstance.address,
            ethers.utils.parseEther(this.state.esAmount || '0'),
          ],
          ESAmount: this.state.esAmount,
          headingName: 'Approve Transaction',
          functionName: 'approve',
          directGasScreen: true,
          continueFunction: (txHash) =>
            this.setState({
              showApproveTransactionModal: false,
              approveTxHash: txHash,
            }),
        }}
      />
      <TransactionModal
        show={this.state.showNewCouponTransactionModal}
        hideFunction={() =>
          this.setState({ showNewCouponTransactionModal: false })
        }
        ethereum={{
          transactor: window.couponDappInstance.functions.newCoupon,
          estimator: window.couponDappInstance.estimate.newCoupon,
          contract: window.couponDappInstance,
          contractName: 'Coupon ÐApp Contract',
          arguments: [
            ethers.utils.keccak256(this.state.couponBytes),
            ethers.utils.parseEther(this.state.esAmount || '0'),
          ],
          ESAmount: this.state.esAmount,
          headingName: 'New Coupon Transaction',
          functionName: 'newCoupon',
          directGasScreen: true,
          continueFunction: (txHash) =>
            this.setState({
              showNewCouponTransactionModal: false,
              newCouponTxHash: txHash,
            }),
        }}
      />
    </div>
  );
}
