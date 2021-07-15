import { atom } from 'recoil';

export interface Customer {
  _id: number,
  index: number,
  guid: string,
  isActive: boolean,
  balance: string,
  picture: string,
  age: number,
  name: string,
  gender: string,
  company: string,
  email: string,
  phone: string,
  address: string,
  about: string,
  registered: string
}

const customersState = atom({
  key: 'customers',
  default: [] as Customer[],
});

export default customersState;
