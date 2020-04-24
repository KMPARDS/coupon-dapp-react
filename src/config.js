const network = process.env.REACT_APP_NETWORK || 'kovan';

module.exports = {
  network,
  chainId: (() => {
    switch (network) {
      case 'homestead':
        return 1;
      case 'kovan':
        return 42;
    }
  })(),
  esContract: {
    address: (() => {
      switch (network) {
        case 'kovan':
          return '0x255faf8e0e6c51558396215beb0e00ab8f12c982';
      }
    })(),
    abi: require('./ethereum/ERC20_ERC20.json').abi,
  },
  couponDappContract: {
    address: (() => {
      switch (network) {
        case 'kovan':
          return '0x255faf8e0e6c51558396215beb0e00ab8f12c982';
      }
    })(),
    abi: require('./ethereum/CouponDApp_CouponDApp.json').abi,
  },
};
