import { supabase } from 'lib/supabaseClient'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdMenu } from 'react-icons/md'
import { MdMenuOpen } from 'react-icons/md'

export default function NavBar() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const MobileNavBtn = () => {
    return (
      <>
        {!show && (
          <MdMenu className="nav-mobile-btn" onClick={() => setShow(!show)} />
        )}
        {show && (
          <MdMenuOpen
            className="nav-mobile-btn"
            onClick={() => setShow(!show)}
          />
        )}
      </>
    )
  }

  useEffect(() => {
    getUser()
  })

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user?.aud) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    console.log('HEY', user)
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()

    setLoggedIn(false)
  }

  return (
    <>
      {/* <MobileNavBtn /> */}
      <nav className="nav-bar">
        <ul>
          <li className={router.route === '/' ? 'active' : ''}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {!loggedIn && (
            <>
              <li className={router.route === '/register' ? 'active' : ''}>
                <Link href="/register">
                  <a>Înregistrare</a>
                </Link>
              </li>
              <li className={router.route === '/login' ? 'active' : ''}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
          {/* <li className={router.route === '/reset-password' ? 'active' : ''}>
            <Link href="/reset-password">
              <a>Reset Password</a>
            </Link>
          </li>
          <li className={router.route === '/new-password' ? 'active' : ''}>
            <Link href="/new-password">
              <a>New Password</a>
            </Link>
          </li> */}
          {loggedIn && (
            <li className={router.route === '/account' ? 'active' : ''}>
              <Link href="/account">
                <a>Account</a>
              </Link>
            </li>
          )}

          {loggedIn && (
            <li onClick={() => signOut()}>
              <Link href="/">
                <a>Logout</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}
