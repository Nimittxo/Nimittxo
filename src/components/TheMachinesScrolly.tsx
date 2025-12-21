import React, { useLayoutEffect, useRef, Suspense } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

// --- 3D MODEL COMPONENT ---
// This handles loading and displaying the GLB file
function EnigmaModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  // Load the model (ensure enigma.glb is in public/ww2/)
  const { scene } = useGLTF("/ww2/enigma_machine.glb")
  const modelRef = useRef<THREE.Group>(null)

  // Use GSAP's tick to smoothly rotate based on scroll progress
  useFrame(() => {
    if (modelRef.current) {
        // Rotate slowly on Y axis based on how far they scrolled down Stage A
        modelRef.current.rotation.y = scrollProgress.current * Math.PI * 2 * 0.2; 
    }
  })

  return <primitive 
            ref={modelRef} 
            object={scene} 
            scale={window.innerWidth < 1024 ? 1.8 : 2.5} // Adjust scale if your model is too big/small
            position={[0, -1, 0]} 
            rotation={[0.2, 0, 0]} // Slight initial tilt
         />
}


// --- MAIN SCROLLY COMPONENT ---
const TheMachinesScrolly = () => {
  const sectionRef = useRef(null)
  const scrollProgress = useRef(0) // To track scroll for 3D rotation

  // Stage Refs
  const stageARef = useRef(null) // Enigma Stage
  const stageBRef = useRef(null) // Bombe Stage

  // Bombe Animation Refs
  const bombeImgRef = useRef(null)
  const rotorsRef = useRef(null)
  const wiresRef = useRef(null)

  // Text Refs
  const textARef = useRef(null)
  const textBRef = useRef(null)
  const isMobile =
  typeof window !== "undefined" && window.innerWidth < 768



  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // INIT: Hide Stage B and texts
      gsap.set(stageBRef.current, { opacity: 0, zIndex: 0 })
      gsap.set([textARef.current, textBRef.current], { opacity: 0, y: 30 })
      gsap.set(".bombe-rotor", { rotation: 0 }) // Reset rotors

const masterTl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=200%", // 3 screens worth of scroll
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
      if(self.progress < 0.5) {
           scrollProgress.current = self.progress * 2; 
      }
    }
  }
})

      // --- STAGE A: THE ENIGMA (0% - 40%) ---
      masterTl
        .to(textARef.current, { opacity: 1, y: 0, duration: 1 })
        // Hold...
        .to(textARef.current, { opacity: 0, y: -20, duration: 1, delay: 1 })
        // Fade out 3D Stage
        .to(stageARef.current, { opacity: 0, scale: 0.9, duration: 2 }, "<")


      // --- STAGE B: THE BOMBE (50% - 100%) ---
      masterTl
        .fromTo(stageBRef.current, 
          { opacity: 0, scale: 1.1, zIndex: 20 }, 
          { opacity: 1, scale: 1, duration: 2 }, 
          "-=1" // Overlap slightly
        )
        .to(textBRef.current, { opacity: 1, y: 0, duration: 1 }, "<+=1")

      // --- BOMBE "WORKING" ANIMATION (Parallel) ---
      // This runs while Stage B is active
if (!isMobile) {
  const bombeTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "50% top",
      end: "bottom bottom",
      scrub: 1,
    }
  })

  bombeTl.to(".bombe-rotor", {
    rotation: 360 * 2,
    ease: "none",
    stagger: { each: 0.1, from: "random" }
  }, 0)

  bombeTl.fromTo(
    wiresRef.current,
    { opacity: 0.2 },
    { opacity: 0.6, repeat: 5, yoyo: true, ease: "rough" },
    0
  )
}


    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    // Tall section for a 2-part story
<section
  ref={sectionRef}
  className="relative h-screen bg-black text-white overflow-hidden"
>
       <div className="sticky top-0 h-screen w-full overflow-hidden">

         {/* ================= STAGE A: 3D ENIGMA ================= */}
        <div ref={stageARef} className="absolute inset-0 z-10">
  {!isMobile ? (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      camera={{ position: [0, 2, 6], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={100}
        color="#ff8c00"
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={50}
        color="#0040ff"
      />

      <Suspense fallback={null}>
        <EnigmaModel scrollProgress={scrollProgress} />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  ) : (
    <img
      src="/ww2/EnigmaMachineLabeled.jpg"
      alt="Enigma Machine"
      className="absolute inset-0 w-full h-full object-contain"
    />
  )}
</div>


         {/* Text A */}
         <div ref={textARef} className="absolute top-[15%] left-0 w-full flex justify-center z-30 pointer-events-none px-6">
            <div className="max-w-2xl text-center bg-black/70 p-6 rounded-xl border-t-2 border-red-600 backdrop-blur-md">
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-war">THE MECHANISM</h2>
              <p className="font-machine text-base sm:text-lg md:text-lg">
                The repeated changes of the electrical pathway from the keyboard <br/>
                to the lampboard implement a polyalphabetic substitution cipher 
              </p>
            </div>
         </div>


         {/* ================= STAGE B: THE BOMBE ================= */}
         <div ref={stageBRef} className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-500">
            
            {/* Base Image */}
            <img 
              ref={bombeImgRef}
              src="/ww2/turing_bombe.avif" 
              alt="Turing Bombe" 
              className="
    absolute bottom-[10%]
    w-full h-full
    object-contain
    md:object-contain
  "
            />
            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)]"></div>

         </div>

         {/* Text B */}
         <div ref={textBRef} className="absolute bottom-[1%] left-0 w-full flex justify-center z-30 pointer-events-none px-6">
            <div className="max-w-3xl text-center bg-amber-900/80 p-8 rounded-2xl shadow-2xl border-b-4 border-amber-500 backdrop-blur-md">
              <h2 className="text-4xl md:text-6xl font-war text-amber-400 mb-4">THE BOMBE</h2>
              <p className="font-machine text-xl text-white leading-relaxed">
                Turing's answer: an electromechanical machine that exploited known plaintext guesses (“cribs”).
              </p>
              <div className="h-px bg-amber-500/50 my-4"></div>
              <p className="font-machine text-lm text-amber-200">
                It spun dozens of Enigma rotors in reverse simultaneously, ruling out millions of incorrect settings every minute until it found the one true key.
              </p>
            </div>
         </div>

       </div>
    </section>
  )
}

export default TheMachinesScrolly