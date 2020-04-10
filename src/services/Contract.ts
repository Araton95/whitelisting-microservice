import {ServiceLocator} from './ServiceLocator';

export class Contract {
  public web3: any;
  private abiArray: object;

  constructor() {
    this.abiArray = JSON.parse(
      '[{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addWhitelisted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"setKycInvestor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"setAdvertiser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"removeKycInvestor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"beneficiary","type":"address"}],"name":"isKycBeneficiary","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"beneficiary","type":"address"}],"name":"isAdvertiserBeneficiary","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"removeAdvertiser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
    );
  }

  contract() {
    const web3 = ServiceLocator.getWeb3Util().web3;
    return new web3.eth.Contract(
      this.abiArray,
      '0x25419d00bf3d0f97cd1c268882519a15cbf0074b',
    );
  }
}
