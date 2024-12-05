import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export function PerfumeComparison({ perfumes, platforms }: { perfumes: PerfumeData[], platforms: Platform[] }) {
  const uniquePerfumes = Array.from(new Set(perfumes.map(p => p.name)))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfume Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              {platforms.map(platform => (
                <TableHead key={platform}>{platform}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniquePerfumes.map(perfumeName => {
              const perfumeData = perfumes.find(p => p.name === perfumeName)
              return (
                <TableRow key={perfumeName}>
                  <TableCell>{perfumeName}</TableCell>
                  <TableCell>{perfumeData?.brand}</TableCell>
                  {platforms.map(platform => {
                    const platformData = perfumes.find(p => p.name === perfumeName && p.platform === platform)
                    return (
                      <TableCell key={platform}>
                        {platformData ? (
                          <>
                            <Badge variant="secondary">${platformData.price.toFixed(2)}</Badge>
                            <Badge variant="outline" className="ml-2">{platformData.stock} in stock</Badge>
                            <div className="mt-1">
                              <span className="text-sm">Rating: {platformData.rating.toFixed(1)}</span>
                              <span className="text-sm ml-2">Sales: {platformData.salesVolume}</span>
                            </div>
                          </>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

