import Link from 'next/link'

export const Nav = () => {
  return (
    <ul className="nav">
      <li>
        <Link href="/">
          <a>index</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <a>Register</a>
        </Link>
      </li>
      <li>
        <Link href="/signin">
          <a>Log In</a>
        </Link>
      </li>
      {/* <li>
        <a href="/dashboard">dashboard</a>
      </li> */}
    </ul>
  )
}
