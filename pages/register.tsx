import { useRouter } from 'next/router'
import { useState } from 'react'
import { Nav } from '../components/Nav'
import { supabase } from '../lib/supabaseClient'

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (
    email: string,
    password: string,
    firstName: string | null,
    lastName: string | null
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
      alert('Registered!')
      router.push('/welcome')
    }
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Nav />
      <h1>REGISTER</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div>
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          show password
        </span>
      </div>
      <br />
      <br />
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName || ''}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button
        disabled={loading}
        onClick={(e) => {
          e.preventDefault()
          handleRegister(email, password, firstName, lastName)
        }}
      >
        SIGNUP
      </button>
    </div>
  )
}
