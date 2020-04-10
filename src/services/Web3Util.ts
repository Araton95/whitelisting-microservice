const Web3 = require('web3');
const web3 = new Web3(
  'https://ropsten.infura.io/v3/4f28512692834d4e8f7ed45500dfa839',
);

export class Web3Util {
  public web3: any;

  constructor() {
    this.web3 = web3;
  }
}
