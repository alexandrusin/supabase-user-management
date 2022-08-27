import React, { useEffect, useState } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { Profile } from '../lib/constants'
import Link from 'next/link'

export default function Welcome() {
  const [loading, setLoading] = useState<boolean>(true)
  const [session, setSession] = useState<AuthSession | null>(null)

  const firstName = session?.user?.user_metadata?.first_name
  const lastName = session?.user?.user_metadata?.last_name

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

    console.log('HELLO SESH', session)

    createProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function createProfile() {
    try {
      setLoading(true)
      const user = session?.user

      const updates = {
        id: user!.id,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {})

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>Welcome, {firstName}</div>
      <Link href="/">
        <a>Check your profile!</a>
      </Link>
    </>
  )
}
