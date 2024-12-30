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

const NAME_HEADER = "Name";
const BRAND_HEADER = "Brand";
const PRICE_HEADER = "Price";
const RATING_HEADER = "Rating";
const CURRENCY_SYMBOL = "$";

export function ComparisonTable({ perfumes }: ComparisonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{NAME_HEADER}</TableHead>
          <TableHead>{BRAND_HEADER}</TableHead>
          <TableHead>{PRICE_HEADER}</TableHead>
          <TableHead>{RATING_HEADER}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {perfumes.map((perfume) => (
          <TableRow key={perfume.id}>
            <TableCell>{perfume.name}</TableCell>
            <TableCell>{perfume.brand}</TableCell>
            <TableCell>{CURRENCY_SYMBOL}{perfume.price.toFixed(2)}</TableCell>
            <TableCell>{perfume.rating.toFixed(1)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

