import { useState, useEffect } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import { supabase } from 'lib/supabaseClient'
import Auth from 'components/Auth'
import Account from 'components/Account'
import { Nav } from 'components/Nav'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login')
      }
      return data
    }

    fetchData()
      .then(({ session }) => {
        setSession(session)
      })
      .catch((error) => {
        console.log(error)
      })

    supabase.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        setSession(session)
      }
    )
  }, [])

  return (
    <div className="account-page">
      <h1 className="headline4">Account</h1>
      <div className="content-section">
        {session ? (
          <Account key={session.user.id} session={session} />
        ) : (
          'Please Login'
        )}
      </div>
    </div>
  )
}
