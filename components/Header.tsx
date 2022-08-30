import Link from 'next/link'
// import LoginDrawer from './LoginDrawer'
import Logo from './Logo'
import NavBar from './NavBar'

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <Link href="/">
            <a className="logo-wrapper">
              <Logo height="30px" />
              <div className="logotype">Next Models</div>
            </a>
          </Link>
          <NavBar />
        </div>
      </header>
      {/* <LoginDrawer /> */}
    </>
  )
}
