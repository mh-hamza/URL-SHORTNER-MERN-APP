import React, { useEffect, useState } from 'react'
import About from '../pages/About.jsx'
import Hero from '../components/Hero.jsx'
import QASection from '../components/QASection.jsx'

function Home() {
  return (
   <>
    <div>
      <Hero/>
    </div>
    <div>
      <About/>
    </div>
    <div>
      <QASection/>
    </div>
   </>
  )
}

export default Home
