// src/@core/components/modal.tsx
import React, { ReactNode, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Box, Button } from '@mui/material'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'md' }) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <Box
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Box
        className={`dark:bg-midnightexpress bg-white rounded-lg shadow-lg w-full ${
          sizeClasses[size]
        } max-h-[90vh] overflow-hidden transition-transform duration-300 transform ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <Box className='flex justify-end   border-b'>
          <Button
            className='py-4 dark:text-white bg-white dark:bg-midnightexpress  font-Inter rounded-md flex flex-row items-center'
            onClick={onClose}
          >
            <IoMdClose className='text-2xl' />
          </Button>
        </Box>
        <Box className='overflow-y-auto max-h-[calc(85vh-80px)]'>{children}</Box>
      </Box>
    </Box>
  )
}

export default Modal
