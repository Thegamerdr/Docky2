'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { AuthStatus } from '@/components/AuthStatus'
import { useTheme } from '@/components/ThemeProvider'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <Container>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:+1234567890" className="flex items-center hover:text-accent transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                <span>1-234-567-890</span>
              </a>
              <a href="mailto:contact@example.com" className="flex items-center hover:text-accent transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@example.com</span>
              </a>
            </div>
            <Button variant="ghost" className="text-primary-foreground hover:text-accent">
              Get a Free Fragrance Consultation
            </Button>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Perfume<span className="text-primary">Market</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/discover" className="hover:text-primary transition-colors">
                Discover
              </Link>
              <Link href="/brands" className="hover:text-primary transition-colors">
                Brands
              </Link>
              <Link href="/collections" className="hover:text-primary transition-colors">
                Collections
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/browse" className="text-sm font-medium">
                  Browse as Guest
                </Link>
                <AuthStatus />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </nav>
          </div>
        </Container>
      </div>
    </header>
  )
}

