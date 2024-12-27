'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Vendor {
  name: string
  price: number
  link: string
}

interface Product {
  id: string
  name: string
  brand: string
  basePrice: number
  rating: number
  image: string
  isNew?: boolean
  isFeatured?: boolean
  vendors: Vendor[]
  profitMargin: number
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function ProductGrid({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<'price' | 'profit'>('price')

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') {
      return Math.min(...a.vendors.map(v => v.price)) - Math.min(...b.vendors.map(v => v.price))
    } else {
      return b.profitMargin - a.profitMargin
    }
  })

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
    >
      <div className="col-span-full flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => setSortBy(sortBy === 'price' ? 'profit' : 'price')}
          className="flex items-center gap-2"
        >
          Sort by {sortBy === 'price' ? 'Profit Margin' : 'Lowest Price'}
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
      {sortedProducts.map((product) => (
        <motion.div key={product.id} variants={item} layoutId={product.id}>
          <Card className="h-full flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                {product.isNew && (
                  <Badge className="absolute top-4 left-4">
                    New Arrival
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    Featured
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {product.brand}
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold">
                  ${Math.min(...product.vendors.map(v => v.price)).toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm">{product.rating.toFixed(1)}</span>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-sm text-muted-foreground">
                      Profit Margin: {product.profitMargin.toFixed(2)}%
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estimated profit based on lowest vendor price</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="w-full space-y-2">
                {product.vendors.map((vendor, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full flex justify-between items-center"
                    asChild
                  >
                    <a href={vendor.link} target="_blank" rel="noopener noreferrer">
                      <span>{vendor.name}</span>
                      <span className="flex items-center gap-2">
                        ${vendor.price.toFixed(2)}
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </a>
                  </Button>
                ))}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

