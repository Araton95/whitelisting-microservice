import {Actions, IValidation} from '../interfaces';
import {Contract} from './Contract';
import {ServiceLocator} from './ServiceLocator';

const web3 = ServiceLocator.getWeb3Util().web3;

export const addressValidation = async (data: IValidation) => {
  try {
    const checksummedAddr = web3.utils.toChecksumAddress(data.address);

    if (!web3.utils.isAddress(checksummedAddr)) {
      throw 'INVALID ADDRESS';
    }

    const instance = new Contract().contract();

    let result: boolean;
    switch (data.type) {
      case Actions['WHITELIST']:
        result = await instance.methods.isWhitelisted(data.address).call();
        break;
      case Actions['KYC']:
        result = await instance.methods.isKycBeneficiary(data.address).call();
        break;
      case Actions['ADVERTISER']:
        result = await instance.methods
          .isAdvertiserBeneficiary(data.address)
          .call();
        break;
    }

    if (result) {
      throw 'USER ALREADY HAS THAT ROLE';
    }
  } catch (error) {
    throw error;
  }
};
