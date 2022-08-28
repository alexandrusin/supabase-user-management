import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()

  return (
    <div className="footer">
      <nav className="nav-bar">
        <ul>
          <li className={router.route === '/typography' ? 'active' : ''}>
            <Link href="/typography">
              <a className="body2">Typography</a>
            </Link>
          </li>
        </ul>
        <ul className="nav">
          <li>
            <Link href="/">
              <a>index</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Log In</a>
            </Link>
          </li>
          <li>
            <Link href="/reset">
              <a>Reset password</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
