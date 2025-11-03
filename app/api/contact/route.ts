// Tipos y utilidades para crear respuestas en el App Router
import { NextRequest, NextResponse } from 'next/server'

// Recibe mensajes del formulario de contacto y opcionalmente notifica a Google Chat
export async function POST(request: NextRequest) {
  try {
    const { subject, description, email, phone } = await request.json()

    // Validar campos requeridos
    if (!subject || !description || !email || !phone) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Por ahora, solo registrar el mensaje (no se envía email)
    console.log('Nuevo mensaje de contacto:', {
      subject,
      email,
      phone,
      description,
      timestamp: new Date().toISOString()
    })

    // Enviar a Google Chat si está configurado el webhook
    if (process.env.GOOGLE_CHAT_WEBHOOK) {
      try {
        const chatMessage = {
          text: `🔔 *Nuevo mensaje de contacto*\n\n*Asunto:* ${subject}\n*Email:* ${email}\n*Teléfono:* ${phone}\n*Descripción:* ${description}`,
        }

        await fetch(process.env.GOOGLE_CHAT_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chatMessage),
        })
      } catch (chatError) {
        console.error('Error enviando a Google Chat:', chatError)
      }
    }

    return NextResponse.json(
      { message: 'Mensaje recibido correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al procesar mensaje:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
