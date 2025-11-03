// Importa el núcleo de NextAuth para manejar autenticación en rutas del App Router
import NextAuth from 'next-auth'
// Importa el proveedor de autenticación de Google (OAuth 2.0)
import GoogleProvider from 'next-auth/providers/google'

// Configura y crea el handler de NextAuth
// Este handler responde a las solicitudes GET/POST en esta ruta dinámica [...nextauth]
const handler = NextAuth({
  providers: [
    // Proveedor de login con Google. Requiere credenciales en variables de entorno
    GoogleProvider({
      // ID de cliente de Google (OAuth). Debe estar definido en el entorno
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      // Secreto de cliente de Google (OAuth). Debe estar definido en el entorno
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  callbacks: {
    // Callback que se ejecuta al intentar iniciar sesión
    // Aquí restringimos el acceso por dominio de correo
    async signIn({ user }) {
      // Dominios permitidos para acceder a la aplicación
      const allowedDomains = ['@nomed.org', '@cread.org.pe']
      // Email del usuario autenticado por Google (puede venir undefined)
      const userEmail = user.email || ''

      // Verifica si el email termina con alguno de los dominios permitidos
      const isAllowed = allowedDomains.some(domain => userEmail.endsWith(domain))

      // Si no pertenece a un dominio permitido, se rechaza el inicio de sesión
      if (!isAllowed) {
        return false
      }

      // Si todo está bien, permite el inicio de sesión
      return true
    }
  },
  pages: {
    // Ruta personalizada para la página de inicio de sesión
    signIn: '/auth/signin',
    // Ruta personalizada para manejar y mostrar errores de autenticación
    error: '/auth/error',
  },
  session: {
    // Usa JWTs para mantener la sesión (en lugar de sesiones persistidas en DB)
    strategy: 'jwt',
  },
  // Secreto usado por NextAuth para firmar/encriptar JWTs y cookies
  secret: process.env.NEXTAUTH_SECRET,
})

// Exporta el handler para métodos GET y POST tal como requiere NextAuth en App Router
export { handler as GET, handler as POST }
