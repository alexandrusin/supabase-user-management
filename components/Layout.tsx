import Footer from './Footer'
import Header from './Header'

type Props = {
  children: JSX.Element[] | JSX.Element
}

export default function Layout({ children }: Props) {
  return (
    <div className="app">
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </div>
  )
}
