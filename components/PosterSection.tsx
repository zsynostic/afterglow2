"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function PosterSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!posterRef.current) return
    const rect = posterRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setTilt({ x: y * 10, y: -x * 10 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <section id="poster" ref={ref} className="py-20 bg-background" data-testid="section-poster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="limbus-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-poster-title"
            >
              [POSTER_DỰ_ÁN]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto font-mono ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
          >
            // KHÁM_PHÁ_PHÁT_HIỆN_VỀ_SỰ_THIẾU_HIỂU_BIẾT
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`perspective-1000 w-full max-w-4xl ${isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"}`}
          >
            <div
              ref={posterRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className="relative preserve-3d transition-transform duration-300"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
              data-testid="poster-3d-container"
            >
              <div
                className={`relative overflow-hidden limbus-card transition-all duration-300 ${
                  isHovered
                    ? "border-2 border-[#8a0000] shadow-[0_0_20px_rgba(138,0,0,0.5)]"
                    : "border border-[#8a0000]/50"
                }`}
                style={{
                  animation: isHovered ? "posterGlitch 0.3s ease-in-out" : "none",
                }}
              >
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Research Poster"
                  className={`w-full h-auto transition-all duration-500 ${isHovered ? "grayscale-0" : "grayscale"}`}
                  style={{
                    filter: isHovered ? "none" : "grayscale(100%)",
                    animation: isHovered ? "imageGlitch 0.5s ease-in-out" : "none",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 font-mono text-xs text-muted-foreground">
                  [IMG_REF: POSTER_001]
                </div>

                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, rgba(138,0,0,0.03) 0px, rgba(138,0,0,0.03) 1px, transparent 1px, transparent 2px)",
                      animation: "scanlines 0.1s linear infinite",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={`mt-8 ${isVisible ? "animate-fadeInUp stagger-3" : "opacity-0"}`}>
            <button className="limbus-button" data-testid="button-download-poster">
              [TẢI_POSTER]
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes posterGlitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes imageGlitch {
          0% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(10% 0 60% 0); }
          20% { clip-path: inset(40% 0 30% 0); }
          30% { clip-path: inset(80% 0 5% 0); }
          40% { clip-path: inset(20% 0 60% 0); }
          50% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
      `}</style>
    </section>
  )
}
