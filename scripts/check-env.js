#!/usr/bin/env node

// Script para verificar variables de entorno
const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
]

const optionalEnvVars = [
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
  'GOOGLE_CHAT_WEBHOOK',
  'OPENAI_API_KEY'
]

console.log('🔍 Verificando variables de entorno...\n')

let hasErrors = false

// Verificar variables requeridas
console.log('📋 Variables requeridas:')
requiredEnvVars.forEach(varName => {
  const value = process.env[varName]
  if (!value) {
    console.log(`❌ ${varName}: NO CONFIGURADA`)
    hasErrors = true
  } else {
    const maskedValue = varName.includes('SECRET') || varName.includes('KEY') 
      ? '*'.repeat(8) 
      : value
    console.log(`✅ ${varName}: ${maskedValue}`)
  }
})

console.log('\n📋 Variables opcionales:')
optionalEnvVars.forEach(varName => {
  const value = process.env[varName]
  if (!value) {
    console.log(`⚠️  ${varName}: NO CONFIGURADA (opcional)`)
  } else {
    const maskedValue = varName.includes('SECRET') || varName.includes('KEY') 
      ? '*'.repeat(8) 
      : value
    console.log(`✅ ${varName}: ${maskedValue}`)
  }
})

if (hasErrors) {
  console.log('\n❌ Error: Faltan variables de entorno requeridas')
  console.log('💡 Configura las variables en el dashboard de Vercel o en tu archivo .env.local')
  process.exit(1)
} else {
  console.log('\n✅ Todas las variables requeridas están configuradas')
}
