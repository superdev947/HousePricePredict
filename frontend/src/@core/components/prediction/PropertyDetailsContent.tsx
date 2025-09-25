import { useState } from 'react'
import {
  Box,
  Stack,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  TextField,
  InputLabel,
  useTheme
} from '@mui/material'
import Button from '../button'
import { PropertyDetails } from 'src/types'
import { useTranslation } from 'react-i18next'

interface PropertyDetailsContentProps {
  onSave: (data: PropertyDetails) => void
  onClose?: () => void
  isProcessing: boolean
}

const zipCodes = [
  98001, 98002, 98003, 98004, 98005, 98007, 98011, 98022, 98023, 98024, 98027, 98028, 98029, 98030, 98031, 98032, 98034,
  98038, 98042, 98045, 98052, 98056, 98058, 98059, 98065, 98072, 98074, 98075, 98092, 98106, 98107, 98112, 98115, 98116,
  98117, 98118, 98119, 98122, 98125, 98126, 98166, 98178, 98188, 98198, 98199
]

const initialData = {
  bedrooms: '',
  bathrooms: '',
  sqft_living: '',
  sqft_lot: '',
  floors: '',
  sqft_above: '',
  sqft_basement: '',
  yr_built: '',
  zipcode: ''
}

const PropertyDetailsContent = ({ onSave, onClose, isProcessing }: PropertyDetailsContentProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [details, setDetails] = useState<PropertyDetails>(initialData)

  const handleInputChange = (field: keyof PropertyDetails) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (Number(value) < 0) return
    setDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleZipChange = (event: any) => {
    setDetails(prev => ({
      ...prev,
      zipcode: String(event.target.value)
    }))
  }

  const isFormValid = () => {
    return (
      details.bedrooms.trim() !== '' &&
      details.bathrooms.trim() !== '' &&
      details.sqft_living.trim() !== '' &&
      details.sqft_above.trim() !== '' &&
      details.sqft_basement.trim() !== '' &&
      details.yr_built.trim() !== '' &&
      typeof details.zipcode === 'string' &&
      details.zipcode.trim() !== ''
    )
  }

  const fieldSx = {
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#f5f5f5',
    borderRadius: 1
  }

  return (
    <Box className='w-full'>
      <Stack spacing={3}>
        <Stack direction='row' spacing={2}>
          <TextField
            variant='filled'
            label={t('bedrooms')}
            placeholder={t('bedrooms_placeholder') || ''}
            type='number'
            value={details.bedrooms}
            onChange={handleInputChange('bedrooms')}
            required
            fullWidth
            sx={fieldSx}
          />
          <TextField
            variant='filled'
            label={t('bathrooms')}
            placeholder={t('bathrooms_placeholder') || ''}
            type='number'
            value={details.bathrooms}
            onChange={handleInputChange('bathrooms')}
            required
            fullWidth
            sx={fieldSx}
          />
        </Stack>

        <Stack direction='row' spacing={2}>
          <TextField
            variant='filled'
            label={t('living_area')}
            placeholder={t('living_area_placeholder') || ''}
            type='number'
            value={details.sqft_living}
            onChange={handleInputChange('sqft_living')}
            required
            fullWidth
            sx={fieldSx}
          />
          <TextField
            variant='filled'
            label={t('lot_size')}
            placeholder={t('lot_size_placeholder') || ''}
            type='number'
            value={details.sqft_lot}
            onChange={handleInputChange('sqft_lot')}
            fullWidth
            sx={fieldSx}
          />
        </Stack>

        <Stack direction='row' spacing={2}>
          <TextField
            variant='filled'
            label={t('floors')}
            placeholder={t('floors_placeholder') || ''}
            type='number'
            value={details.floors}
            onChange={handleInputChange('floors')}
            fullWidth
            sx={fieldSx}
          />
          <TextField
            variant='filled'
            label={t('above_ground_area')}
            placeholder={t('above_ground_area_placeholder') || ''}
            type='number'
            value={details.sqft_above}
            onChange={handleInputChange('sqft_above')}
            required
            fullWidth
            sx={fieldSx}
          />
        </Stack>
        <Stack direction='row' spacing={2}>
          <TextField
            variant='filled'
            label={t('basement_area')}
            placeholder={t('basement_area_placeholder') || ''}
            type='number'
            value={details.sqft_basement}
            onChange={handleInputChange('sqft_basement')}
            required
            fullWidth
            sx={fieldSx}
          />
          <TextField
            variant='filled'
            label={t('year_built')}
            placeholder={t('year_built_placeholder') || ''}
            type='number'
            value={details.yr_built}
            onChange={handleInputChange('yr_built')}
            required
            fullWidth
            sx={fieldSx}
          />
        </Stack>

        <FormControl variant='filled' fullWidth sx={fieldSx}>
          <InputLabel shrink>{t('zipcode')}</InputLabel>
          <Select value={details.zipcode} onChange={handleZipChange} displayEmpty notched>
            <MenuItem value=''>
              <em>{t('select_zipcode')}</em>
            </MenuItem>
            {zipCodes.map(zip => (
              <MenuItem key={zip} value={zip}>
                {zip}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction='row' spacing={2} mt={2}>
          {onClose && (
            <Button rounded='rounded-full' className='px-6 py-2.5' fullWidth onClick={onClose} size='large'>
              {t('cancel')}
            </Button>
          )}
          <Button
            variant='contained'
            rounded='rounded-full'
            fullWidth
            onClick={() => onSave(details)}
            disabled={!isFormValid() || isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
            size='large'
          >
            {isProcessing ? t('predicting') : t('predict_price')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default PropertyDetailsContent
