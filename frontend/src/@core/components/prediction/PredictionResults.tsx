import { Box, Typography, Card, CardContent, Stack, Button } from '@mui/material'
import { FiHome } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

interface PredictionResult {
  price: number
}

interface PredictionResultsProps {
  results: PredictionResult[]
  onClose: () => void
}

const PredictionResults = ({ results, onClose }: PredictionResultsProps) => {
  const { t } = useTranslation()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  const total = results.reduce((sum, r) => sum + r.price, 0)
  const avg = results.length > 0 ? total / results.length : 0

  return (
    <Box className='px-6 space-y-6 mb-5'>
      <Typography variant='h5' className='font-semibold text-center mb-4 dark:text-white'>
        {t('price_estimation_results')}
      </Typography>

      <Stack spacing={3}>
        {results.map((result, index) => (
          <Card key={index} elevation={3} className='rounded-2xl shadow-md hover:shadow-lg transition-shadow'>
            <CardContent className='flex flex-col items-center p-6'>
              <FiHome size={28} className='mb-2 text-blue-600' />
              <Typography variant='subtitle1' className='mb-1 text-gray-600 dark:text-gray-300'>
                {t('house')} {index + 1}
              </Typography>
              <Box className='flex items-center'>
                <Typography variant='h6' className='font-bold text-green-600'>
                  {formatPrice(result.price)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {results.length > 1 && (
        <Card elevation={2} className='rounded-2xl bg-blue-50 dark:bg-gray-800'>
          <CardContent className='p-6 text-center'>
            <Typography variant='h6' className='font-semibold text-blue-800 dark:text-white mb-2'>
              {t('portfolio_summary')}
            </Typography>
            <Typography variant='body1' className='dark:text-white'>
              <strong>{t('total_value')}:</strong> {formatPrice(total)}
            </Typography>
            <Typography variant='body1' className='dark:text-white'>
              <strong>{t('average_price')}:</strong> {formatPrice(avg)}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Button variant='contained' fullWidth onClick={onClose} className='mt-4 rounded-full'>
        {t('close')}
      </Button>
    </Box>
  )
}

export default PredictionResults
