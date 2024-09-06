'use client'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
export default function Component() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between bg-gray-100 px-6 py-4 dark:bg-gray-800">
        <Link to="#" className="flex items-center gap-2 font-semibold">
          <Package2Icon />
          <span>Kisan Mitra</span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link to="#" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline">
            Shop
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <div className="mt-4 space-y-4">
            <div className="flex flex-row md:flex-row items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950">
              <img
                src="/placeholder.svg"
                width={80}
                height={80}
                alt="Onions"
                className="rounded-md"
                style={{ aspectRatio: '80/80', objectFit: 'cover' }}
              />
              <div className="flex flex-1 flex-col md:flex-row items-center justify-between w-full">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Onions</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Fresh, Local
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <MinusIcon />
                  </Button>
                  <span>1 kg</span>
                  <Button variant="outline" size="icon">
                    <PlusIcon />
                  </Button>
                </div>
                <div className="text-right font-medium">Rs. 40.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>Rs. 40.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxes</span>
                <span>Rs. 3.20</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>Rs. 43.20</span>
              </div>
              <Button
                onClick={() => {
                  navigate('/my-orders')
                }}
                className="w-full mt-4"
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader>
              <CardTitle>Shipping &amp; Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="123 Main St, Anytown USA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="apple-pay">Apple Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Place Order</Button>
            </CardFooter>
          </Card> */}
        </div>
      </main>

      <footer className="bg-gray-100 py-6 dark:bg-gray-800 mt-auto">
        <div className="container mx-auto flex items-center justify-between px-4">
          <nav className="flex space-x-4">
            <Link to="#" className="text-sm hover:underline">
              Privacy
            </Link>
            <Link to="#" className="text-sm hover:underline">
              Terms
            </Link>
            <Link to="#" className="text-sm hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function Package2Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
