import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ResetPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const accessToken = router.query.access_token as string

  console.log('router', router)

  const handleRequestReset = async (email: string) => {
    try {
      setLoading(true)
      // const { error, user } = await supabase.auth.signIn({ email })
      const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `http://localhost:3000/reset-password`,
        // redirectTo: `${window.location.origin}/reset-password`,
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

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <div>
        <h1>Reset password</h1>
        <label htmlFor="email">Type in your email address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault()
            handleRequestReset(email)
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  )
}
