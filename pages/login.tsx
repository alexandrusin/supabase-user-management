import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Nav } from '../components/Nav'
import { supabase } from '../lib/supabaseClient'

import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true)
      // const { error, user } = await supabase.auth.signIn({ email })
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      if (!error) {
        router.push('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const loginForm = () => {
    return (
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin(email, password)
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
        <div className="actions">
          <button
            type="submit"
            className="button primary-button fluid-width action"
            disabled={loading}
          >
            Login
          </button>
        </div>

        <Link href="/reset-password">
          <a>Ai uitat parola?</a>
        </Link>
      </form>
    )
  }

  return (
    <div className="login-page">
      <h1 className="headline4">Login</h1>
      <div className="content-section">{loginForm()}</div>
    </div>
  )
}
