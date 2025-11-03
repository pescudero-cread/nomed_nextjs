'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  const navigation = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-nomed-primary rounded-lg flex items-center justify-center ring-1 ring-nomed-primary-bright">
              <span className="text-gray-900 font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">NOMED</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-nomed-secondary transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={session.user?.image || '/images/default-avatar.png'}
                      alt={session.user?.name || 'Usuario'}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">
                      {session.user?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-700 hover:text-nomed-secondary transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                  {session.user?.email?.endsWith('@nomed.org') || 
                   session.user?.email?.endsWith('@cread.org.pe') ? (
                    <Link
                      href="/backoffice"
                      className="bg-nomed-primary text-gray-900 px-4 py-2 rounded-lg border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors"
                    >
                      Backoffice
                    </Link>
                  ) : null}
                </div>
              ) : (
                <button
                  onClick={() => signIn('google')}
                  className="bg-nomed-primary text-gray-900 px-6 py-2 rounded-lg border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-nomed-secondary transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-nomed-secondary transition-colors font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {session ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={session.user?.image || '/images/default-avatar.png'}
                        alt={session.user?.name || 'Usuario'}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-700">
                        {session.user?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="text-gray-700 hover:text-nomed-secondary transition-colors text-left"
                    >
                      Cerrar Sesión
                    </button>
                    {session.user?.email?.endsWith('@nomed.org') || 
                     session.user?.email?.endsWith('@cread.org.pe') ? (
                      <Link
                        href="/backoffice"
                        className="bg-nomed-primary text-gray-900 px-4 py-2 rounded-lg border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors text-center"
                      >
                        Backoffice
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <button
                    onClick={() => signIn('google')}
                    className="bg-nomed-primary text-gray-900 px-6 py-2 rounded-lg border border-nomed-primary-bright hover:bg-nomed-primary-bright transition-colors w-full"
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
