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
import { PerfumeComparison } from '@/components/perfume-comparison'
import { format } from 'date-fns'

type Platform = "google" | "amazon" | "alibaba" | "ebay" | "walmart" | "other"

type PerfumeData = {
  id: string
  name: string
  brand: string
  price: number
  stock: number
  rating: number
  salesVolume: number
  platform: Platform
  lastUpdated: string
}

type ChartData = {
  name: string
} & Partial<Record<Platform, number>>

const fetchPerfumeData = async (query: string): Promise<PerfumeData[]> => {
  const response = await fetch(`/api/google-shopping?query=${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch perfume data')
  }
  return await response.json()
}

const platformColors: Record<Platform, string> = {
  google: "#4285F4",
  amazon: "#ff9900",
  alibaba: "#FF6A00",
  ebay: "#86B817",
  walmart: "#0071DC",
  other: "#808080"
}

export function Dashboard({ searchQuery = '' }: { searchQuery?: string }) {
  const [perfumes, setPerfumes] = useState<PerfumeData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchPerfumeData(searchQuery || 'perfume')
        setPerfumes(data)
      } catch (error) {
        console.error('Error fetching perfume data:', error)
        setPerfumes([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchQuery])

  const connectedPlatforms = Array.from(new Set(perfumes.map(p => p.platform)))

  const profitChartData: ChartData[] = perfumes.reduce((acc, perfume) => {
    const existingEntry = acc.find(entry => entry.name === perfume.name)
    if (existingEntry) {
      existingEntry[perfume.platform] = perfume.price
    } else {
      acc.push({
        name: perfume.name,
        [perfume.platform]: perfume.price
      })
    }
    return acc
  }, [] as ChartData[])

  const salesVolumeChartData: ChartData[] = perfumes.reduce((acc, perfume) => {
    const existingEntry = acc.find(entry => entry.name === perfume.name)
    if (existingEntry) {
      existingEntry[perfume.platform] = perfume.salesVolume
    } else {
      acc.push({
        name: perfume.name,
        [perfume.platform]: perfume.salesVolume
      })
    }
    return acc
  }, [] as ChartData[])

  const totalListings = perfumes.length

  const averagePriceDifference = perfumes.reduce((sum, perfume) => {
    const otherPrices = perfumes.filter(p => p.name === perfume.name && p.platform !== perfume.platform).map(p => p.price)
    return sum + (Math.max(perfume.price, ...otherPrices) - Math.min(perfume.price, ...otherPrices))
  }, 0) / (perfumes.length || 1)

  const potentialProfit = perfumes.reduce((sum, perfume) => {
    const otherPrices = perfumes.filter(p => p.name === perfume.name && p.platform !== perfume.platform).map(p => p.price)
    return sum + (Math.max(perfume.price, ...otherPrices) - Math.min(perfume.price, ...otherPrices)) * perfume.stock
  }, 0)

  const averageRating = perfumes.reduce((sum, perfume) => sum + perfume.rating, 0) / (perfumes.length || 1)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (perfumes.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>No perfume data available. Try searching for a specific perfume.</p>
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
                <TableHead>Platform</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Sales Volume</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perfumes.map((perfume) => (
                <TableRow key={`${perfume.id}-${perfume.platform}`}>
                  <TableCell>{perfume.name}</TableCell>
                  <TableCell>{perfume.brand}</TableCell>
                  <TableCell>
                    <Badge style={{backgroundColor: platformColors[perfume.platform]}}>
                      {perfume.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>${perfume.price.toFixed(2)}</TableCell>
                  <TableCell>{perfume.stock}</TableCell>
                  <TableCell>{perfume.rating.toFixed(1)}</TableCell>
                  <TableCell>{perfume.salesVolume}</TableCell>
                  <TableCell>{format(new Date(perfume.lastUpdated), 'PPpp')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <PerfumeComparison perfumes={perfumes} platforms={connectedPlatforms as Platform[]} />
    </div>
  )
}

