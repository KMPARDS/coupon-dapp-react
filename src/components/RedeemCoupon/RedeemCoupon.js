import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import CouponCard from '../CouponCard/CouponCard';

export default class extends Component {
  state = {
    fileBeingDragged: false,
    fileError: '',
    coupon: process.env.REACT_APP_DEV_COUPON || null,
  };

  componentDidMount = () => {
    const dropArea = document.getElementById('redeem-file-drag');

    if (dropArea) {
      function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      function preventDefaultAnd(callback) {
        return (event) => {
          preventDefaults(event);
          callback(event);
        };
      }

      dropArea.addEventListener(
        'dragenter',
        preventDefaultAnd((event) => {
          this.setState({ fileBeingDragged: true, fileError: '' });
        }),
        false
      );

      dropArea.addEventListener('dragover', preventDefaults, false);

      dropArea.addEventListener(
        'dragleave',
        preventDefaultAnd((event) => {
          this.setState({ fileBeingDragged: false });
        }),
        false
      );

      dropArea.addEventListener(
        'drop',
        preventDefaultAnd((event) => {
          this.setState({ fileBeingDragged: false });
          let dt = event.dataTransfer;
          let files = dt.files;

          this.handleFileEvent({ target: { files } });
        }),
        false
      );
    }
  };

  handleFileEvent = (e) => {
    try {
      let reader = new FileReader();
      const filename = e.target.files[0].name;

      reader.onload = (event) => {
        this.handleFileContent(event.target.result, filename);
      };

      reader.readAsText(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  handleFileContent = (content, fileName) => {
    console.log({ content, fileName });
    const fileNameArr = fileName.split('.');
    const fileExtension = fileNameArr[fileNameArr.length - 1];
    if (fileExtension === 'coupondapp') {
      this.setState({ coupon: JSON.parse(content) });
    } else {
      this.setState({
        fileError: `File with extension ${fileExtension}, is not a valid coupon dapp coupon`,
      });
    }
  };

  render = () => (
    <>
      <div className="container">
        {(() => {
          if (!this.state.coupon) {
            return (
              <>
                <input
                  type="file"
                  id="coupon-hidden-input"
                  style={{ display: 'none' }}
                  accept=".coupondapp"
                  onChange={(e) => this.handleFileEvent(e)}
                />
                <div
                  id="redeem-file-drag"
                  onClick={() => {
                    document.getElementById('coupon-hidden-input').click();
                  }}
                >
                  {!this.state.fileBeingDragged ? (
                    <>
                      <u>Drag</u> your coupon in this box or <u>Click here</u>
                    </>
                  ) : (
                    <>Drop the file!</>
                  )}

                  {this.state.fileError ? (
                    <Alert variant="danger">{this.state.fileError}</Alert>
                  ) : null}
                </div>
              </>
            );
          } else {
            return (
              <>
                <h2>Your coupon is loaded!</h2>
                <CouponCard coupon={this.state.coupon} />
              </>
            );
          }
        })()}
      </div>
    </>
  );
}
