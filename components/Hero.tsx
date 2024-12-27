'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Percent, ShoppingCart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Container } from '@/components/ui/container'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Compare Perfumes & Save
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find the best deals on luxury fragrances from multiple vendors. Compare prices, track profit margins, and make informed decisions.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12">
            <Input
              type="search"
              placeholder="Search for perfumes to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-full border-2 border-input focus:border-primary transition-colors text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={24} />
            <Button 
              type="submit"
              size="lg" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
            >
              Compare
            </Button>
          </form>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: ShoppingCart, label: 'Compare Prices', description: 'Find the best deals across vendors' },
              { icon: Percent, label: 'Track Profits', description: 'Monitor your potential earnings' },
              { icon: TrendingUp, label: 'Market Insights', description: 'Stay updated with market trends' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                className="text-center"
              >
                <feature.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.label}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

