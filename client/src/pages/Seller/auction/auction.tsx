import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { getRequest } from '@/utility/generalServices'
import { IProduct } from '@/types/interface'
import { toast } from 'sonner'

export const Auction = () => {
  const [auctionItems, setAuctionItems] = useState<IProduct[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAuctionItems()
  }, [])

  const fetchAuctionItems = async () => {
    setIsLoading(true)
    try {
      const response = await getRequest('/products')
      const sortedItems = response.data.data.sort(
        (a: IProduct, b: IProduct) => {
          return (
            new Date(a.dateProduced).getTime() -
            new Date(b.dateProduced).getTime()
          )
        }
      )
      setAuctionItems(sortedItems)
    } catch (error) {
      console.error('Error fetching auction items:', error)
      toast.error('Failed to fetch auction items')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBid = async (id: string) => {
    try {
      // Uncomment and adjust the API call when the endpoint is ready
      // await axios.post(`/api/products/${id}/bid`)
      // toast.success('Bid placed successfully')
      // Refresh the auction items to get the updated bid
      await fetchAuctionItems()
    } catch (error) {
      console.error('Error placing bid:', error)
      toast.error('Failed to place bid')
    }
  }

  const filteredItems = auctionItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getItemStatus = (item: IProduct) => {
    const now = new Date().getTime()
    const expiryTime = new Date(item.expiryDate).getTime()
    if (now > expiryTime) {
      return 'Expired'
    } else if (expiryTime - now < 24 * 60 * 60 * 1000) {
      return 'Ending Soon'
    }
    return 'Active'
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <a href="/seller-dashboard">
          <button
            type="button"
            className="text-white bg-white-800 hover:bg-white-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >{`Back`}</button>
        </a>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">
            Farmers' Vegetable Auction
          </h1>
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vegetables..."
              className="pl-10 w-full max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <img
              src="/icons/loading-loading-forever.gif"
              className="h-[80px] w-auto"
            />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.reverse().map((item) => (
              <Card key={item._id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{item.name}</CardTitle>
                    <Badge
                      variant={
                        getItemStatus(item) === 'Expired'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {getItemStatus(item)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <img
                    src={item.photos[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      Current Bid: Rs. {item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(item.expiryDate).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleBid(item._id)}
                    className="w-full"
                    disabled={getItemStatus(item) === 'Expired'}
                  >
                    Place Bid Rs. {(item.price + 50).toFixed(2)}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>No auction items found.</p>
        )}
      </main>
    </div>
  )
}
