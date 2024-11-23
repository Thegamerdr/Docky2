"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from 'lucide-react'

type Platform = "google" | "amazon" | "alibaba" | "ebay" | "walmart"

type PerfumeData = {
  id: string
  name: string
  brand: string
  price: Partial<Record<Platform, number>>
  stock: Partial<Record<Platform, number>>
  rating: Partial<Record<Platform, number>>
  salesVolume: Partial<Record<Platform, number>>
}

type ChartData = {
  name: string
} & Partial<Record<Platform, number>>

const fetchGoogleShoppingData = async (): Promise<PerfumeData[]> => {
  const response = await fetch('/api/google-shopping?query=perfume')
  if (!response.ok) {
    throw new Error('Failed to fetch Google Shopping data')
  }
  const data = await response.json()
  return data.items?.map((item: any) => ({
    id: item.product?.offerId || item.cacheId,
    name: item.title,
    brand: item.product?.brand || 'Unknown',
    price: { google: parseFloat(item.product?.inventories?.[0]?.price?.value) || 0 },
    stock: { google: item.product?.inventories?.[0]?.availability === 'inStock' ? 1 : 0 },
    rating: { google: item.product?.aggregateRating?.ratingValue || 0 },
    salesVolume: { google: item.product?.aggregateRating?.reviewCount || 0 },
  })) || []
}

const platformColors: Record<Platform, string> = {
  google: "#4285F4",
  amazon: "#ff9900",
  alibaba: "#FF6A00",
  ebay: "#86B817",
  walmart: "#0071DC",
}

export function Dashboard({ connectedPlatforms = [] }: { connectedPlatforms?: Platform[] }) {
  const [perfumes, setPerfumes] = useState<PerfumeData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if (connectedPlatforms.includes('google')) {
          const googleData = await fetchGoogleShoppingData()
          setPerfumes(googleData)
        } else {
          setPerfumes([])
        }
      } catch (error) {
        console.error('Error fetching perfume data:', error)
        setPerfumes([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [connectedPlatforms])

  const profitChartData: ChartData[] = perfumes.map(perfume => ({
    name: perfume.name,
    ...Object.entries(perfume.price).reduce((acc, [platform, price]) => ({
      ...acc,
      [platform]: price - Math.min(...Object.values(perfume.price))
    }), {})
  }))

  const salesVolumeChartData: ChartData[] = perfumes.map(perfume => ({
    name: perfume.name,
    ...perfume.salesVolume
  }))

  const totalListings = perfumes.reduce((sum, perfume) => 
    sum + Object.values(perfume.stock).reduce((a, b) => a + b, 0), 0
  )

  const averagePriceDifference = perfumes.reduce((sum, perfume) => {
    const prices = Object.values(perfume.price)
    return sum + (Math.max(...prices) - Math.min(...prices))
  }, 0) / (perfumes.length || 1)

  const potentialProfit = perfumes.reduce((sum, perfume) => {
    const prices = Object.values(perfume.price)
    const maxPrice = Math.max(...prices)
    const minPrice = Math.min(...prices)
    const stocks = Object.values(perfume.stock)
    const totalStock = stocks.reduce((a, b) => a + b, 0)
    return sum + (maxPrice - minPrice) * totalStock
  }, 0)

  const averageRating = perfumes.reduce((sum, perfume) => {
    const ratings = Object.values(perfume.rating)
    return sum + ratings.reduce((a, b) => a + b, 0) / (ratings.length || 1)
  }, 0) / (perfumes.length || 1)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (connectedPlatforms.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Please connect at least one platform to view the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalListings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePriceDifference.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Between highest and lowest</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${potentialProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Based on current price differences</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>
      </div>
      {connectedPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Profitability by Perfume and Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {connectedPlatforms.map(platform => (
                  <Bar key={platform} dataKey={platform} fill={platformColors[platform]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
      {connectedPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sales Volume by Perfume and Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesVolumeChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {connectedPlatforms.map(platform => (
                  <Line key={platform} type="monotone" dataKey={platform} stroke={platformColors[platform]} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Perfume Listings Across Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                {connectedPlatforms.map(platform => (
                  <TableHead key={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {perfumes.map((perfume) => (
                <TableRow key={perfume.id}>
                  <TableCell>{perfume.name}</TableCell>
                  <TableCell>{perfume.brand}</TableCell>
                  {connectedPlatforms.map(platform => (
                    <TableCell key={platform}>
                      <Badge variant="secondary">${perfume.price[platform]?.toFixed(2)}</Badge>
                      <Badge variant="outline" className="ml-2">{perfume.stock[platform]} in stock</Badge>
                      <div className="mt-1">
                        <span className="text-sm">Rating: {perfume.rating[platform]?.toFixed(1)}</span>
                        <span className="text-sm ml-2">Sales: {perfume.salesVolume[platform]}</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

