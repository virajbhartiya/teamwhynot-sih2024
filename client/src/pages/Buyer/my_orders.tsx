'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { Pagination } from "@/components/ui/pagination"

interface Order {
  id: string
  ordered: string
  delivered: string
  total: number
  status: string
}

export default function MyOrders() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [ordersPerPage] = useState<number>(10)
  const orders: Order[] = [
    {
      id: 'ORD001',
      ordered: '2024-09-06',
      delivered: '',
      total: 74.79,
      status: 'Packaging',
    },
  ]

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  )
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Order Timeline</h1>
        <div className="relative mt-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </header>
      <div className="overflow-x-auto">
        <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 after:left-0 grid gap-10">
          {currentOrders.map((order) => (
            <div key={order.id} className="grid gap-1 text-sm relative">
              <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
              <div className="font-medium">
                {order.id} - Ordered: {order.ordered}
                {order.delivered}
              </div>
              <div className="text-muted-foreground">
                Total: Rs. {order.total.toFixed(2)} - Status: {order.status}
              </div>
              <Button disabled={true}>Add Rating</Button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
      </div>
    </div>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
