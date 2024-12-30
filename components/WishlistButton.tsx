import { useState } from 'react'
import Button from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface WishlistButtonProps {
  perfumeId: string
  initialIsWishlisted: boolean
}

export function WishlistButton({ perfumeId, initialIsWishlisted }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted)
  const { toast } = useToast()

  const handleWishlist = async () => {
    try {
      // In a real app, you'd make an API call here
      // const response = await fetch(`/api/wishlist/${perfumeId}`, {
      //   method: isWishlisted ? 'DELETE' : 'POST',
      // })
      // if (!response.ok) throw new Error('Failed to update wishlist')

      setIsWishlisted(!isWishlisted)
      toast({
        title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        description: "Your wishlist has been updated.",
      })
    } catch (error) {
      console.error('Error updating wishlist:', error)
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      variant={isWishlisted ? "secondary" : "outline"}
      size="icon"
      onClick={handleWishlist}
    >
      <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
    </Button>
  )
}

