import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { PerfumeData } from '@/types/perfume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Plus, Minus } from 'lucide-react'

export default function AdminDashboard() {
  const [perfumes, setPerfumes] = useState<PerfumeData[]>([])
  const [selectedPerfume, setSelectedPerfume] = useState<PerfumeData | null>(null)
  const [dupes, setDupes] = useState<any[]>([])
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/')
    } else {
      fetchPerfumes()
    }
  }, [session, status])

  const fetchPerfumes = async () => {
    const res = await fetch('/api/perfumes')
    const data = await res.json()
    setPerfumes(data)
  }

  const handleAddDupe = () => {
    setDupes([...dupes, { dupeBrand: '', dupeName: '', concentration: '' }])
  }

  const handleRemoveDupe = (index: number) => {
    setDupes(dupes.filter((_, i) => i !== index))
  }

  const handleDupeChange = (index: number, field: string, value: string) => {
    const newDupes = [...dupes]
    newDupes[index] = { ...newDupes[index], [field]: value }
    setDupes(newDupes)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const perfumeData = {
      ...Object.fromEntries(formData.entries()),
      dupes
    }

    const res = await fetch('/api/perfumes', {
      method: selectedPerfume ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(perfumeData),
    })

    if (res.ok) {
      toast({
        title: `Perfume ${selectedPerfume ? 'updated' : 'added'} successfully`,
        variant: 'default',
      })
      fetchPerfumes()
      setSelectedPerfume(null)
      setDupes([])
    } else {
      toast({
        title: `Failed to ${selectedPerfume ? 'update' : 'add'} perfume`,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Perfume List</h2>
          <div className="space-y-4">
            {perfumes.map((perfume) => (
              <div key={perfume.id} className="bg-card p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{perfume.name}</h3>
                  <div>
                    <Button onClick={() => {
                      setSelectedPerfume(perfume)
                      setDupes(perfume.dupes || [])
                    }} className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(perfume.id)} variant="destructive">
                      Delete
                    </Button>
                  </div>
                </div>
                {perfume.dupes && perfume.dupes.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Dupes:</p>
                    <ul className="text-sm text-muted-foreground">
                      {perfume.dupes.map((dupe, index) => (
                        <li key={index}>
                          {dupe.dupeBrand} - {dupe.dupeName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {selectedPerfume ? 'Edit Perfume' : 'Add New Perfume'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              defaultValue={selectedPerfume?.name}
              required
            />
            <Input
              name="brand"
              placeholder="Brand"
              defaultValue={selectedPerfume?.brand}
              required
            />
            <Input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              defaultValue={selectedPerfume?.price}
              required
            />
            <Input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Rating"
              defaultValue={selectedPerfume?.rating}
              required
            />
            <Select
              name="concentration"
              defaultValue={selectedPerfume?.concentration || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select concentration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EDT">EDT</SelectItem>
                <SelectItem value="EDP">EDP</SelectItem>
                <SelectItem value="Parfum">Parfum</SelectItem>
              </SelectContent>
            </Select>
            <Select
              name="season"
              defaultValue={selectedPerfume?.season || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spring">Spring</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Fall">Fall</SelectItem>
                <SelectItem value="Winter">Winter</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="image"
              placeholder="Image URL"
              defaultValue={selectedPerfume?.image}
              required
            />
            <Input
              name="notes"
              placeholder="Notes (comma-separated)"
              defaultValue={selectedPerfume?.notes.join(', ')}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              defaultValue={selectedPerfume?.description}
              required
            />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Dupes</h3>
                <Button type="button" onClick={handleAddDupe} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Dupe
                </Button>
              </div>
              {dupes.map((dupe, index) => (
                <div key={index} className="grid gap-4 p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <h4>Dupe #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDupe(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Dupe Brand"
                    value={dupe.dupeBrand}
                    onChange={(e) => handleDupeChange(index, 'dupeBrand', e.target.value)}
                  />
                  <Input
                    placeholder="Dupe Name"
                    value={dupe.dupeName}
                    onChange={(e) => handleDupeChange(index, 'dupeName', e.target.value)}
                  />
                  <Select
                    value={dupe.concentration}
                    onValueChange={(value) => handleDupeChange(index, 'concentration', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select concentration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EDT">EDT</SelectItem>
                      <SelectItem value="EDP">EDP</SelectItem>
                      <SelectItem value="Parfum">Parfum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <Button type="submit">
              {selectedPerfume ? 'Update Perfume' : 'Add Perfume'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

