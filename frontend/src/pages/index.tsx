// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** MUI Imports
import { Box, Stack, Typography, Alert } from '@mui/material'

// ** Three.js Imports
import { Canvas, PrimitiveProps, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { DoubleSide, MeshBasicMaterial, NoToneMapping } from 'three'

// ** Gsap Import
import gsap from 'gsap-trial'

// ** Util Import
import { useSelector } from 'src/store'
import { useTranslation } from 'react-i18next'

// ** Custom components Import
import BgAnimation from 'src/@core/components/bg-animation'
import Translations from 'src/@core/components/translations'
import Modal from 'src/@core/components/modal'

// ** Custom Components
import CsvUploadContent from 'src/@core/components/prediction/CsvUploadContent'
import PropertyDetailsContent from 'src/@core/components/prediction/PropertyDetailsContent'
import PredictionResults from 'src/@core/components/prediction/PredictionResults'

// ** Types
import { PropertyDetails, CsvData, PredictionResult } from 'src/types'
import { API_URL } from 'src/configs'

const HouseModel = ({ path }: { path: string }) => {
  const ref = useRef<PrimitiveProps | null>(null)
  const [done, setDone] = useState(false)
  const gltf = useGLTF(path)

  const bakedTexture = useTexture('/model/baked.jpg')
  bakedTexture.flipY = false
  const bakedMaterial = new MeshBasicMaterial({
    map: bakedTexture,
    side: DoubleSide
  })

  const model = gltf.scene
  model.traverse((child: any) => (child.material = bakedMaterial))

  useThree(({ camera }) => {
    camera.position.set(1, 4, 4)
  })

  useFrame(() => {
    if (!ref.current) return
    if (ref.current.rotation.y >= 0.3) setDone(true)
    if (ref.current.rotation.y <= -1) setDone(false)
    if (ref.current.rotation.y < 0.5 && !done) ref.current.rotation.y += 0.001
    else ref.current.rotation.y -= 0.001
  })

  return <primitive ref={ref} object={model} />
}

const LandingPage = () => {
  const { t } = useTranslation()

  const { theme } = useSelector(state => state.setting)
  const [csvModalOpen, setCsvModalOpen] = useState(false)
  const [resultsModalOpen, setResultsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [predictionResults, setPredictionResults] = useState<PredictionResult[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    gsap.fromTo('.landing-1', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, delay: 0.5 })
    gsap.fromTo('.landing-2', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, delay: 0.7 })
  }, [])

  const makePrediction = async (propertyData: any) => {
    try {
      const payload = {
        task: {
          bedrooms: Number(propertyData.bedrooms),
          bathrooms: Number(propertyData.bathrooms),
          sqft_living: Number(propertyData.sqft_living),
          sqft_lot: Number(propertyData.sqft_lot || 0),
          floors: Number(propertyData.floors || 1),
          sqft_above: Number(propertyData.sqft_above || propertyData.sqft_living),
          sqft_basement: Number(propertyData.sqft_basement || 0),
          zipcode: propertyData.zipcode.toString()
        }
      }

      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()

      return data
    } catch (err) {
      console.error('Prediction error:', err)
      throw err
    }
  }

  const handleDetailsSave = async (details: PropertyDetails) => {
    setIsProcessing(true)
    setError('')

    try {
      const result = await makePrediction(details)
      const predictionResult: PredictionResult = {
        price: result.price,
        property: details
      }

      setPredictionResults([predictionResult])
      setResultsModalOpen(true)
    } catch (err) {
      setError(t('prediction_error') as string)
      console.error('Prediction error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCsvDataProcessed = async (data: CsvData[]) => {
    setIsProcessing(true)
    setError('')

    try {
      const predictions = await Promise.all(
        data.map(async (property, index) => {
          try {
            const result = await makePrediction(property)

            return {
              price: result.price,
              property: {
                bedrooms: property.bedrooms.toString(),
                bathrooms: property.bathrooms.toString(),
                sqft_living: property.sqft_living.toString(),
                sqft_lot: property.sqft_lot.toString(),
                floors: property.floors.toString(),
                zipcode: property.zipcode
              }
            }
          } catch (err) {
            console.error(t('batch_prediction_error', { index: index + 1 }), err)

            return {
              price: 0,
              property: {
                bedrooms: property.bedrooms.toString(),
                bathrooms: property.bathrooms.toString(),
                sqft_living: property.sqft_living.toString(),
                zipcode: property.zipcode
              }
            }
          }
        })
      )

      const successfulPredictions = predictions.filter(p => p.price > 0)
      setPredictionResults(successfulPredictions)
      setCsvModalOpen(false)
      setResultsModalOpen(true)

      if (successfulPredictions.length !== predictions.length) {
        setError(
          t('partial_prediction_error', {
            failed: predictions.length - successfulPredictions.length
          }) as string
        )
      }
    } catch (err) {
      setError(t('csv_processing_error') as string)
      console.error('Batch prediction error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Stack className={`w-full gap-12 relative landing landing-${theme ? 'dark' : 'light'}`}>
      <BgAnimation />

      <Modal isOpen={csvModalOpen} onClose={() => setCsvModalOpen(false)} size='lg'>
        <CsvUploadContent onDataProcessed={handleCsvDataProcessed} onClose={() => setCsvModalOpen(false)} />
      </Modal>

      <Modal isOpen={resultsModalOpen} onClose={() => setResultsModalOpen(false)} size='sm'>
        <PredictionResults results={predictionResults} onClose={() => setResultsModalOpen(false)} />
      </Modal>

      {error && (
        <Alert
          severity='error'
          className='absolute top-4 left-4 right-4 z-50 max-w-md mx-auto'
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <Canvas gl={{ antialias: true, toneMapping: NoToneMapping }} linear>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <HouseModel path='/model/model.glb' />
        <OrbitControls />
      </Canvas>

      <Stack className='absolute left-0 right-0 bottom-0 top-0 pt-10 items-center overflow-y-auto'>
        <Stack className='landing-1 w-2/3 items-center gap-4 justify-center relative max-md:w-full'>
          <Typography className='font-Inter text-base bg-creamyavocardo rounded-full w-fit px-4 py-2 text-center'>
            <Translations text='Welcome to' /> <strong>House Price Estimator</strong>
          </Typography>

          <Box className='text-6xl font-bold text-center max-md:text-30 dark:text-white max-md:w-90p leading-tight'>
            <Translations text='Estimate House Price based on Real Data' />
          </Box>

          <Typography className='font-content text-lg text-center dark:text-white w-2/3 max-sm:text-14'>
            <Translations text='landing-description' />
          </Typography>
        </Stack>

        <Box className='landing-2 w-full max-w-2xl mt-6 px-6 mb-6'>
          <PropertyDetailsContent onSave={handleDetailsSave} isProcessing={isProcessing} />
        </Box>
      </Stack>
    </Stack>
  )
}

useGLTF.preload('/model/model.glb')
useTexture.preload('/model/baked.jpg')

LandingPage.guestGuard = true
export default LandingPage
