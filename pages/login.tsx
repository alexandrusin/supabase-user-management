import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true)
      // const { error, user } = await supabase.auth.signIn({ email })
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
      router.push('/account')
    }
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <h1>LOGIN</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button
        disabled={loading}
        onClick={(e) => {
          e.preventDefault()
          handleLogin(email, password)
        }}
      >
        Login
      </button>
      <br />
      <br />
      <Link href="/reset">
        <a>Lost Password?</a>
      </Link>
    </div>
  )
}
