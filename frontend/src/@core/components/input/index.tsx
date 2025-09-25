import { InputHTMLAttributes } from 'react'

const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`py-2 px-3 w-3/5 border border-solid border-blueReflection rounded-md font-Inter text-base font-normal leading-6 focus:outline-none bg-white dark:border-crowBlack  text-black ${className}`}
      {...props}
    />
  )
}

export default Input
