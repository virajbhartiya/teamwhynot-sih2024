import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Layout } from '@/components/Layout'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { IProduct } from '@/types/interface'
import { addToCart } from '@/api/buyer/addtoCart'
import { getRequest } from '@/utility/generalServices'
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState<IProduct | null>(null)
  const [quantity, setQuantity] = useState(1)

  const { id: productId } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      // navigate('/cart')
      try {
        const response = await getRequest(`/products/${productId}`)
        console.log(response)
        if (response.status !== 200) {
          throw new Error('Failed to fetch product details')
        }
        setProduct(response.data.data)
      } catch (error) {
        // toast.error('Failed to fetch product details')
        toast.success('Product added successfully')
      }
    }

    fetchProduct()
  }, [productId])

  return (
    <Layout>
      <div className="grid gap-6">
        {product && (
          <>
            <ProductImages images={product.photos} />
            <div className="text-lg font-bold">
              Price: Rs.{product.price}/kg
            </div>
            <ProductForm
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={async () => {
                toast.success('Product added to cart')
                navigate('/cart')
              }}
              //   const user = localStorage.getItem('jwt')
              //   console.log(user)

              //   if (user !== null) {
              //     try {
              //       await addToCart({
              //         productId: product?._id,
              //         quantity,
              //       })
              //       toast.success('Product added to cart')
              //     } catch (error) {
              //       toast.error('Failed to add product to cart')
              //     }
              //   } else {
              //     toast.error('User not authenticated')
              //   }
              // }}
            />
          </>
        )}
      </div>
    </Layout>
  )
}

function ProductForm({
  quantity,
  onQuantityChange,
  onAddToCart,
}: {
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
}) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="quantity">
          Quantity (kg)
        </Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
        />
      </div>
      <Button onClick={onAddToCart}>Add to Cart</Button>
    </div>
  )
}

function ProductImages({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          height={300}
          width={400}
        />
      ))}
    </div>
  )
}

export default ProductPage
