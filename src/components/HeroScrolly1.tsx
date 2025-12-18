import React from "react"

const spitfires = [
  "/spitfire.png",
  "/spitfire.png",
  "/spitfire.png",
]

const HeroScrolly1 = () => {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      
      {/* Spitfires layer */}
      <div className="absolute top-10 left-0 w-full flex justify-around opacity-70">
        {spitfires.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Spitfire"
            className="w-32 md:w-48"
          />
        ))}
      </div>

      {/* Hitler background image */}
      <img
        src="/hitler.png"
        alt="Hitler"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 w-[400px] md:w-[600px]"
      />

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 space-y-6">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide">
          THE WAR THAT FORCED THE FOUNDATIONS OF
          <br />
          ARTIFICIAL INTELLIGENCE
        </h1>

        <h2 className="text-neutral-300 text-lg md:text-xl max-w-3xl">
          The creation of machines that made intelligence computable
        </h2>

        <p className="text-neutral-400 text-sm tracking-widest uppercase">
          Scroll to begin
        </p>
      </div>

    </section>
  )
}

export default HeroScrolly1
