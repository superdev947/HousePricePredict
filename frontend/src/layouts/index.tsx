// ** React Imports
import { ReactNode } from 'react'

// ** MUI imports
import { Box } from '@mui/material'

// ** Custom components Imports
import Header from './Header'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Header />
      <Box component='main' className='flex-grow overflow-y-hidden'>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
