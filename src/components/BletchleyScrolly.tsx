import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const BletchleyScrolly = () => {
  const sectionRef = useRef(null)
  
  // Visual Elements Refs
  const bgRef = useRef(null)
  const turingRef = useRef(null)
  const enigmaRef = useRef(null)
  const germanSoldiersRef = useRef(null) // <--- Added Ref for Soldiers

  // Text Blocks Refs
  const introRef = useRef(null)
  const enigmaInfoRef = useRef(null)
  const turingInfoRef = useRef(null)
  const missionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. SETUP: Hide everything initially
      // We use a safe 'centered' class in CSS, but GSAP handles the opacity/Y
      const textGroups = [introRef.current, enigmaInfoRef.current, turingInfoRef.current, missionRef.current]
      
      gsap.set(textGroups, { opacity: 0, y: 30 })
      
      // Images setup
      gsap.set(turingRef.current, { xPercent: 100, opacity: 0 }) 
      gsap.set(enigmaRef.current, { scale: 0.8, opacity: 0 })
      gsap.set(germanSoldiersRef.current, { opacity: 0, scale: 1.1 }) // Soldiers start slightly zoomed in

      const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=350%", // Longer scroll for reading 4 chapters
    scrub: 1,
    pin: true,
  }
})

      // --- CHAPTER 1: THE GATHERING ---
      tl.to(introRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(introRef.current, { opacity: 0, y: -20, duration: 1, delay: 2 })

      // --- CHAPTER 2: THE NAZI CODES ---
      // Fade in Soldiers (Background) & Enigma (Midground)
      .to([germanSoldiersRef.current, enigmaRef.current], { opacity: 0.5, scale: 1, duration: 1 }, "<") 
      // Show Text
      .to(enigmaInfoRef.current, { opacity: 1, y: 0, duration: 1 })
      // Hold... then fade everything out
      .to(enigmaInfoRef.current, { opacity: 0, y: -20, duration: 1, delay: 3 })
      .to([germanSoldiersRef.current, enigmaRef.current], { opacity: 0, duration: 1 }, "<")

      // --- CHAPTER 3: THE OUTSIDER (Turing) ---
      // Slide Turing in
      .to(turingRef.current, { xPercent: 0, opacity: 1, duration: 1.5, ease: "power2.out" })
      .to(turingInfoRef.current, { opacity: 1, y: 0, duration: 1 }, "<+=0.5") 
      .to(turingInfoRef.current, { opacity: 0, y: -20, duration: 1, delay: 3 })

      // --- CHAPTER 4: THE MISSION ---
      // Fade out Turing as Mission text appears
      .to(turingRef.current, { xPercent: 100, opacity: 0, duration: 1.5 }, "<")
      .to(missionRef.current, { opacity: 1, y: 0, duration: 1 }, "<") // Overlap slightly
      .to(missionRef.current, { opacity: 0, y: -20, duration: 1, delay: 2 })

      // Background Breathe
      gsap.to(bgRef.current, {
        scale: 1.1,
        filter: "grayscale(100%)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 3
        }
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-neutral-900 text-white overflow-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 w-full h-screen overflow-hidden">
        <img
          ref={bgRef}
          src="/ww2/bletchley_huts.jpg"
          alt="Bletchley Park Huts"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" />
      </div>

      {/* --- VISUALS LAYER --- */}
      <div className="absolute inset-0 w-full h-screen pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* GERMAN SOLDIERS (Background for Chap 2) */}
        <div ref={germanSoldiersRef} className="absolute inset-0 z-0">
             <img 
               src="/ww2/german_working.jpeg" 
               alt="German Soldiers" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0"></div> {/* Darken it so text pops */}
        </div>

        {/* ENIGMA GLOW (Chap 2) */}
        <div ref={enigmaRef} className="absolute z-10 opacity-0">
           <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-red-900/30 blur-3xl"></div>
           {/* If you have the enigma GLB/PNG, uncomment below */}
           {/* <img src="/ww2/enigma.png" className="w-64 md:w-96 drop-shadow-2xl" /> */}
        </div>

        {/* TURING (Chap 3) */}
        <img
          ref={turingRef}
          src="/ww2/turing.png"
          alt="Alan Turing"
          className="
            absolute bottom-0 right-0 z-20
            w-[80vw] md:w-[40vw] max-w-[500px]
            object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]
          "
        />
      </div>

      {/* --- TEXT CONTENT LAYER --- */}
      {/* LAYOUT FIX: instead of centering everything with GSAP, we use a full-screen grid.
          This ensures alignment is handled by CSS (better for mobile).
      */}
      <div className="absolute inset-0 w-full h-screen pointer-events-none z-30 flex flex-col items-center justify-center px-4 md:px-0">

          {/* CHAPTER 1: THE GATHERING */}
          <div ref={introRef} className="absolute w-full max-w-4xl px-6 flex flex-col gap-6">
            <div className="border-l-4 border-yellow-600 pl-6">
              <h2 className="text-4xl md:text-6xl font-war text-yellow-500 mb-2">Bletchley Park, Buckinghamshire</h2>
              <p className="font-machine text-xs md:text-sm text-yellow-600 tracking-widest uppercase">A place away from war</p>
            </div>
            <p className="text-lg md:text-2xl text-neutral-300 font-machine leading-relaxed bg-black/80 p-6 rounded-lg backdrop-blur-sm border border-neutral-800">
              Various Scientists, Mathematicians, <span className="text-white font-bold">crossword champions and chess masters were summoned</span>.
              <br/>Their job: find a pattern similar to the Nazi encrypted codes.
            </p>
          </div>

          {/* CHAPTER 2: THE NAZI CODES */}
          <div ref={enigmaInfoRef} className="absolute w-full max-w-4xl px-4 flex flex-col items-center text-center gap-6">
            <h2 className="text-5xl md:text-8xl font-war text-red-600 drop-shadow-2xl">THE CODES</h2>
            <div className="bg-black/90 p-6 md:p-8 rounded-xl border border-red-900/50 backdrop-blur-md w-full">
              <p className="text-lg md:text-2xl text-neutral-200 font-machine leading-relaxed text-left">
                The Enigma Machine had <strong>159 million</strong> possible settings, Meaning each time a letter "N" can encrypt to any character.
              </p>
              <div className="mt-4 bg-red-900/20 p-4 rounded border border-red-900/30 text-left">
                <p className="text-sm text-red-400 font-bold uppercase mb-1">The Rule</p>
                <p className="text-sm md:text-base text-neutral-300">
                  The Germans reset the machine every midnight. The British had 24 hours to break an unbreakable code before it changed again.
                </p>
              </div>
            </div>
          </div>

          {/* CHAPTER 3: THE OUTSIDER */}
          {/* ALIGNMENT FIX: Positioned Top-Left on Mobile, Left-Center on Desktop */}
          <div ref={turingInfoRef} className="absolute w-full max-w-6xl px-6 md:px-12 flex justify-start top-[15%] md:top-auto">
            <div className="max-w-xl md:max-w-2xl bg-black/70 p-6 rounded-xl border-l-4 border-blue-500 backdrop-blur-md">
              <h2 className="text-4xl md:text-6xl font-war text-blue-400 mb-4">THE OUTSIDER</h2>
              <p className="text-base md:text-xl text-neutral-300 font-machine leading-relaxed space-y-4">
                Enters <strong> Sir Alan Turing</strong>.
                <br/><br/>
               A Socially awkward, Shy, Computer Scientist. While others looked for patterns, Turing looked for <span className="text-blue-200 font-bold">mathematical flaws</span>.
                <br/><br/>
                <span className="text-sm text-neutral-500 italic">"I am not interested in winning the war. I am interested in solving the problem."</span>
              </p>
            </div>
          </div>

          {/* CHAPTER 4: THE MISSION */}
          <div ref={missionRef} className="absolute w-full max-w-3xl px-6 text-center">
            <div className="bg-neutral-800/90 p-8 rounded-2xl shadow-2xl border border-neutral-600">
              <p className="text-lg md:text-2xl text-neutral-200 font-machine leading-relaxed mb-6">
                Turing realized a fundamental truth that changed history:
              </p>
              <h3 className="text-2xl md:text-4xl text-white font-bold font-machine leading-tight">
                To fight a machine, <br/>
                <span className="text-amber-500">you need a machine, that "Thinks".</span>
              </h3>
            </div>
          </div>

      </div>
    </section>
  )
}

export default BletchleyScrolly