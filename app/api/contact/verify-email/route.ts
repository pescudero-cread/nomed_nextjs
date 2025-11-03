// Tipos y helpers para manejar requests del App Router
import { NextRequest, NextResponse } from 'next/server'

// Almacenar códigos temporalmente en memoria (solo desarrollo)
// En producción usar Redis u otra capa persistente/expirable
const verificationCodes = new Map<string, { code: string; expires: number }>()

// Genera y almacena un código de verificación para un email dado
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email es requerido' },
        { status: 400 }
      )
    }

    // Generar código de 6 dígitos y fecha de expiración
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 60000 // 60 segundos

    // Guardar código asociado al email
    verificationCodes.set(email, { code, expires })

    // Por ahora, solo registrar el código (no se envía email)
    console.log(`Código de verificación para ${email}: ${code}`)

    return NextResponse.json(
      { message: 'Código de verificación generado (modo desarrollo)' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al generar código de verificación:', error)
    return NextResponse.json(
      { message: 'Error al generar código de verificación' },
      { status: 500 }
    )
  }
}