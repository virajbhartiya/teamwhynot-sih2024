import { postRequest } from "@/utility/generalServices"

interface AddToCartParams {
  productId: string
  quantity: number
}

export const addToCart = async (params: AddToCartParams) => {
  try {
    console.log(params)
    const response = await postRequest('/cart/add', {
      ...params
    })

    console.log(response)

    if (!response.ok) {
      throw new Error('Failed to add item to cart')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to add item to cart')
  }
}