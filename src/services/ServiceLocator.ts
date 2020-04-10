import {Web3Util} from './Web3Util';

export class ServiceLocator {
  private static web3: Web3Util;

  public static getWeb3Util(): Web3Util {
    ServiceLocator.web3 = new Web3Util();
    return ServiceLocator.web3;
  }
}
