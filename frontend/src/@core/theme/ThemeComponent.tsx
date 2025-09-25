// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider } from '@mui/material/styles'

// ** Hooks Import
import { useSelector } from 'src/store'

interface Props {
  children: ReactNode
}

const ThemeComponent = ({ children }: Props) => {
  const { theme } = useSelector(store => store.setting)

  useEffect(() => {
    if (theme) {
      document.querySelector('html')?.classList.add('dark')
    } else {
      document.querySelector('html')?.classList.remove('dark')
    }
  }, [theme])

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      {children}
    </StyledEngineProvider>
  )
}

export default ThemeComponent
