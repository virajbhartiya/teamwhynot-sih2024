/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Package, Plus, Video, Users } from 'lucide-react'
import { getRequest } from '@/utility/generalServices'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@/types/interface'
import { format } from 'date-fns'

interface SellerStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalDeliveries: number
}

export function SellerDashboard() {
  const [stats, setStats] = useState<SellerStats | null>(null)
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await getRequest('/users/seller/stats')
        setStats(statsResponse.data.data)

        const productsResponse = await getRequest('/products/seller')
        console.log(productsResponse.data)

        setProducts(
          Array.isArray(productsResponse.data.data)
            ? productsResponse.data.data
            : []
        )
      } catch (error) {
        console.error('Error fetching seller data:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getWeather = async () => {
    const resuser = await getRequest('/users/me')
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${resuser.location}&apikey=lPaOI03puw3vFX7ZRgwezMeZ9aPb3dZ5`
    )
    setWeatherData(response)
    console.log(response)
  }

  getWeather()

  const handleAddProduct = () => {
    navigate('/add-product')
    console.log('Add product clicked')
  }

  const handleAIClick = () => {
    navigate('/ai-chat')
    console.log('AI button clicked')
  }

  const handleAuctionClick = () => {
    navigate('/auction')
    console.log('Auction button clicked')
  }

  const handleWorkshopsClick = () => {
    navigate('/workshops')
    console.log('Workshops button clicked')
  }

  const handleKisanConnectClick = () => {
    navigate('/kisan-connect')
    console.log('Kisan Connect button clicked')
  }

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24)
    )

    if (daysUntilExpiry < 0) return 'Expired'
    if (daysUntilExpiry <= 7) return 'Expiring Soon'
    return 'Valid'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="/icons/loading-loading-forever.gif"
          className="h-[80px] w-auto"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, Seller</h1>
          <p className="text-sm text-gray-600">Here's your farm at a glance</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleAddProduct}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Button>
          <Button
            onClick={handleWorkshopsClick}
            className="flex items-center gap-2"
          >
            <Video className="h-4 w-4" /> Workshops
          </Button>
          <Button
            onClick={handleKisanConnectClick}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" /> Kisan Connect
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalRevenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
      </div>

      <CardContent>
        {/* blue background div rounded edges */}
        <div className="bg-blue-100 rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Weather Forecast
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium">Cloudy</p>
                <p className="text-xs text-muted-foreground">24°C</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Today</p>
              <p className="text-xs text-muted-foreground">12:00 PM</p>
            </div>
          </div>
        </div>
      </CardContent>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center">
                    {product.photos.length > 0 && (
                      <img
                        src={product.photos[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md mr-4"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-medium leading-none">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Stock: {product.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Expiry:{' '}
                        {format(new Date(product.expiryDate), 'dd/MM/yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      variant="secondary"
                      className="mr-2 whitespace-nowrap"
                    >
                      Rs. {product.price}
                    </Badge>
                    <Badge
                      variant={
                        getExpiryStatus(product.expiryDate) === 'Expired'
                          ? 'destructive'
                          : getExpiryStatus(product.expiryDate) ===
                            'Expiring Soon'
                          ? 'secondary'
                          : 'default'
                      }
                      className="mr-2"
                    >
                      {getExpiryStatus(product.expiryDate)}
                    </Badge>
                    {/* <ChevronRight className="h-4 w-4 text-muted-foreground" /> */}
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Button
        onClick={handleAIClick}
        className="fixed bottom-4 right-4 flex items-center gap-2 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        AI
      </Button>

      <Button
        onClick={handleAuctionClick}
        className="fixed bottom-4 left-4 flex items-center gap-2 bg-green-500 text-white p-3 rounded-full shadow-lg"
      >
        Auction
      </Button>
    </div>
  )
}
