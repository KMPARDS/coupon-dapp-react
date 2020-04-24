import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export default class extends Component {
  state = {};

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
              <InputGroup>
                <FormControl
                  placeholder="Enter coupon amount"
                  className="large"
                  onChange={this.updateEsAmount}
                />
                <InputGroup.Append>
                  <Button
                    className="large"
                    variant="outline-secondary"
                    alignRight
                    disabled
                  >
                    ES
                  </Button>
                </InputGroup.Append>
              </InputGroup>

              <Button className="create-coupon-button" block={true}>
                Create Coupon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
