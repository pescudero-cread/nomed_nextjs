export default function HomeSimple() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">NOMED</h1>
        <p className="text-xl mb-8">Plataforma Educativa con IA</p>
        <div className="space-y-4">
          <a 
            href="/api/test" 
            className="block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Probar API
          </a>
          <a 
            href="/auth/signin" 
            className="block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  )
}
