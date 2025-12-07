"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface TeamMember {
  name: string
  role: string
  email?: string
  social?: { type: string; url: string }[]
}

interface Tilt3D {
  x: number
  y: number
}

export function TeamMembersSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [cardTilts, setCardTilts] = useState<{ [key: number]: Tilt3D }>({})
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const teamMembers: TeamMember[] = [
    {
      name: "Trần Ngọc Dũng",
      role: "Trưởng nhóm",
      social: [
        { type: "facebook", url: "#" },
        { type: "mail", url: "#" },
      ],
    },
    {
      name: "Ngô Đại Thiên Phúc",
      role: "Chỉnh sửa video",
      social: [
        { type: "facebook", url: "#" },
        { type: "mail", url: "#" },
      ],
    },
    {
      name: "Trần Nguyễn Hoàng Huy",
      role: "Website",
      social: [
        { type: "facebook", url: "#" },
        { type: "mail", url: "#" },
      ],
    },
    {
      name: "Từ Nguyễn Thuận Thiên",
      role: "Kịch bản",
      social: [
        { type: "facebook", url: "#" },
        { type: "mail", url: "#" },
      ],
    },
    {
      name: "Võ Đăng Khôi",
      role: "Kịch bản",
      social: [
        { type: "facebook", url: "#" },
        { type: "mail", url: "#" },
      ],
    },
  ]

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height

    setCardTilts((prev) => ({
      ...prev,
      [index]: { x: y * 15, y: -x * 15 },
    }))
  }

  const handleCardMouseLeave = (index: number) => {
    setCardTilts((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 },
    }))
  }

  return (
    <section id="members" ref={ref} className="py-20 bg-background" data-testid="section-members">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="limbus-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-members-title"
            >
              [THÀNH_VIÊN_NHÓM]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground font-mono ${isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"}`}
          >
            // ĐỘI_NGŨ_THÀNH_VIÊN_ĐẦY_NHIỆT_HUYẾT_VÀ_TẬN_TÂM
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => {
            const tilt = cardTilts[index] || { x: 0, y: 0 }
            return (
              <div key={index} className="perspective-1000 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className={`limbus-card p-6 text-center preserve-3d transition-all duration-250 ease-out ${
                    isVisible ? `animate-fadeInUp stagger-${index + 2}` : "opacity-0"
                  }`}
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hoveredCard === index ? 1.03 : 1})`,
                    transitionDuration: "250ms",
                  }}
                  onMouseMove={(e) => handleCardMouseMove(e, index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => {
                    setHoveredCard(null)
                    handleCardMouseLeave(index)
                  }}
                  data-testid={`card-member-${index}`}
                >
                  <div className="relative inline-block mb-4">
                    <div
                      className={`w-24 h-24 border border-primary/30 mx-auto flex items-center justify-center transition-all duration-250 ease-out ${
                        hoveredCard === index
                          ? "scale-110 border-primary shadow-[0_0_15px_rgba(138,0,0,0.3)]"
                          : "scale-100"
                      }`}
                    >
                      <span className="text-4xl text-primary font-mono">▣</span>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-semibold mb-2 font-mono uppercase tracking-wider"
                    data-testid={`text-member-name-${index}`}
                  >
                    {member.name}
                  </h3>
                  <p className="text-primary font-mono text-sm mb-4 uppercase">{member.role}</p>

                  {member.social && (
                    <div className="flex justify-center gap-3">
                      {member.social.map((social, sIndex) => (
                        <a
                          key={sIndex}
                          href={social.url}
                          className="w-10 h-10 flex items-center justify-center border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(138,0,0,0.25)] active:translate-y-0"
                          data-testid={`link-social-${index}-${sIndex}`}
                        >
                          <span className="text-sm font-mono text-primary">
                            {social.type === "facebook" ? "f" : "✉"}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
