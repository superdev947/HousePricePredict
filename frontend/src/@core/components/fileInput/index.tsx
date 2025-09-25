// ** React Imports
import React, { forwardRef } from 'react'

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accept?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ accept, onChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type='file'
      accept={accept}
      onChange={onChange}
      className='hidden'
      {...props} // Spread any additional props
    />
  )
})

export default FileInput
