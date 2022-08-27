import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { supabase } from '../lib/supabaseClient'

export default function ResetPassword() {
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

  const handleResetPassword = async (email: string) => {
    try {
      setLoading(true)

      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error
      alert('Changing Password!')
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
      router.push('/login')
    }
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Nav />
      <div>
        <h1>Set your new password</h1>
        <label htmlFor="email">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          show password
        </span>
        <br />
        <br />
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault()
            handleResetPassword(email)
          }}
        >
          Save New Password
        </button>
      </div>
    </div>
  )
}
