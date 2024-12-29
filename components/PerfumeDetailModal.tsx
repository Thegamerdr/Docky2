import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, Droplet } from 'lucide-react'
import { WishlistButton } from './WishlistButton'

interface Perfume {
  id: string
  name: string
  brand: string
  price: number
  rating: number
  notes: string[]
  concentration: string
  longevity: number
  sillage: number
  description: string
}

interface PerfumeDetailModalProps {
  perfume: Perfume
}

export function PerfumeDetailModal({ perfume }: PerfumeDetailModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{perfume.name}</DialogTitle>
          <DialogDescription>{perfume.brand}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-green-500" />
              <span className="font-semibold">{perfume.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span>{perfume.rating.toFixed(1)}</span>
            </div>
            <WishlistButton perfumeId={perfume.id} initialIsWishlisted={false} />
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Description</h4>
            <p className="text-sm text-gray-500">{perfume.description}</p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Notes</h4>
            <div className="flex flex-wrap gap-1">
              {perfume.notes.map((note, index) => (
                <Badge key={index} variant="secondary">
                  {note}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2 font-semibold">Concentration</h4>
              <div className="flex items-center">
                <Droplet className="w-4 h-4 mr-1 text-blue-500" />
                {perfume.concentration}
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Longevity</h4>
              <span>{perfume.longevity} hours</span>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Sillage</h4>
            <span>{perfume.sillage}/10</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

