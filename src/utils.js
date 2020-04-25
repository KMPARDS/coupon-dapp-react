const ethers = require('ethers');
const assert = require('assert');

export const lessDecimals = (ethersBigNumber, decimals = 2) => {
  let lessDecimals = ethers.utils.formatEther(ethersBigNumber).split('.');
  if (lessDecimals[1].length >= decimals) {
    lessDecimals[1] = lessDecimals[1].slice(0, decimals);
  }
  return lessDecimals.join('.');
};

const bs58 = require('bs58');
export const generateCouponFileJson = (bytes) => {
  return JSON.stringify({
    version: 1,
    data: bs58.encode(bytes),
    keccak256: ethers.utils.keccak256(bytes),
  });
};

export const decodeCoupon = (input) => {
  let keccak256, couponCode;
  if (typeof input === 'object') {
    assert.ok(
      'version' in input,
      'Invalid coupon: doesnot contain coupon version'
    );
    switch (input.version) {
      case 1:
        assert.ok(
          'data' in input,
          'Invalid coupon: doesnot contain data field.'
        );
        couponCode = input.data;
        if ('keccak256' in couponCode) {
          keccak256 = input.keccak256;
        } else {
          keccak256 = ethers.utils.keccak256(bs58.decode(couponCode));
        }
      default:
        throw new Error('Invalid coupon: contains unsupported coupon version.');
    }
  } else if (typeof input === 'string') {
    couponCode = input;
    keccak256 = ethers.utils.keccak256(bs58.decode(couponCode));
  }
  return { keccak256, couponCode };
};
