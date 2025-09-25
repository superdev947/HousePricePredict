// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'

// ** Loading Imports
import { Riple } from 'react-loading-indicators'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Riple size='medium' />
    </Box>
  )
}

export default FallbackSpinner
