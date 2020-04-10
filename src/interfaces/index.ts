export enum Actions {
  WHITELIST,
  KYC,
  ADVERTISER,
}

export interface IRequest {
  address: string;
}

export interface IValidation {
  address: string;
  type: Actions;
}
