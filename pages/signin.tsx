import { useRouter } from 'next/router'
import { useState } from 'react'
import { Nav } from '../components/Nav'
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
      alert('Somehtings up!')
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
      router.push('/')
    }
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Nav />
      <h1>LOGIN</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={(e) => {
          e.preventDefault()
          handleLogin(email, password)
        }}
      >
        Login
      </button>
    </div>
  )
}
