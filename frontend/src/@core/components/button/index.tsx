// ** MUI Imports
import { ButtonProps as MuiButtonProps, Button as MuiButton } from '@mui/material'

const Button = ({ children, className, rounded, ...props }: MuiButtonProps & { rounded?: string }) => {
  return (
    <MuiButton
      sx={{ textTransform: 'none' }}
      className={`font-Inter h-10 ${rounded ? rounded : 'rounded-lg'} dark:bg-whiteEdgar hover:bg-creamyavocardo bg-blueZodiac dark:hover:bg-creamyavocardo border-3 border-solid border-cascadingWhite hover:border-milkFoam dark:border-crowBlack transition-all duration-300 dark:text-saltBoxBlue dark:hover:text-midnightExpress text-white hover:text-midnightexpress ${className}`}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export default Button
