import '../styles/style.scss'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Next Models - Agenția internațională de modele online, modele ca tine
          și ca mine
        </title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
