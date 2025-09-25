// ** React Imports
import React, { useState, createContext, ReactNode } from 'react'

interface LoadingValueType {
  loading: boolean
  setLoading: (value: boolean) => void
}

const defaultProvider: LoadingValueType = {
  loading: false,
  setLoading: () => Boolean
}

const LoadingContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const values = {
    loading,
    setLoading
  }

  return <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>
}

export { LoadingContext, LoadingProvider }
