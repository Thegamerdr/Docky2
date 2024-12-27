import { Label } from '@/components/ui/label'

export function SearchForm() {
  return (
    <form>
      <Label htmlFor="search">Search Perfumes</Label>
      <Input
        id="search"
        type="search"
        placeholder="Enter perfume name..."
        aria-label="Search perfumes"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

