import '~/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
