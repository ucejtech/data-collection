export interface IAccount {
  id: string;
  debtor: {
    title: string;
    firstName: string;
    lastName: string;
    address: {
      address: string;
      city: string;
      state: string;
      zip: number;
      country: string;
    };
    mobilePhone: string;
    email: string;
  };
}

export interface IClaim {
  id: string;
  accountId: string;
  currency: string;
  baseAmount: number;
  fees: number;
  dueDate: string;
  status: string;
  deletedAt?: string;
  paidAt?: string;
}


export interface ToastObject {
  success: Function;
  error: Function;
  info: Function;
  warning: Function;
}