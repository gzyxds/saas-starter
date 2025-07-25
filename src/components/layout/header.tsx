"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Dictionary } from '@/lib/dictionaries'
import { Locale } from '@/lib/i18n'
import LanguageSwitcher from '@/components/language-switcher'

interface HeaderProps {
  dict?: Dictionary
}

export function Header({ dict }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  
  // Extract current language from path
  const currentLang = (pathname.split('/')[1] || 'en') as Locale
  
  // Use default values if dict is not provided
  const siteInfo = dict?.site || {
    name: "EdgeOne Saas Starter"
  }
  const headerConfig = dict?.header || {
    navigation: [],
    cta: { text: "Get Started", href: "/pricing" }
  }

  // Add language prefix to navigation links
  const getLocalizedHref = (href: string) => {
    if (href === '/') {
      return `/${currentLang}`
    }
    return `/${currentLang}${href}`
  }

  // Check if link is current page
  const isActive = (href: string) => {
    const localizedHref = getLocalizedHref(href)
    if (href === '/') {
      // For homepage, need exact match to avoid false positives with other pages
      return pathname === localizedHref || pathname === `${localizedHref}/`
    }
    // For other pages, use startsWith matching
    return pathname.startsWith(localizedHref) && pathname !== `/${currentLang}` && pathname !== `/${currentLang}/`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={getLocalizedHref('/')} className="text-2xl font-bold text-primary">
              {siteInfo.name}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {headerConfig.navigation.map((item) => (
              <Link
                key={item.name}
                href={getLocalizedHref(item.href)}
                 className={`transition-colors duration-200 whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher currentLang={currentLang} dict={dict} />
            
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={dict?.common?.common?.toggleTheme || "Toggle theme"}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* CTA Button */}
            <Link
              href={getLocalizedHref(headerConfig.cta.href)}
              className="hidden md:inline-flex bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              {headerConfig.cta.text}
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {headerConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={getLocalizedHref(item.href)}
                  className={`transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary font-semibold bg-primary/10 px-3 py-2 rounded-md'
                      : 'text-foreground hover:text-primary px-3 py-2'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <LanguageSwitcher currentLang={currentLang} dict={dict} />
              </div>
              
              <Link
                href={getLocalizedHref(headerConfig.cta.href)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors text-center mt-4 whitespace-nowrap"
                onClick={() => setIsMenuOpen(false)}
              >
                {headerConfig.cta.text}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 