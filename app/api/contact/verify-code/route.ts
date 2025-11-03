// Tipos y helpers para manejar requests del App Router
import { NextRequest, NextResponse } from 'next/server'

// Almacenar códigos temporalmente en memoria (solo desarrollo)
// En producción usar Redis u otra capa persistente/expirable
const verificationCodes = new Map<string, { code: string; expires: number }>()

// Verifica un código previamente generado para un email
export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json(
        { message: 'Email y código son requeridos' },
        { status: 400 }
      )
    }

    // Verificar existencia y expiración del código
    const storedData = verificationCodes.get(email)
    
    if (!storedData) {
      return NextResponse.json(
        { message: 'Código no encontrado o ha expirado' },
        { status: 400 }
      )
    }

    if (Date.now() > storedData.expires) {
      verificationCodes.delete(email)
      return NextResponse.json(
        { message: 'Código ha expirado' },
        { status: 400 }
      )
    }

    if (storedData.code !== code) {
      return NextResponse.json(
        { message: 'Código incorrecto' },
        { status: 400 }
      )
    }

    // Código válido: limpiar de almacenamiento temporal
    verificationCodes.delete(email)

    return NextResponse.json(
      { message: 'Código verificado correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al verificar código:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
