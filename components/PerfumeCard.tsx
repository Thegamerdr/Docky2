import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Perfume {
  id: string
  name: string
  brand: string
  price: number
}

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{perfume.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Brand: {perfume.brand}</p>
        <p>Price: ${perfume.price}</p>
      </CardContent>
    </Card>
  )
}

