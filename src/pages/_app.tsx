import '~/styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { Footer, Header } from '~/components/Layout'
import { theme } from '~/styles/theme'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
