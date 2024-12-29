import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Perfume {
  id: string
  name: string
  brand: string
  price?: number
  rating?: number
  notes?: string[]
  concentration?: string
  season?: string
  longevity?: string
  sillage?: string
}

interface ComparisonTableProps {
  perfumes: Perfume[]
}

export function ComparisonTable({ perfumes }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Concentration</TableHead>
            <TableHead>Season</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Longevity</TableHead>
            <TableHead>Sillage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {perfumes.map((perfume) => (
            <TableRow key={perfume.id}>
              <TableCell className="font-medium">{perfume.name}</TableCell>
              <TableCell>{perfume.brand}</TableCell>
              <TableCell>{perfume.concentration || 'N/A'}</TableCell>
              <TableCell>{perfume.season || 'N/A'}</TableCell>
              <TableCell>{perfume.price ? `$${perfume.price.toFixed(2)}` : 'N/A'}</TableCell>
              <TableCell>{perfume.rating ? `${perfume.rating.toFixed(1)}/5` : 'N/A'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {perfume.notes?.slice(0, 3).map((note, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {note}
                    </Badge>
                  ))}
                  {perfume.notes && perfume.notes.length > 3 && (
                    <span className="text-xs text-gray-500">+{perfume.notes.length - 3} more</span>
                  )}
                </div>
              </TableCell>
              <TableCell>{perfume.longevity || 'N/A'}</TableCell>
              <TableCell>{perfume.sillage || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

