export enum EnumProgress {
  'in-progress' = 'In Progress',
  'done' = 'Done',
  'new' = 'New',
  'checking' = 'In check',
}

export type TComments = {
  id: number
  date: Date
  text: string
  image?: string
}

export interface IDeal {
  id: number
  customer: {
    cid: number
    name: string
    secondname: string
    email: string
    phone: string
  }
  image: string
  address: {
    city: string
    street: string
    state: string
    zipCode: number
  }
  area: number
  numOfPeople: number
  date: Date
  instructions?: string
  accessCode?: string
  price: number
  progress: EnumProgress
  comments?: TComments[]
}

export type TOptions = {
  label: string
  value: string
}
