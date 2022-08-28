import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
// import styles from '../styles/Auth.module.css'

export default function Auth({}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      // const { error, user } = await supabase.auth.signIn({ email })
      const { error, data } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error thrown:', error.message)
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <p className="description">
        Sign in via magic link with your email below
      </p>
      <div>
        <input
          className="inputField"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          className={'button block'}
          disabled={loading}
        >
          {loading ? <span>WAIT!</span> : <span>Send magic link</span>}
        </button>
      </div>
    </>
  )
}
