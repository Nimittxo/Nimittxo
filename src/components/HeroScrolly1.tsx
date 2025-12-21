import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HeroScrolly1 = () => {
  const containerRef = useRef(null)
  const planesContainerRef = useRef(null)
  const hitlerRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. INTRO: Fade in the Threat (Hitler) and Text
      // Note: We make sure opacity starts at 0 and goes to the class value
      gsap.from(hitlerRef.current, { opacity: 0, duration: 2, ease: "power2.out" })
      gsap.from(textRef.current, { opacity: 0, y: 30, duration: 2, delay: 0.5 })

      // 2. SCROLL: "Formation Flyover"
      // Instead of moving X (sideways), we move Z (Scale) and Y (Up)
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Smooth interaction
        }
      })

      // Animate the whole formation group together
      tl.to(planesContainerRef.current, {
        scale: 10,       // Make them HUGE (fly close to camera)
        y: -200,        // Fly upwards
        opacity: 0,     // Fade out as they pass the camera
        ease: "power1.in", // Start slow, accelerate past you
      }, 0) // Start at time 0

      // Fade out Hitler/Text as you fly past
      tl.to([hitlerRef.current, textRef.current], {
        opacity: 0,
        y: -100, // Move up slightly
        filter: "blur(7px)",
      }, 0)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    // Height 250vh = Long scroll runway for the flight animation
    <section ref={containerRef} className="relative h-[150vh] bg-black overflow-hidden">
      
      {/* THE STAGE (Sticky) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* --- LAYER 1: THE THREAT (Background) --- */}
        {/* Adjusted z-index and removed negative margins to ensure visibility */}
        <div className="absolute inset-0 flex items-center justify-left z-0">
          <img
  ref={hitlerRef}
  src="/ww2/hitler.png"
  className="
    absolute bottom-10 left-[-5%]
    w-[550px] md:w-[520px]
    opacity-70 grayscale contrast-125
    pointer-events-none
  "
/>
        </div>

        {/* --- LAYER 2: SPITFIRE FORMATION (Midground) --- */}
        {/* We use a container to hold them in a 'V' shape */}
        <div 
          ref={planesContainerRef} 
          className="absolute z-20 w-full h-full pointer-events-none absolute inset-0 z-20 pointer-events-none"
        >
          {/* Plane 1: Lead (Center, slightly ahead) */}
          <img 
            src="/ww2/spitfire.png" 
            alt="Spitfire Lead" 
            className="absolute w-48 md:w-64 translate-y-[-0px]" 
          />
          
          {/* Plane 2: Left Wing (Offset Left and Down) */}
          <img 
            src="/ww2/spitfire.png" 
            alt="Spitfire Left" 
            className="absolute w-40 md:w-56 -translate-x-40 translate-y-20 md:-translate-x-60 md:translate-y-32" 
          />

          {/* Plane 3: Right Wing (Offset Right and Down) */}
          <img 
            src="/ww2/spitfire.png" 
            alt="Spitfire Right" 
            className="absolute w-40 md:w-56 translate-x-40 translate-y-20 md:translate-x-60 md:translate-y-32" 
          />
        </div>

        {/* --- LAYER 3: TEXT CONTENT (Foreground) --- */}
        <div ref={textRef} className="relative z-30 text-center px-4 mt-20">
          <h1 className="text-white text-5xl md:text-8xl font-war font-bold tracking-tighter leading-none mb-4 drop-shadow-lg">
            THE WAR THAT FORCED <br/>
            <span className="text-red-600">THE FOUNDATIONS</span> OF AI
          </h1>

          <div className="inline-block border-l-4 border-red-600 pl-4 bg-black/60 backdrop-blur-md p-4 rounded-r-lg">
            <h2 className="text-gray-300 font-machine text-sm md:text-xl max-w-2xl text-left">
              The creation of machines that made intelligence computable
            </h2>
          </div>

          <div className="absolute left-1/2 bottom-[-20vh] -translate-x-1/2 animate-bounce">
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroScrolly1