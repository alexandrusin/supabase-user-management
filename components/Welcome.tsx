import React, { useEffect, useState } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { Profile } from '../lib/constants'
import Link from 'next/link'

export default function Welcome({ session }: { session: AuthSession }) {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
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
        first_name: session?.user?.user_metadata?.first_name,
        last_name: session?.user?.user_metadata?.last_name,
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
      <div>Welcome, {session?.user?.user_metadata?.last_name}</div>
      <Link href="/">
        <a>Check your profile!</a>
      </Link>
    </>
  )
}
