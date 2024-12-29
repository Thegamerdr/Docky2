'use client'

import { motion } from 'framer-motion'
import { Scale, Sparkles, Heart } from 'lucide-react'

const features = [
  {
    icon: Scale,
    title: "Compare Scents",
    description: "See how different perfumes stack up side by side!"
  },
  {
    icon: Sparkles,
    title: "Find Similar Smells",
    description: "Discover perfumes that smell alike at different prices."
  },
  {
    icon: Heart,
    title: "Save Your Favorites",
    description: "Keep track of the perfumes you love most."
  }
]

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-yellow-100 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-900">{feature.title}</h3>
              <p className="text-purple-700 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

