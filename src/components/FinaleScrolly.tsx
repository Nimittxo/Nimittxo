import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const FinaleScrolly = () => {
  const sectionRef = useRef(null)
  
  // Backgrounds
  const colossusBgRef = useRef(null)
  const tubesRef = useRef(null)
  const blackScreenRef = useRef(null)

  // Text Blocks
  const machineTextRef = useRef(null)
  const legacyTextRef = useRef(null)
  const finalTextRef = useRef(null)

  useLayoutEffect(() => {
    // Mobile check for GSAP calculations
    const isMobile = window.innerWidth < 768
    
    const ctx = gsap.context(() => {
      
      // SETUP: Initial States
      gsap.set([machineTextRef.current, legacyTextRef.current, finalTextRef.current], { opacity: 0, y: 30 })
      gsap.set(blackScreenRef.current, { opacity: 0 }) 
      gsap.set(tubesRef.current, { opacity: 0 }) // Tubes start invisible

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=200%", // Short and sweet finale
    scrub: 1,
    pin: true,
  }
})

      // --- SCENE 1: THE AWAKENING (Colossus) ---
      // Fade in Colossus Background
      tl.to(colossusBgRef.current, { opacity: 0.6, duration: 1 })
      
      // Text 1 Enters
      .to(machineTextRef.current, { opacity: 1, y: 0, duration: 1 }, "<")
      
      // SPECIAL EFFECT: Tubes pulse ONLY when we talk about "Electronic Speed"
      .to(tubesRef.current, { 
        opacity: isMobile ? 0.5 : 0.8, // Subtle on mobile
        scale: 1.1, 
        duration: 1.5, 
        ease: "power2.out" 
      }, "<")

      // Text 1 & Tubes Exit together (Cleaning the screen)
      .to([machineTextRef.current, tubesRef.current], { opacity: 0, y: -20, duration: 1, delay: 2 })

      // --- SCENE 2: THE LEGACY (Darker Mood) ---
      // Darken Colossus background significantly to focus on the question
      .to(colossusBgRef.current, { opacity: 0.2, filter: "blur(5px)", duration: 1 })
      
      // Text 2 Enters
      .to(legacyTextRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(legacyTextRef.current, { opacity: 0, y: -20, duration: 1, delay: 3 })

      // --- SCENE 3: THE VERDICT (Fade to Black) ---
      // 1. Fade screen to full black
      .to(blackScreenRef.current, { opacity: 1, duration: 1.5 })
      
      // 2. Final Text Enters
      .to(finalTextRef.current, { opacity: 1, y: 0, duration: 1.5 })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-black text-white overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 w-full h-screen overflow-hidden pointer-events-none">
        
        {/* Layer 1: The Machine (Colossus) */}
        {/* We use object-cover to ensure it fills the screen on mobile */}
        <img
          ref={colossusBgRef}
          src="/ww2/collosus_computer.png"
          alt="Colossus Computer"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        />
        
        {/* Layer 2: Glowing Tubes (The Pulse) */}
        {/* Use mix-blend-overlay so it glows ON TOP of the machine, not blocking it */}
        <div ref={tubesRef} className="absolute inset-0 mix-blend-overlay z-10">
          <img 
            src="/ww2/glowing_vaccum_tube.jpg" 
            alt="Glowing Tubes" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Layer 3: Heavy Vignette (Focus attention to center) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] z-20"></div>
      </div>

      {/* --- FINAL BLACK CURTAIN --- */}
      <div 
        ref={blackScreenRef} 
        className="absolute inset-0 w-full h-screen bg-black z-40 pointer-events-none"
      ></div>

      {/* --- TEXT CONTENT --- */}
      {/* Used 'fixed' logic via flex-center to ensure text is always in the middle of viewport */}
      <div className="absolute inset-0 w-full h-screen flex flex-col items-center justify-center z-50 px-4 md:px-0 text-center pointer-events-none">

        {/* SCENE 1: THE MACHINE */}
        <div ref={machineTextRef} className="absolute w-full max-w-4xl px-4">
          <h2 className="text-4xl md:text-8xl font-war text-orange-500 mb-6 drop-shadow-[0_0_30px_rgba(249,115,22,0.8)]">
            THE COLOSSUS
          </h2>
          {/* Semi-transparent box for readability */}
          <div className="bg-black/90 p-6 md:p-8 rounded-xl border-y border-orange-500/30 backdrop-blur-md">
            <p className="text-lg md:text-3xl text-neutral-200 font-machine leading-relaxed">
              logics were now processed at greater speed. <br/>
              millions of calculation in seconds,  <span className="text-orange-400 font-bold glow-text">We only had to make it do reasoning</span>.
            </p>
          </div>
        </div>

        {/* SCENE 2: THE LEGACY */}
        <div ref={legacyTextRef} className="absolute w-full max-w-3xl px-6">
          <p className="text-xl md:text-4xl text-neutral-300 font-war leading-normal">
            The war ended. The machines were destroyed.
          </p>
          <div className="h-px w-32 bg-gray-700 mx-auto my-8"></div>
          <p className="text-base md:text-xl text-neutral-400 font-machine">
            But something continued: <br/>
            <span className="text-white italic text-lg md:text-2xl block mt-4">
              "A new era of computation and logical reasoning"
            </span>
          </p>
        </div>

        {/* SCENE 3: THE VERDICT */}
        <div ref={finalTextRef} className="absolute w-full max-w-5xl px-4">
          <p className="text-neutral-500 font-machine text-xs md:text-sm tracking-[0.5em] uppercase mb-8">
            Final Verdict
          </p>
          
          <h1 className="text-2xl md:text-6xl font-war text-white leading-tight">
            The first thinking machines were <br className="hidden md:block" /> imagined in peace...
          </h1>
          
          <h1 className="text-2xl md:text-6xl font-war text-red-600 mt-6 leading-tight drop-shadow-md">
            ...but the machines that made thinking possible <br className="hidden md:block" /> were forged in war.
          </h1>
          
          {/* Footer / Logo Area */}
          <div className="mt-16 md:mt-24 flex flex-col items-center gap-4">
             <img 
               src="/patrick-patrick-star.png" 
               className="w-70 h-70 md:w-30 md:h-30 object-contain" 
               alt="Logo" 
             />
             <a href="https://nimittsharma.online" className="font-machine text-sm md:text-lg text-neutral-400 hover:text-white transition-colors tracking-widest uppercase">
               nimittsharma.online
             </a>
             <p>
              end
             </p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default FinaleScrolly