import Home from '.'
import '../../styles/global.scss'
import { AuthProvider } from '../contexts/AuthContext'

import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}

