"use client"
import HeroSlider from '@/src/components/Home/Hero/HeroSlider'
import ReviewsSection from '@/src/components/Home/ReviewsSection/ReviewsSection'
import TeamSection from '@/src/components/Home/TeamSection/TeamSection'
import Swipper from '@/src/components/Layout/Swipper'
import React from 'react'

export default function page() {
  return (
    <div>
               <HeroSlider />
               <TeamSection />
               <ReviewsSection />

    </div>
  )
}
