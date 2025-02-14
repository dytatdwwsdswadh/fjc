'use client'

import React, { useState } from 'react'
import { Pixelify_Sans } from 'next/font/google'
import Password from '../components/Password'
import Wheel from '../components/Wheel'

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: '400'
})

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  
  // State to control the "No" button's fun behavior
  const [noClicked, setNoClicked] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 })
  
  // State to control the "Yes" button scale
  const [yesScale, setYesScale] = useState(1)
  
  // State to show the Wheel view
  const [showWheel, setShowWheel] = useState(false)

  // When "No" is clicked: reposition it anywhere within the viewport and enlarge the Yes button.
  const handleNoClick = () => {
    const buttonWidth = 120
    const buttonHeight = 50
    const newLeft = Math.floor(Math.random() * (window.innerWidth - buttonWidth))
    const newTop = Math.floor(Math.random() * (window.innerHeight - buttonHeight))
    setNoButtonPosition({ top: newTop, left: newLeft })
    setNoClicked(true)
    setYesScale(prev => prev + 0.2)
  }

  const content = [
    { text: "hi jill", image: "cathi.gif" },
    { text: "it's februrary 14th...", image: "day.jpg" },
    { text: "you know what that means...", image: "catcute.jpg" },
    { text: "lets get freaky :D", image: "catsmirk.jpg" },
    { text: "just kidding (lol)", image: "catok.webp" },
    { text: "unless...", image: "catsideye.jpg" },
    { text: "just kidding (double lol)", image: "catok.webp" },
    { text: "anyways...", image: "cattail.jpg" },
    { text: "today is februrary 14th...", image: "day.jpg" },
    { text: "which means...", image: "catthink.jpg" },
    { text: "IT'S VALENTINE'S DAY", image: "catshocked.gif" },
    { text: "do you...", image: "shycat.jpg" },
    { text: "do you maybe...", image: "catshy1.jpg" },
    { text: "do you want to be my valentine?", image: "catflower.gif" },
    { text: "good.", image: "catserious.gif" },
    { text: "now, let's talk business.", image: "catbusiness.jpg" },
    { text: "as my valentine, i am unfortunately obligated to give you a gift.", image: "catbusiness2.png" },
    { text: "here are some things i will NOT be giving you:", image: "catbusiness3.jpg" },
    { text: "money (i have none)", image: "catmoney.jpg" },
    { text: "peanuts (you would probably die)", image: "catpeanut.jpg" },
    { text: "a car (i dont trust you to drive)", image: "catcar.jpg" },
    { text: "now, here are some things that i WILL be giving you:", image: "catexcited.jpg" },
    { text: "my presence (the greatest present)", image: "catcutie.jpg"},
    { text: "food (i can tell you like to eat)", image: "fatcat.gif"},
    { text: "flowers (because society told me to)", image: "catflowers2.jpg"},
    { text: "now, you may be a bit disappointed...", image: "catdisappointed.png" },
    { text: "BUT WAIT!", image: "catsurprised1.jpg" },
    { text: "I'M NOT DONE YET!!", image: "catsurprised2.gif" },
    { text: "because now you get to...", image: "catwow.jpg" },
    { text: "SPIN THE WHEEL OF FORTUNE!!!", image: "catjumping.gif"},
    { text: "you got an entire gallon of baja blast!!!", image: "catexcited2.gif"},
    { text: "of course, you aren't gonna drink all that...", image: "catsmile.jpg"},
    { text: "right?", image: "catsideye2.jpg"},
    { text: "anyways...", image: "catalright.jpg"},
    { text: "valentine's day isn't about the gift, it's about the love", image: "catnerd.png"},
    { text: "and guess what...", image: "el gato.webp"},
    { text: "through the quiet moments...", image: "quiet.jpg"},
    { text: "and the loud ones...", image: "loud.jpg"},
    { text: "you're always there for me", image: "hold.jpg"},
    { text: "so happy valentines day!", image: "last.jpg"},
    { text: "i love you :)", image: "love.jpg"},
  ]

  // Add typing effect function
  React.useEffect(() => {
    if (showWheel) return // do not run typing if wheel view is active
    setIsTyping(true)
    setTypedText('')
    
    const text = content[textIndex]?.text || ''
    let currentIndex = 0
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [textIndex, showWheel])

  if (!authenticated) {
    return <Password onAuthenticated={setAuthenticated} />
  }

  // If wheel mode is active, show the Wheel component.
  if (showWheel) {
    return (
      <div className={`${pixelifySans.className} min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-100 to-red-100`}>
        <Wheel 
          onNext={() => {
            setShowWheel(false)
            setTextIndex((prev) => (prev + 1) % content.length)
          }}
        />
      </div>
    )
  }

  // Determine if the current text is the Valentine question and if it's the last element.
  const isValentineQuestion = content[textIndex].text === "do you want to be my valentine?"
  const isLastElement = textIndex === content.length - 1

  return (
    <div className={`${pixelifySans.className} min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-100 to-red-100`}>
      <div className="flex flex-col items-center gap-4">
        {content[textIndex].image && (
          <img 
            src={content[textIndex].image} 
            alt=""
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
        )}
        <p className="text-3xl text-pink-500 mb-2">
          {typedText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p> 
        <div>
          {isValentineQuestion ? (
            // Container for the Yes/No buttons
            <div className="relative flex gap-2 items-center justify-center" style={{ width: '300px', height: '60px' }}>
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded-lg transition-all duration-200 transform shadow-md text-xl"
                onClick={() => setTextIndex((prev) => (prev + 1) % content.length)}
                style={{ transform: `scale(${yesScale})` }}
              >
                Yes
              </button>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 transform shadow-md text-xl"
                onClick={handleNoClick}
                style={
                  noClicked
                    ? { 
                        position: 'fixed', 
                        top: `${noButtonPosition.top}px`, 
                        left: `${noButtonPosition.left}px`
                      }
                    : {}
                }
              >
                No
              </button>
            </div>
          ) : (
            // Only render the arrow buttons if we are not at the last element.
            !isLastElement && (
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-pink-500 text-xl"
                  onClick={() => {
                    setTextIndex((prev) => (prev - 1 + content.length) % content.length)
                    setYesScale(1)
                    setNoClicked(false)
                  }}
                  disabled={textIndex === 0}
                >
                  ←
                </button>
                <button 
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-200 transform hover:scale-105 shadow-md text-xl"
                  onClick={() => {
                    // if we are on the "SPIN THE WHEEL OF FORTUNE!!!" text, show the wheel instead of advancing text.
                    if (content[textIndex].text === "SPIN THE WHEEL OF FORTUNE!!!") {
                      setShowWheel(true)
                    } else {
                      setTextIndex((prev) => (prev + 1) % content.length)
                      setYesScale(1)
                      setNoClicked(false)
                    }
                  }}
                >
                  →
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Home