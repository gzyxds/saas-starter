"use client"

import React from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { Dictionary } from '@/lib/dictionaries'

interface LayoutProps {
  children: React.ReactNode
  className?: string
  dict?: Dictionary
}

export function Layout({ children, className = '', dict }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Header dict={dict} />
      <main>
        {children}
      </main>
      <Footer dict={dict} />
    </div>
  )
} 