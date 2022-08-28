import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import { MdMenuOpen } from 'react-icons/md'

export default function NavBar() {
  const router = useRouter()
  const [show, setShow] = useState(false)

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
          <li className={router.route === '/register' ? 'active' : ''}>
            <Link href="/register">
              <a>Înregistrare</a>
            </Link>
          </li>
          <li className={router.route === '/models' ? 'active' : ''}>
            <Link href="/models">
              <a>Modele</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
