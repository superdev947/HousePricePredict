// ** MUI Imports
import { useContext } from 'react'
import { Box, BoxProps } from '@mui/material'

// ** Riple Imports
import { Riple } from 'react-loading-indicators'

// ** Hook Imports
import { LoadingContext } from 'src/context/LoadingContext'

const LoadingSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  const { loading } = useContext(LoadingContext)

  return (
    <>
      {loading && (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            width: '100vw',
            zIndex: 1000000,
            ...sx
          }}
        >
          <Riple size='medium' />
        </Box>
      )}
    </>
  )
}

export default LoadingSpinner
