import Image from 'next/image'

export function PerfumeCard({ perfume }) {
  return (
    <div className="card">
      <Image
        src={perfume.image}
        alt={perfume.name}
        width={300}
        height={300}
        loading="lazy"
      />
      {/* Rest of the card content */}
    </div>
  )
}

