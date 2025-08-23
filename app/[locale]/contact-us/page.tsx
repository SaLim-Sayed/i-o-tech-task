import HeroSlider from '@/src/components/Home/Hero/HeroSlider'
import React from 'react'

export default function Page() {
    return (
        <div>
            <HeroSlider />
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                <h1>About  Us</h1>
                <p>Our team is dedicated to providing the best possible service to our clients.</p>
            </div>
        </div>
    )
}
