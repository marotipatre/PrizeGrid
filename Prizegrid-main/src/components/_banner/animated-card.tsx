'use client'

import { motion } from 'framer-motion'

interface CardData {
  id: number
  title: string
  description: string
  imageUrl: string
}

interface AnimatedCardProps {
  data: CardData
  className?: string
}

export function AnimatedCard({ data, className = '' }: AnimatedCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg border border-white overflow-visible ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
        zIndex: 1
      }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={data.imageUrl} alt={data.title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{data.title}</h2>
        <p className="text-gray-600">{data.description}</p>
      </div>
    </motion.div>
  )
}

