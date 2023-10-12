"use client"
import React from 'react'
import Typewriter from 'typewriter-effect'

const TypeEffect = () => {
  return (
    <Typewriter 
    options={{
        loop: true
    }}
    onInit={(typewriter) => {
        typewriter.typeString('Supercharged productivity').pauseFor(1000).deleteAll().typeString('AI-Insights').start()
    }}
    />
  )
}

export default TypeEffect
