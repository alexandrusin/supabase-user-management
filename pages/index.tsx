import Auth from '../components/Auth'
import Account from '../components/Account'
import ProfileList from '../components/ProfileList'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import Welcome from '../components/Welcome'

export default function Home() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [welcome, setWelcome] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession()
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

  return <div style={{ padding: '50px 0 100px 0' }}>{!session && <Auth />}</div>
}

// <Welcome key={session.user.id} session={session} />
// <Account key={session.user.id} session={session} />
