"use client"

import { useState, useEffect } from "react"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glitchItem, setGlitchItem] = useState<string | null>(null)

  const navItems = [
    { id: "home", label: "00_TRANG_CHỦ" },
    { id: "about", label: "01_GIỚI_THIỆU" },
    { id: "poster", label: "02_POSTER" },
    { id: "video", label: "03_VIDEO" },
    { id: "members", label: "04_THÀNH_VIÊN" },
    { id: "contract", label: "05_HỢP_ĐỒNG" },
    { id: "contact", label: "06_LIÊN_HỆ" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 100

      for (const sectionId of [...sections].reverse()) {
        const element = document.getElementById(sectionId)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const handleMouseEnter = (id: string) => {
    setGlitchItem(id)
  }

  const handleMouseLeave = () => {
    setGlitchItem(null)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono`}
      style={{
        backgroundColor: "rgba(10, 10, 10, 0.95)",
        borderBottom: "2px solid transparent",
        borderImage:
          "repeating-linear-gradient(90deg, #550000 0px, #550000 8px, transparent 8px, transparent 12px, #550000 12px, #550000 20px, transparent 20px, transparent 28px) 1",
      }}
      data-testid="header-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="hidden md:block">
            <img src="/images/afterglow-logo.png" alt="Afterglow" className="h-32 w-auto mix-blend-lighten" />
          </div>

          <nav className="hidden md:flex items-center justify-center flex-1 gap-1" data-testid="nav-desktop">
            {navItems.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <button
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative text-xs tracking-wider px-3 py-2 uppercase transition-all duration-200 ease-out
                    ${activeSection === item.id ? "nav-item-active" : "nav-item-default"}
                    ${glitchItem === item.id ? "nav-item-glitch" : ""}
                    hover:scale-105 active:scale-100
                  `}
                  style={{
                    color: activeSection === item.id ? "#ff0000" : glitchItem === item.id ? "#ffcc00" : "#a0a0a0",
                    textShadow:
                      activeSection === item.id ? "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000" : "none",
                    transform:
                      glitchItem === item.id
                        ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`
                        : "none",
                  }}
                  data-testid={`nav-link-${item.id}`}
                >
                  {activeSection === item.id ? `[ ${item.label} ]` : item.label}
                </button>
                {index < navItems.length - 1 && (
                  <span className="text-[10px] mx-1" style={{ color: "#444" }}>
                    //
                  </span>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:block w-20"></div>

          <button
            className="md:hidden px-3 py-2 text-xs tracking-wider uppercase transition-all duration-200 ease-out hover:bg-[#550000]/20 active:bg-[#550000]/30"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              color: "#a0a0a0",
              border: "1px dashed #550000",
            }}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? "[X]_CLOSE" : "[=]_MENU"}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden animate-fadeIn"
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.98)",
            borderTop: "1px dashed #550000",
          }}
          data-testid="nav-mobile-menu"
        >
          <nav className="px-4 py-4 space-y-1">
            <div className="mb-3 pb-2" style={{ borderBottom: "1px dashed #333" }}>
              <img src="/images/afterglow-logo.png" alt="Afterglow" className="h-20 w-auto mix-blend-lighten" />
            </div>
            {navItems.map((item, index) => (
              <button
                key={item.id}
                className={`w-full text-left py-2 px-3 text-xs tracking-wider uppercase transition-all duration-200 ease-out hover:bg-[#550000]/10 active:bg-[#550000]/20`}
                onClick={() => scrollToSection(item.id)}
                style={{
                  color: activeSection === item.id ? "#ff0000" : "#a0a0a0",
                  textShadow: activeSection === item.id ? "0 0 10px #ff0000" : "none",
                  borderLeft: activeSection === item.id ? "2px solid #ff0000" : "2px solid transparent",
                }}
                data-testid={`nav-mobile-link-${item.id}`}
              >
                {activeSection === item.id ? `> [ ${item.label} ]` : `> ${item.label}`}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
