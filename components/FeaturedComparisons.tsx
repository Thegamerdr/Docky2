'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const comparisons = [
  {
    title: "Classic vs Modern",
    image1: "/chanel-no5.png",
    image2: "/dior-jadore.png",
    description: "Chanel N°5 vs Dior J'adore"
  },
  {
    title: "Fresh vs Spicy",
    image1: "/bleu-de-chanel.png",
    image2: "/dior-sauvage.png",
    description: "Bleu de Chanel vs Dior Sauvage"
  },
  {
    title: "Sweet vs Woody",
    image1: "/black-opium.png",
    image2: "/la-vie-est-belle.png",
    description: "Black Opium vs La Vie Est Belle"
  }
]

export function FeaturedComparisons() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Popular Perfume Comparisons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <Image src={comparison.image1} alt="" width={96} height={96} className="object-contain" />
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md">
                  <span className="text-2xl font-bold text-blue-600">VS</span>
                </div>
                <Image src={comparison.image2} alt="" width={96} height={96} className="object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{comparison.title}</h3>
              <p className="text-blue-700 mb-4">{comparison.description}</p>
              <Link href={`/compare?perfumes=${encodeURIComponent(comparison.description.replace(' vs ', ','))}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                Compare Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

