# CouponÐApp

Blockchain based simple redeemable coupons

## JavaScript Integraton documentation

### Content of .coupondapp file JSON

When you load a coupon file, you will get the following object encoded as JSON.

```typescript
interface CouponFile {
  version: number; // version of coupon
  data: string; // base58 encoded data
  keccak256: string; // 32 bytes hex string
}
```

Useful links: [Code reference](https://github.com/KMPARDS/coupon-dapp-react/blob/a08633ec00d497dcef8cf57b9475befc21b5abf3/src/utils.js#L13-L19),
[bs58](https://www.npmjs.com/package/bs58), [Ethers.js docs](https://docs.ethers.io/ethers.js/html/api-utils.html#hash-functions)

### Coupon Object

Once you load the coupon file, you have to decode it into a coupon object for further working with the coupon.

```typescript
interface CouponObject {
  keccak256: string; // 32 bytes hex string
  couponBytes: string; // 64 bytes hex string
}
```

Useful links: [Code reference](https://github.com/KMPARDS/coupon-dapp-react/blob/a08633ec00d497dcef8cf57b9475befc21b5abf3/src/utils.js#L21-L53)

### Contract Instances

Once you load the coupon, you will need to work with contract instances to check status of the coupon.

```javascript
const esInstance = new ethers.Contract(
  esContract.address, // kovan testnet: 0x53e750ee41c562c171d65bcb51405b16a56cf676
  esContract.abi, // import from config
  wallet
);

const couponDappInstance = new ethers.Contract(
  couponDappContract.address, // kovan testnet: 0x255faf8e0e6c51558396215beb0e00ab8f12c982
  couponDappContract.abi,
  wallet
);
```

Useful links: [Ethers.js docs](https://docs.ethers.io/ethers.js/html/api-contract.html#connecting-to-existing-contracts), [Code Reference](https://github.com/KMPARDS/coupon-dapp-react/blob/master/src/index.js#L13-L23)

### Contract Config

You need to json files available [here](https://github.com/KMPARDS/coupon-dapp-react/tree/master/src/ethereum). You have to import these json files to get `abi` and use this `abi` while creating a contract instance.

Useful links: [Code reference](https://github.com/KMPARDS/coupon-dapp-react/blob/master/src/config.js#L13-L30)

### ES Contract methods:

#### `approve` method

This method is used when redeeming a new coupon.

```typescript
couponDappInstance.functions.approve(
  spenderAddress: string, /* 20 bytes hex string */
  amount: BigNumber // use parseEther to convert from input
) => Promise<TransactionObject>
```

Useful links: [parseEther](https://docs.ethers.io/ethers.js/html/api-utils.html#ether-strings-and-wei)

### CouponDApp Contract methods:

#### `coupons` method

This method is used to check for a coupon if it is available, redeemed or not yet created.

```typescript
couponDappInstance.functions.coupons(
  couponHash: string /* 32 byte hex string */
) => Promise<{
  amount: BigNumber; // decode using lessDecimals
  status: BigNumber; // .toNumber()
}>;
```

Convert the status into number and check it's value for below:

```
Status:
0: NOT_CREATED
1: ACTIVE
2: REDEEMED
```

Useful links: [lessDecimals reference](https://github.com/KMPARDS/coupon-dapp-react/blob/a08633ec00d497dcef8cf57b9475befc21b5abf3/src/utils.js#L4-L10)

#### `newCoupon` method

This method is used to create a new coupon. When before approve method with esInstance needs to be called.

```typescript
couponDappInstance.functions.newCoupon(
  couponHash: string /* 32 bytes hex string */,
  amount: BigNumber // use parseEther to convert from input
) => Promise<TransactionObject>
```

The resolved transaction object contains `hash` property that you can show in the UI.

Useful links: [parseEther](https://docs.ethers.io/ethers.js/html/api-utils.html#ether-strings-and-wei)

#### `redeemCoupon` method

This method is used when redeeming a new coupon.

```typescript
couponDappInstance.functions.redeemCoupon(
  couponBytes: string /* 64 bytes hex string */
) => Promise<TransactionObject>
```
