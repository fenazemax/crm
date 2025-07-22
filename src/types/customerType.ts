import type { IDeal } from './dealsType'

export interface ICustomer {
  cid: number
  avatar: string
  name: string
  secondname: string
  email: string
  phone: string
  address: {
    city: string
    street: string
    state: string
    zipCode: number
  }
  deals: IDeal[]
}
