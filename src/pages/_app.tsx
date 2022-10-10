import '~/styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { Footer, Header } from '~/components/Layout'
import { AuthProvider } from '~/components/Provider'
import { theme } from '~/styles/theme'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </ChakraProvider>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
