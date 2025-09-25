import { ButtonProps, IconButton as MuiIconButton } from '@mui/material'

const IconButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <MuiIconButton
      className={`h-10 border-3 border-solid bg-whiteEdgar border-cascadingWhite hover:bg-creamyavocardo dark:hover:bg-creamyavocardo dark:hover:text-midnightexpress hover:border-milkFoam transition-all duration-300 text-saltBoxBlue hover:text-midnightExpress dark:text-white dark:bg-blueZodiac dark:border-crowBlack ${className}`}
      {...props}
    >
      {children}
    </MuiIconButton>
  )
}

export default IconButton
