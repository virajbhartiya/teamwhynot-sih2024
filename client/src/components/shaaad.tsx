/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/8SsnYvFtqtM
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export function shaaad() {
  return (
    <Carousel className="w-full max-w-sm" opts={{ loop: true }}>
      <CarouselContent>
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <img
                  alt="Product 1"
                  className="aspect-square object-cover rounded-lg border"
                  height="150"
                  src="/placeholder.svg"
                  width="150"
                />
                <div className="text-sm font-medium">Cozy Slippers</div>
                <div className="text-sm text-gray-500">$24.99</div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <img
                  alt="Product 2"
                  className="aspect-square object-cover rounded-lg border"
                  height="150"
                  src="/placeholder.svg"
                  width="150"
                />
                <div className="text-sm font-medium">Classic Watch</div>
                <div className="text-sm text-gray-500">$99.99</div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <img
                  alt="Product 3"
                  className="aspect-square object-cover rounded-lg border"
                  height="150"
                  src="/placeholder.svg"
                  width="150"
                />
                <div className="text-sm font-medium">Wireless Earbuds</div>
                <div className="text-sm text-gray-500">$79.99</div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <img
                  alt="Product 4"
                  className="aspect-square object-cover rounded-lg border"
                  height="150"
                  src="/placeholder.svg"
                  width="150"
                />
                <div className="text-sm font-medium">Smartphone</div>
                <div className="text-sm text-gray-500">$599.99</div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                  <StarIcon className="h-4 w-4 fill-current" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
