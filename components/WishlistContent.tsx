'use client'

import { useState, useEffect } from 'react'
import { PerfumeCard } from '@/components/PerfumeCard'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'

interface Perfume {
  id: string
  name: string
  brand: string
  price?: number
  rating?: number
  notes?: string[]
  concentration?: string
  image?: string
}

export function WishlistContent() {
  const [wishlist, setWishlist] = useState<Perfume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist')
        if (!response.ok) throw new Error('Failed to fetch wishlist')
        const data = await response.json()
        setWishlist(data)
      } catch (error) {
        console.error('Error fetching wishlist:', error)
        setError('Failed to load wishlist. Please try again later.')
        toast({
          title: "Error",
          description: "Failed to load wishlist. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [toast])

  const removeFromWishlist = async (perfumeId: string) => {
    try {
      const response = await fetch(`/api/wishlist/${perfumeId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to remove from wishlist')
      setWishlist(wishlist.filter(p => p.id !== perfumeId))
      toast({
        title: "Removed from Wishlist",
        description: "The perfume has been removed from your wishlist.",
      })
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      toast({
        title: "Error",
        description: "Failed to remove from wishlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center" data-testid="empty-wishlist">
        <p className="text-teal-600 mb-4">Your wishlist is empty.</p>
        <Link href="/browse" passHref>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            Browse Perfumes
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishlist.map(perfume => (
        <PerfumeCard
          key={perfume.id}
          perfume={perfume}
          isSelected={false}
          onSelect={() => removeFromWishlist(perfume.id)}
          actionLabel="Remove from Wishlist"
        />
      ))}
    </div>
  )
}

