import ProfileList from 'components/ProfileList'
import ShowcaseCategories from 'components/ShowcaseCategories'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Profile } from 'lib/constants'
import { supabase } from 'lib/supabaseClient'

const Models: NextPage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    getPublicProfiles()
  }, [])

  async function getPublicProfiles() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'id, username, first_name, last_name, avatar_url, website, updated_at'
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
    <div className="models-page">
      <ProfileList profiles={profiles} />
      <ShowcaseCategories />
    </div>
  )
}

export default Models
