import { useRouter } from 'next/router'
import { useState } from 'react'
import { Nav } from '../components/Nav'
import { supabase } from '../lib/supabaseClient'

import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { MdOutlineCheckCircle } from 'react-icons/md'

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userType, setUserType] = useState('model') // TODO: set this as a constant

  const [showPassword, setShowPassword] = useState(false)
  const [showEmailNotification, setShowEmailNotification] = useState(false)

  const handleRegister = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    userType: string
  ) => {
    try {
      setLoading(true)
      // const { error, user } = await supabase.auth.signIn({ email })
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            user_type: userType,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })
      if (error) throw error
      console.error(error)
      if (!error) {
        setShowEmailNotification(true)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
      // alert('Registered!')
      // router.push('/welcome')
    }
  }

  const registerForm = () => {
    return (
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleRegister(
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            userType
          )
        }}
      >
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Parola</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
            <div
              className="input-suffix toggle-show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BiHide className="hide-icon" />
              ) : (
                <BiShow className="show-icon" />
              )}
            </div>
          </div>
          <span className="helper-text">Minim 8 caractere</span>
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
        <div className="form-row account-type">
          <div className="radio-wrapper">
            <input
              id="model"
              type="radio"
              name="type"
              value={userType}
              checked={userType === 'model'}
              onChange={(e) => setUserType('model')}
            />
            <label htmlFor="model">Model</label>
          </div>
          <div className="radio-wrapper">
            <input
              id="client"
              type="radio"
              name="type"
              value={userType}
              checked={userType === 'client'}
              onChange={(e) => setUserType('client')}
            />
            <label htmlFor="client">
              Client
              <span className="caption">
                Fotograf, agenție de publicitate, producător de filme, etc
              </span>
            </label>
          </div>
        </div>
        <hr />
        <div className="actions">
          <button
            type="submit"
            className="button primary-button fluid-width action"
            disabled={loading || showEmailNotification}
          >
            {showEmailNotification ? <MdOutlineCheckCircle /> : 'REGISTER'}
          </button>
        </div>
      </form>
    )
  }

  const emailSentNotification = () => {
    return (
      <div className="email-notification">
        <span className="body1 text-primary">Verifica-ti email-ul!</span>
        <span className="body2">
          Am trimis un email la adresa <i>{email}</i> cu un link pentru a vă
          activa contul.
        </span>
        <span className="helper-text">
          Nu ai primit email-ul? Verificați folderul de spam!
        </span>
      </div>
    )
  }

  return (
    <div className="register-page">
      <h1 className="headline4">ÎNREGISTRARE</h1>
      <div className="content-section">
        {registerForm()}
        {showEmailNotification && emailSentNotification()}
      </div>
    </div>
  )
}
