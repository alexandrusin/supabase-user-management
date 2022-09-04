import { useState, useEffect, ChangeEvent } from 'react'
import { supabase } from '../lib/supabaseClient'
import UploadButton from '../components/UploadButton'
import Avatar from './Avatar'
import { AuthSession } from '@supabase/supabase-js'
import {
  DEFAULT_AVATARS_BUCKET,
  Profile,
  ClientProfile,
  ModelProfile,
} from '../lib/constants'

import { FaUserCircle } from 'react-icons/fa'

export default function Account({ session }: { session: AuthSession }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [uploading, setUploading] = useState<boolean>(false)

  const [avatar, setAvatar] = useState<string | null>(null)
  const [userType, setUserType] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  const [birthday, setBirthday] = useState<string | undefined>(undefined)
  const [gender, setGender] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [measurements, setMeasurements] = useState('')
  const [eyeColor, setEyeColor] = useState('')
  const [hairColor, setHairColor] = useState('')
  const [skinColor, setSkinColor] = useState('')

  const [company, setCompany] = useState<string | undefined>(undefined)
  const [website, setWebsite] = useState<string | undefined>(undefined)

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

    // models
    setBirthday(profile.birthday)

    // clients
    setCompany(profile.company)
  }

  function setModelProfile(profile: ModelProfile) {
    setProfile(profile)
    setBirthday(profile.birthday)
  }

  function setClientProfile(profile: ClientProfile) {
    setProfile(profile)
    setCompany(profile.company)
    setCompany(profile.website)
  }

  async function getProfile() {
    try {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(
          `
          id,
          user_type,
          updated_at,
          avatar_url,
          first_name,
          last_name,
          phone_number,
          address,
          city,
          country,
          company,
          website,
          birthday,
          gender,
          weight,
          measurements,
          eye_color,
          hair_color,
          skin_color
          `
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

  async function updateModelProfile() {
    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user!.id,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        birthday: birthday,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('model_profiles').upsert(updates, {})

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

  async function updateClientProfile() {
    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user!.id,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        company: company,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('client_profiles').upsert(updates, {})

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

  const modelDetailsForm = () => {
    return (
      <>
        <div className="form-row">
          <div className="input-wrapper">
            <label htmlFor="birthday">Zi de naştere</label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="gender">Gen</label>
            <select
              name="gender"
              id="gender"
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Masculin</option>
              <option value="Female">Feminin</option>
              <option value="Other">Alt</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="form-row">
          <div className="input-wrapper">
            <label htmlFor="weight">Greutate</label>
            <div className="input-group">
              <input
                type="number"
                id="weight"
                value={weight}
                size={3}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <div className="input-suffix">kg</div>
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="height">Intaltime</label>
            <div className="input-group">
              <input
                type="number"
                id="height"
                value={height}
                size={3}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
              <div className="input-suffix">cm</div>
            </div>
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="measurements">Masuratori</label>
          <div className="input-group">
            <input
              type="text"
              id="measurements"
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              placeholder="Piept / Talie / Solduri"
              size={10}
              required
            />
            <div className="input-suffix">cm</div>
          </div>
          <span className="helper-text">Doar la persoanele peste 16 ani</span>
        </div>
        <hr />
        <div className="form-row">
          <div className="input-wrapper">
            <label htmlFor="eye_color">Culoare Ochi</label>
            <select
              name="eye_color"
              id="eye_color"
              required
              onChange={(e) => setEyeColor(e.target.value)}
            >
              <option value="green">Verde</option>
              <option value="blue">Albastru</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label htmlFor="hair_color">Culoare Par</label>
            <select
              name="hair_color"
              id="hair_color"
              required
              onChange={(e) => setHairColor(e.target.value)}
            >
              <option value="white">Alb</option>
              <option value="blond">Blond</option>
              <option value="black">Negru</option>
            </select>
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="skin_color">Culoare Piele</label>
          <select
            name="skin_color"
            id="skin_color"
            required
            onChange={(e) => setSkinColor(e.target.value)}
          >
            <option value="light">Deschisa</option>
            <option value="dark">Inchisa</option>
          </select>
        </div>
      </>
    )
  }

  const clientDetailsForm = () => {
    return (
      <>
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
        <div className="input-wrapper">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
      </>
    )
  }

  const userDetailsForm = () => {
    return (
      <form
        className="account-form"
        onSubmit={(e) => {
          e.preventDefault()
          updateModelProfile()
        }}
      >
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={session.user.email} disabled />
          <span className="helper-text">
            Email cannot be edited. You can submit a request <u>here</u>.
          </span>
        </div>
        <div className="form-row">
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
        <div className="input-wrapper">
          <label htmlFor="address">Adresa</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <div className="input-wrapper">
            <label htmlFor="city">Oras</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="country">Tara</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>
        <hr />

        {userType === 'model' && modelDetailsForm()}
        {userType === 'client' && clientDetailsForm()}

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
