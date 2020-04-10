require('dotenv').config();

import {ServiceLocator} from '../services/ServiceLocator';
const EthereumTx = require('ethereumjs-tx').Transaction;
const web3 = ServiceLocator.getWeb3Util().web3;

export async function signAndSendTransaction(method: any): Promise<string> {
  try {
    const nonce = await web3.eth.getTransactionCount(
      process.env.SERVER_WALLET,
      'pending',
    );
    const gasPrice = await web3.eth.getGasPrice();

    const encodedABI = method.encodeABI();
    const estimatedGas = await method.estimateGas({
      from: process.env.SERVER_WALLET,
      to: process.env.PUBLIC_SALE_CONTRACT,
    });

    const rawTransaction = {
      nonce: web3.utils.toHex(nonce),
      from: process.env.SERVER_WALLET,
      to: process.env.PUBLIC_SALE_CONTRACT,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(estimatedGas),
      value: '0x0',
      data: encodedABI,
    };

    const tx = new EthereumTx(rawTransaction, {
      chain: 'ropsten',
      hardfork: 'petersburg',
    });

    const pk: any = process.env.SERVER_WALLET_PK?.toString();
    const privateKey = Buffer.from(pk, 'hex');
    tx.sign(privateKey);

    const serializedTx = tx.serialize();

    return new Promise((resolve, reject) => {
      web3.eth
        .sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('transactionHash', (hash: string) => resolve(hash))
        .on('error', (error: any) => reject(error));
    });
  } catch (error) {
    throw error;
  }
}
