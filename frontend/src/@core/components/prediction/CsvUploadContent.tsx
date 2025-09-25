import { useState, useRef } from 'react'
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material'
import { FiUploadCloud } from 'react-icons/fi'
import Translations from 'src/@core/components/translations'
import FileInput from 'src/@core/components/fileInput'
import Button from '../button'

interface CsvData {
  bedrooms: number
  bathrooms: number
  sqft_living: number
  sqft_lot: number
  floors: number
  waterfront: number
  view: number
  condition: number
  grade: number
  sqft_above: number
  sqft_basement: number
  yr_built: number
  yr_renovated: number
  zipcode: string
  lat: number
  long: number
  sqft_living15: number
  sqft_lot15: number
}

interface CsvUploadContentProps {
  onDataProcessed: (data: CsvData[]) => void
  onClose: () => void
}

const CsvUploadContent = ({ onDataProcessed, onClose }: CsvUploadContentProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<CsvData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseCSV = (text: string): CsvData[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '')
    if (lines.length < 2) return []

    const headers = lines[0].split(',').map(header => header.trim())
    const data: CsvData[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value => value.trim())
      if (values.length !== headers.length) continue

      const row: any = {}
      headers.forEach((header, index) => {
        const value = values[index]
        if (['zipcode'].includes(header)) {
          row[header] = value
        } else {
          row[header] = value === '' ? 0 : parseFloat(value)
        }
      })

      if (!isNaN(row.bedrooms) && !isNaN(row.bathrooms) && !isNaN(row.sqft_living)) {
        data.push(row as CsvData)
      }
    }

    return data
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      setIsProcessing(true)

      try {
        const text = await readFileAsText(selectedFile)
        const parsedData = parseCSV(text)
        setCsvData(parsedData)
      } catch (error) {
        console.error('Error reading CSV file:', error)
        setCsvData([])
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target?.result as string)
      reader.onerror = e => reject(e)
      reader.readAsText(file)
    })
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleProcessData = () => {
    if (csvData.length > 0) {
      onDataProcessed(csvData)
    }
  }

  return (
    <Box className='px-6 pb-6'>
      <Typography variant='h5' className='font-semibold mb-6 dark:text-white text-center'>
        <Translations text='Upload CSV File' />
      </Typography>
      <Box
        className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-blue-400 transition-colors'
        onClick={handleUploadClick}
      >
        <FiUploadCloud className='text-gray-400 text-5xl mb-3 mx-auto' />
        <Typography variant='body1' className='text-gray-600 dark:text-white mb-4'>
          {file ? file.name : 'Click to select CSV file or drag and drop'}
        </Typography>

        <FileInput ref={fileInputRef} accept='.csv' onChange={handleFileChange} />

        <Button variant='outlined' onClick={handleUploadClick} className='mt-3' disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Choose File'}
        </Button>
      </Box>

      {isProcessing && (
        <Alert severity='info' className='mb-4'>
          <Typography variant='body2'>Processing CSV file...</Typography>
        </Alert>
      )}

      {csvData.length > 0 && (
        <Box className='mb-6'>
          <Alert severity='success' className='mb-4'>
            <Typography variant='body2'>Successfully loaded {csvData.length} properties</Typography>
          </Alert>

          <TableContainer component={Paper} className='max-h-80 overflow-auto'>
            <Table size='small' stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className='font-bold'>Bedrooms</TableCell>
                  <TableCell className='font-bold'>Bathrooms</TableCell>
                  <TableCell className='font-bold'>Sqft Living</TableCell>
                  <TableCell className='font-bold'>Zipcode</TableCell>
                  <TableCell className='font-bold'>Year Built</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.slice(0, 10).map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.bedrooms}</TableCell>
                    <TableCell>{row.bathrooms}</TableCell>
                    <TableCell>{row.sqft_living.toLocaleString()}</TableCell>
                    <TableCell>{row.zipcode}</TableCell>
                    <TableCell>{row.yr_built}</TableCell>
                  </TableRow>
                ))}
                {csvData.length > 10 && (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center font-semibold'>
                      ... and {csvData.length - 10} more properties
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Typography variant='body2' className='text-gray-500 text-center mb-6 dark:text-white'>
        CSV should contain columns: bedrooms, bathrooms, sqft_living, sqft_lot, floors, sqft_above, sqft_basement,
        zipcode
      </Typography>

      <Stack direction='row' spacing={2}>
        <Button
          variant='outlined'
          rounded='rounded-full'
          className='px-6 py-2.5 bg-creamyavocardo hover:bg-whiteEdgar'
          fullWidth
          onClick={onClose}
          size='large'
        >
          Cancel
        </Button>
        <Button
          rounded='rounded-full'
          fullWidth
          onClick={handleProcessData}
          disabled={csvData.length === 0 || isProcessing}
          startIcon={isProcessing ? <CircularProgress size={20} /> : null}
          size='large'
        >
          Predict
        </Button>
      </Stack>
    </Box>
  )
}

export default CsvUploadContent
