import '~/styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { Footer, Header } from '~/components/Layout'
import { AuthProvider } from '~/components/Provider'
import { theme } from '~/styles/theme'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
