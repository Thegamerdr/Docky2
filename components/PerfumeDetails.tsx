'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PerfumeData } from '@/types/perfume'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { StarIcon } from 'lucide-react'

interface PerfumeDetailsProps {
  perfume: PerfumeData
}

export default function PerfumeDetails({ perfume }: PerfumeDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{perfume.name}</DialogTitle>
          <DialogDescription>Detailed information about this perfume.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative w-full h-64">
            <Image
              src={perfume.image || '/placeholder.svg'}
              alt={perfume.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-bold">Brand:</div>
            <div className="col-span-3">{perfume.brand}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-bold">Price:</div>
            <div className="col-span-3">${perfume.price.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-bold">Rating:</div>
            <div className="col-span-3 flex items-center">
              {perfume.rating ? (
                <>
                  {perfume.rating.toFixed(1)}
                  <StarIcon className="ml-1 h-4 w-4 text-yellow-400" />
                </>
              ) : (
                'N/A'
              )}
            </div>
          </div>
          {perfume.description && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-bold">Description:</div>
              <div className="col-span-3">{perfume.description}</div>
            </div>
          )}
        </div>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

