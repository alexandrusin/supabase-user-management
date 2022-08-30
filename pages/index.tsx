import Auth from '../components/Auth'
import Account from '../components/Account'
import ProfileList from '../components/ProfileList'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import { Profile } from '../lib/constants'
import Footer from '../components/Footer'
import { Nav } from '../components/Nav'

export default function Home() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>([])

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

  useEffect(() => {
    getPublicProfiles()
  }, [])

  async function getPublicProfiles() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'first_name, last_name, phone_number, user_type, avatar_url, updated_at, id, company, birthday'
        )
        .order('updated_at', { ascending: false })

      if (error || !data) {
        throw error || new Error('No data')
      }
      console.log('Public profiles:', data)
      setProfiles(data)
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error.message)
      }
    }
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        'Please Login to view profiles'
      ) : (
        <>
          <ProfileList profiles={profiles} />
        </>
      )}
    </div>
  )
}
