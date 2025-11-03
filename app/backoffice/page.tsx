import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import BackofficePage from '@/components/BackofficePage'

export default async function Backoffice() {
  const session = await getServerSession()
  
  // Verificar autenticación y dominio
  if (!session?.user?.email) {
    redirect('/api/auth/signin')
  }
  
  const allowedDomains = ['@nomed.org', '@cread.org.pe']
  const isAllowed = allowedDomains.some(domain => session.user?.email?.endsWith(domain))
  
  if (!isAllowed) {
    redirect('/auth/unauthorized')
  }

  return <BackofficePage />
}
