// Tipado de opciones de configuración para NextAuth
import { NextAuthOptions } from 'next-auth'
// Proveedor de autenticación de Google (OAuth 2.0)
import GoogleProvider from 'next-auth/providers/google'

// Configuración reutilizable de NextAuth cuando se use con el App Router o adaptadores
export const authOptions: NextAuthOptions = {
  providers: [
    // Proveedor Google: requiere credenciales en variables de entorno
    GoogleProvider({
      // ID de cliente de Google (OAuth)
      clientId: process.env.GOOGLE_CLIENT_ID!,
      // Secreto de cliente de Google (OAuth)
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    // Restringe el acceso permitiendo solo emails de dominios específicos
    async signIn({ user, account, profile }) {
      const allowedDomains = ['@nomed.org', '@cread.org.pe']
      const userEmail = user.email || ''
      
      const isAllowed = allowedDomains.some(domain => userEmail.endsWith(domain))
      
      if (!isAllowed) {
        return false
      }
      
      return true
    },
    // Controla qué datos se envían al cliente dentro de la sesión
    async session({ session, token }) {
      return session
    },
    // Modifica el token JWT emitido por NextAuth (si es necesario)
    async jwt({ token, user }) {
      return token
    }
  },
  pages: {
    // Página personalizada de Sign In
    signIn: '/auth/signin',
    // Página personalizada de errores de autenticación
    error: '/auth/error',
  },
  session: {
    // Usa JWT para gestionar la sesión (sin base de datos)
    strategy: 'jwt',
  },
}
