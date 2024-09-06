import { getRequest } from '@/utility/generalServices'

export const getAllProducts = async () => {
  try {
    const response = await getRequest('/products/')
    if (response.status !== 200) {
      throw new Error('Failed to fetch products')
    }
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}