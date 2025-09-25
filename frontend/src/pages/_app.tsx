// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Config Imports
import '../configs/i18n'
import themeConfig from '../configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import Layout from 'src/layouts'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Global css styles
import '../../styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persister, store } from 'src/store'
import ComponentLoading from 'src/@core/components/spinner/loading'
import { LoadingProvider } from 'src/context/LoadingContext'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children }: GuardProps) => {
  return <>{children}</>
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <LoadingProvider>
          <Head>
            <title>{`${themeConfig.appName}`}</title>
            <meta name='description' content={`${themeConfig.appName}`} />
            <meta name='keywords' content={`${themeConfig.appName}`} />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>
          <ThemeComponent>
            <Guard authGuard={authGuard} guestGuard={guestGuard}>
              {getLayout(<Component {...pageProps} />)}
            </Guard>
            <Toaster toastOptions={{ className: 'react-hot-toast' }} />
            <ComponentLoading />
          </ThemeComponent>
        </LoadingProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
