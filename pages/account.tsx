import { useState, useEffect, ChangeEvent } from 'react'
import { supabase } from '../lib/supabaseClient'
import UploadButton from 'components/UploadButton'
import Avatar from 'components/Avatar'
import { AuthSession } from '@supabase/supabase-js'
import { DEFAULT_AVATARS_BUCKET, Profile } from '../lib/constants'

export default function Account() {
  const [loading, setLoading] = useState<boolean>(true)
  const [uploading, setUploading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)

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

    console.log('HELLO SESH', session)
    getProfile()
  }, [])

  useEffect(() => {
    setFirstName(session?.user?.user_metadata?.first_name)
    setLastName(session?.user?.user_metadata?.last_name)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const { user } = session
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${session?.user.id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      let { error: updateError } = await supabase.from('profiles').upsert({
        id: user!.id,
        avatar_url: filePath,
      })

      if (updateError) {
        throw updateError
      }

      setAvatar(null)
      setAvatar(filePath)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setUploading(false)
    }
  }

  function setProfile(profile: Profile) {
    setAvatar(profile.avatar_url)
    setUsername(profile.username)
    setWebsite(profile.website)
    setFirstName(profile.first_name)
    setLastName(profile.last_name)
  }

  async function getProfile() {
    const superuser = await supabase.auth.getUser()
    console.log('IS THIS THE DATA?', superuser)

    try {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(
          `username, first_name, last_name, website, avatar_url, updated_at, id`
        )
        .eq('id', user!.id)
        .single()

      if (error) {
        console.error(error)
        throw error
      }

      if (data) setProfile(data)
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user!.id,
        username,
        website,
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
    <div className="account">
      <div>
        <label htmlFor="avatar">Avatar image</label>
        <div className="avatarField">
          <div className="avatarContainer">
            {avatar ? (
              <Avatar url={avatar} size={35} />
            ) : (
              <div className="avatarPlaceholder">?</div>
            )}
          </div>
          <UploadButton onUpload={uploadAvatar} loading={uploading} />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName || ''}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
