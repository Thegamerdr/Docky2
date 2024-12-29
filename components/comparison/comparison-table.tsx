import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Perfume {
  id: string
  name: string
  brand: string
  price: number
  rating: number
}

interface ComparisonTableProps {
  perfumes: Perfume[]
}

export function ComparisonTable({ perfumes }: ComparisonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {perfumes.map((perfume) => (
          <TableRow key={perfume.id}>
            <TableCell>{perfume.name}</TableCell>
            <TableCell>{perfume.brand}</TableCell>
            <TableCell>${perfume.price.toFixed(2)}</TableCell>
            <TableCell>{perfume.rating.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

