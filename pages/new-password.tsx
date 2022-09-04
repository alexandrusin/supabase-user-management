import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { supabase } from '../lib/supabaseClient'

import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'

export default function NewPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // const [hash, setHash] = useState('')
  // const accessToken = router.query.access_token as string

  // https://dev.to/nextdev/how-to-use-password-reset-api-in-supabase-auth-with-the-help-of-nextjs-3ifm

  useEffect(() => {
    // setHash(window.location.hash);
  }, [])

  const handleNewPassword = async (password: string) => {
    try {
      setLoading(true)

      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error
      alert('Changing Password!')
      if (!error) {
        router.push('/login')
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

  const newPasswordForm = () => {
    return (
      <form
        className="password-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleNewPassword(password)
        }}
      >
        <div className="input-wrapper">
          <label htmlFor="password">Parola Noua</label>
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
          <span className="helper-text">Minim 8 caractere</span>
        </div>
        <div className="actions">
          <button
            type="submit"
            className="button primary-button fluid-width action"
            disabled={loading}
          >
            Save New Password
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="new-password-page">
      <h1 className="headline4">Set New Password</h1>
      <div className="content-section">{newPasswordForm()}</div>
    </div>
  )
}
