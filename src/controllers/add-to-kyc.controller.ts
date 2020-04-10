import {HttpErrors, param, post} from '@loopback/rest';
import {signAndSendTransaction} from '../helpers/signAndSendTransaction';
import {Actions, IValidation} from '../interfaces';
import {Contract} from '../services/Contract';
import {addressValidation} from '../services/Validation';

export class AddToKycController {
  @post('/addToKyc/{address}')
  async addToKyc(@param.path.string('address') address: string): Promise<any> {
    try {
      const data: IValidation = {
        address: address,
        type: Actions['KYC'],
      };

      await addressValidation(data);

      const instance = new Contract().contract();
      const contractMethod = instance.methods['setKycInvestor'](address);

      const hash = await signAndSendTransaction(contractMethod);
      return {
        data: {
          hash: hash,
          name: 'Transaction successfully submitted',
          statusCode: 200,
        },
      };
    } catch (error) {
      throw new HttpErrors.BadRequest(error.toString());
    }
  }
}
