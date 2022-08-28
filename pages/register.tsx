import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from 'lib/supabaseClient'

import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRegistration, setShowRegistration] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('model')
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)

  const handleRegister = async (
    email: string,
    password: string,
    type: string
  ) => {
    try {
      setLoading(true)
      // const { error, user } = await supabase.auth.signIn({ email })
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            type: type,
          },
        },
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
      setShowRegistration(false)
      // alert('Registered!')
      // router.push('/')
    }
  }

  return (
    <div className="register-page">
      <h1 className="headline3">ÎNREGISTRARE</h1>

      {showRegistration ? (
        <div className="content-section">
          <form
            className="register-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleRegister(email, password, type)
            }}
          >
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
              <div className="input-with-button">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <div
                  className="toggle-show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BiHide className="hide-icon" />
                  ) : (
                    <BiShow className="show-icon" />
                  )}
                </div>
              </div>
              <span className="caption text-grey">Minim 8 caractere</span>
            </div>

            <hr />
            <div className="input-group account-type">
              <div className="radio-wrapper">
                <input
                  id="model"
                  type="radio"
                  name="type"
                  value={type}
                  checked={type === 'model'}
                  onChange={(e) => setType('model')}
                />
                <label htmlFor="model">Model</label>
              </div>
              <div className="radio-wrapper">
                <input
                  id="client"
                  type="radio"
                  name="type"
                  value={type}
                  checked={type === 'client'}
                  onChange={(e) => setType('client')}
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
                className="primary-button fluid-width action"
                disabled={loading}
              >
                REGISTER
              </button>
            </div>
            <span className="caption text-grey">accoutn-type is {type}</span>
          </form>
        </div>
      ) : (
        <div className="content-section">
          <span className="body1">Verifica-ti email-ul!</span>
          <span className="body1">
            Am trimis un mesaj la {email} cu un link pentru a vă activa contul.
          </span>
          <span className="caption text-grey">
            Nu ai primit un e-mail? Verificați folderul de spam!
          </span>
        </div>
      )}
    </div>
  )
}
