'use client'

import { motion } from 'framer-motion'
import { ReactNode, useRef, useState, useEffect } from 'react'

interface HorizontalScrollProps {
  children: ReactNode
}

export function HorizontalScroll({ children }: HorizontalScrollProps) {
  const [width, setWidth] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      setWidth(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth)
    }
  }, [])

  return (
    <motion.div
      ref={scrollRef}
      className="cursor-grab overflow-hidden px-4 py-8"
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="flex"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

