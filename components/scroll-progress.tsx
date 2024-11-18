'use client'
import React from 'react'
import {motion, useScroll} from 'framer-motion'

const ScrollProgress = () => {
  const {scrollYProgress} = useScroll()
  return (
    <motion.div
      className="h-1.5 bg-primary origin-left fixed top-0 inset-x-0 z-50"
      style={{scaleX: scrollYProgress}}
    />
  )
}

export default ScrollProgress