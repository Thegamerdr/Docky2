import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Sidebar({ connectedPlatforms }: { connectedPlatforms: string[] }) {
  return (
    <div className="w-64 border-r bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="min-profit">Minimum Profit</Label>
          <Slider
            id="min-profit"
            defaultValue={[0]}
            max={100}
            step={1}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="price-range">Price Range</Label>
          <div className="mt-2 flex items-center space-x-2">
            <Input
              id="price-min"
              type="number"
              placeholder="Min"
              className="w-20"
            />
            <span>-</span>
            <Input
              id="price-max"
              type="number"
              placeholder="Max"
              className="w-20"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" placeholder="Enter brand name" className="mt-2" />
        </div>
        <div>
          <Label>Connected Platforms</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {connectedPlatforms.map(platform => (
              <Badge key={platform} variant="secondary">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
        <Button className="w-full">Apply Filters</Button>
      </div>
    </div>
  )
}

