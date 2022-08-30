import { useState, useEffect, ChangeEvent } from 'react'
import { supabase } from '../lib/supabaseClient'
import UploadButton from '../components/UploadButton'
import Avatar from './Avatar'
import { AuthSession } from '@supabase/supabase-js'
import { DEFAULT_AVATARS_BUCKET, Profile } from '../lib/constants'

import { FaUserCircle } from 'react-icons/fa'

export default function Account({ session }: { session: AuthSession }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [uploading, setUploading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState<string | undefined>(undefined)
  const [company, setCompany] = useState<string | undefined>(undefined)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userType, setUserType] = useState('')

  useEffect(() => {
    console.log('HELLO SESH', session)

    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    return () => {
      // This is the cleanup function
    }
  }, [])

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
    setFirstName(profile.first_name)
    setLastName(profile.last_name)
    setPhoneNumber(profile.phone_number)
    setUserType(profile.user_type)
    setCompany(profile.company)
    setBirthday(profile.birthday)
  }

  async function getProfile() {
    try {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(
          `first_name, last_name, phone_number, user_type, avatar_url, updated_at, id, company, birthday`
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
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        company: company,
        birthday: birthday,
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

  const userAvatarForm = () => {
    return (
      <div className="avatar-form">
        {avatar ? (
          <Avatar url={avatar} size={150} />
        ) : (
          <div className="avatar_placeholder">
            <FaUserCircle />
          </div>
        )}
        <UploadButton onUpload={uploadAvatar} loading={uploading} />
      </div>
    )
  }

  const userDetailsForm = () => {
    return (
      <form
        className="account-form"
        onSubmit={(e) => {
          e.preventDefault()
          updateProfile()
        }}
      >
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={session.user.email} disabled />
        </div>
        <div className="input-wrapper">
          <label htmlFor="firstName">Prenume</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Nume</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="phone">Telefon</label>
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <hr />

        {userType === 'model' && (
          <div className="input-wrapper">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
        )}

        {userType === 'client' && (
          <div className="input-wrapper">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              value={company || ''}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        )}

        <hr />
        <div className="actions">
          <button
            type="submit"
            className="button primary-button fluid-width action"
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
          <button
            className="button secondary-button fluid-width action"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
      </form>
    )
  }

  return (
    <>
      {'Welcome, ' + firstName + ' (' + userType + ')'}
      <hr />
      {userAvatarForm()}
      <hr />
      {userDetailsForm()}
    </>
  )
}
