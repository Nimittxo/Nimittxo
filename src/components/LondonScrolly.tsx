import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    image: "/ww2/firstpara.jpg",
    text:
      "In the late summer of 1940, as World War II raged across Europe, the German Luftwaffe turned its bombing campaign toward the United Kingdom. London became the principal target."
  },
  {
    image: "/ww2/secondpara.jpg",
    text:
      "The Blitz began on 7 September 1940, when hundreds of bombers struck London and surrounding areas, beginning an assault that lasted more than eight months."
  },
  {
    image: "/ww2/thirdpara.jpg",
    text:
      "For 56 of 57 consecutive nights, London was bombed. Sirens, shelters, and fires became part of daily life as the city endured relentless attack."
  },
  {
    image: "/ww2/fourthpara.jpg",
    text:
      "More than 40,000 civilians across Britain were killed. Entire neighborhoods were destroyed — but London stood, and the war continued."
  },
  {
    image: "/ww2/fifthpara.jpg",
    text:
      "The only way the British could hope to counter the overwhelming strength of the Nazi air force was by breaking the communication codes that controlled how German pilots, bombers, and commanders coordinated their movements and attacks."
  }

]

const LondonScrolly = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const bgRef = useRef<HTMLImageElement | null>(null)
  const lightsRef = useRef<HTMLDivElement | null>(null)
  const slidesRef = useRef<HTMLDivElement[]>([])

  slidesRef.current = []

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // INITIAL STATE
      slidesRef.current.forEach(slide => {
        gsap.set(slide, { opacity: 0, y: 40 })
      })

      // MAIN TIMELINE
      const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=400%", // This creates the scroll distance (4x screen height)
    scrub: 1,
    pin: true,
  }
}) 

      slidesRef.current.forEach(slide => {
        tl.to(slide, { opacity: 1, y: 0, duration: 1 })
        tl.to(slide, { opacity: 1, duration: 1.2 }) // hold
        tl.to(slide, { opacity: 0, y: -40, duration: 1 })
      })

      // BACKGROUND SLOW BREATH
      gsap.to(bgRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 3
        }
      })

      // SEARCHLIGHT DRIFT
      gsap.to(lightsRef.current, {
        x: "12%",
        rotation: 10,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-black text-white overflow-hidden">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKGROUND */}
        <img
          ref={bgRef}
          src="/ww2/london_bg.jpg"
          alt="London during the Blitz"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-black/40" />

        {/* SEARCHLIGHTS */}
        <div
          ref={lightsRef}
          className="absolute inset-0 mix-blend-screen opacity-20 pointer-events-none origin-bottom"
        >
          <div className="absolute bottom-0 left-1/4 w-40 h-[140vh] bg-gradient-to-t from-white via-transparent to-transparent blur-3xl rotate-[-12deg]" />
          <div className="absolute bottom-0 right-1/4 w-40 h-[140vh] bg-gradient-to-t from-white via-transparent to-transparent blur-3xl rotate-[8deg]" />
        </div>

        {/* FOREGROUND SLIDES */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="relative w-full h-full">

            {slides.map((slide, i) => (
              <div
                key={i}
                ref={el => {
                  if (el) slidesRef.current[i] = el
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-8"
              >
                <img
                  src={slide.image}
                  alt="Blitz imagery"
                  className="w-[70%] max-w-2xl rounded-md shadow-2xl"
                />

                <p className="text-neutral-300 font-machine text-lg md:text-2xl leading-relaxed max-w-3xl">
                  {slide.text}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}

export default LondonScrolly
