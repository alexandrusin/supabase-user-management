import { AuthSession } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function useUser() {
  const [session, setSession] = useState<AuthSession | null>(null)

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
  }, [supabase])
  return {
    session,
  }
}
