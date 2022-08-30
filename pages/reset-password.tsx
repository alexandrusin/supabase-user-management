import { useRouter } from 'next/router'
import { useState } from 'react'
import { Nav } from '../components/Nav'
import { supabase } from '../lib/supabaseClient'

export default function ResetPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const accessToken = router.query.access_token as string

  console.log('router', router)

  const handleResetPassword = async (email: string) => {
    try {
      setLoading(true)
      // const { error, user } = await supabase.auth.signIn({ email })
      const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
        // redirectTo: `http://localhost:3000/reset-password`,
        redirectTo: `${window.location.origin}/new-password`,
      })
      if (error) throw error
      alert('Email sent!')
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
      // router.push('/')
    }
  }

  const resetPasswordForm = () => {
    return (
      <form
        className="password-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleResetPassword(email)
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
        <div className="actions">
          <button
            type="submit"
            className="button primary-button fluid-width action"
            disabled={loading}
          >
            Reset Password
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="reset-password-page">
      <h1 className="headline4">Reset Password</h1>
      <div className="content-section">{resetPasswordForm()}</div>
    </div>
  )
}
