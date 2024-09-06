import axios from 'axios'
export const fetchProductDetails = async (params: { slug: string }) => {
  try {
    const response = await axios.get(`/api/products/${params.slug}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch product details')
  }
}
