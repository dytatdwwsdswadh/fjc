import React, { useState } from 'react'

function Wheel() {
  // List of gifts (feel free to add/remove for a "lot of gifts" effect)
  const gifts = [
    "A Million Dollars",
    "A New Car",
    "A Trip To The Moon",
    "World Peace",
    "A Year Of Free Food",
    "Ending World Hunger",
    "The Mona Lisa",
    "Dinner With Harry Styles",
    "An Internship",
    "A Gallon Of Baja Blast",
    "Mars",
    "5 Bitcoins"
  ]

  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)

  // Removed randomization: always spin with fixed extra rotations and land at the same normalized angle.
  const spinWheel = () => {
    if (spinning) return
    setSelectedGift(null)
    setSpinning(true)
    const spins = 5; // fixed number of full rotations for a nice animation
    const targetOffset = 350; // constant final normalized rotation (degrees) for a consistent outcome
    const currentNormalized = rotation % 360;
    let delta = targetOffset - currentNormalized;
    if (delta < 0) {
      delta += 360;
    }
    // If already at target, force at least one extra full spin.
    if (delta === 0) {
      delta = 360;
    }
    const finalRotation = rotation + spins * 360 + delta;
    setRotation(finalRotation)
  }

  const handleTransitionEnd = () => {
    // Calculate which gift was selected:
    const normalizedRotation = rotation % 360
    const segmentAngle = 360 / gifts.length
    // The pointer is fixed at the top so we take (360 - normalizedRotation)
    const index = Math.floor((360 - normalizedRotation) / segmentAngle) % gifts.length
    setSelectedGift(gifts[index])
    setSpinning(false)
  }

  // Build the wheel using SVG.
  const wheelSize = 500
  const center = wheelSize / 2
  const radius = center - 10 // add some padding
  const slices = gifts.map((gift, index) => {
    const startAngle = (index * 2 * Math.PI) / gifts.length
    const endAngle = ((index + 1) * 2 * Math.PI) / gifts.length
    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1
    const x1 = center + radius * Math.cos(startAngle)
    const y1 = center + radius * Math.sin(startAngle)
    const x2 = center + radius * Math.cos(endAngle)
    const y2 = center + radius * Math.sin(endAngle)
    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')
    // Use HSL to generate a different color for each arc.
    const fill = `hsl(${index * (360 / gifts.length)}, 70%, 70%)`
    return { pathData, fill, index, gift }
  })

  const wheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: spinning ? 'transform 4s ease-out' : 'none'
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl text-pink-500 mb-4">Wheel of Fortune!!!</h2>
      <div className="relative">
        {/* Fixed pointer arrow */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%) translateY(50%) rotate(180deg)',
          zIndex: 1
        }}>
          <svg width="20" height="20">
            <polygon points="10,0 0,20 20,20" fill="black" />
          </svg>
        </div>
        <svg 
          width={wheelSize} 
          height={wheelSize} 
          style={wheelStyle} 
          onTransitionEnd={handleTransitionEnd}
        >
          {slices.map(slice => (
            <path key={slice.index} d={slice.pathData} fill={slice.fill} stroke="white" strokeWidth="2" />
          ))}
          {/* Add rotated gift labels to each segment */}
          {slices.map(slice => {
            const angleInRadians = (slice.index + 0.5) * (2 * Math.PI / gifts.length)
            const x = center + (radius / 2) * Math.cos(angleInRadians)
            const y = center + (radius / 2) * Math.sin(angleInRadians)
            const angleInDegrees = (angleInRadians * 180) / Math.PI
            
            // Original baseline rotation for text:
            let rotation = angleInDegrees + 90
            // Flip text if needed to keep it upright:
            if (rotation > 90 && rotation < 270) {
              rotation += 180
            }
            // Apply extra 90° rotation *afterward*:
            const finalRotation = rotation + 90

            return (
              <text 
                key={slice.index + '-text'}
                x={x}
                y={y}
                fill="black"
                fontSize="16" // increased from 10 to 16 for bigger text
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${finalRotation} ${x} ${y})`}
              >
                {slice.gift}
              </text>
            )
          })}
        </svg>
      </div>
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg transition-all duration-200 hover:bg-blue-600"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {selectedGift && (
        <div className="mt-4 text-xl">
          You got: <strong>A Gallon Of Baja Blast!!!</strong>
        </div>
      )}
    </div>
  )
}

export default Wheel
