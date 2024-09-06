export interface IErrorResponse {
  message: string
  status: number
}

export interface IUser {
  _id?: string
  firstName: string
  lastName: string
  role?: string
  emailId: string
  password: string
  confirmPassword: string
  location: string
  phone: string
}

export interface IProduct {
  _id: string
  name: string
  price: number
  quantity: number
  photos: string[]
  expiryDate: string
  dateProduced: string
  description: string
  category: string
}
