// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Imports
import { Box, Divider, IconButton, List, ListItem, Stack, Typography } from '@mui/material'

// ** Icon Imports
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'

// ** Config Imports
import { linkItems } from 'src/navigation'

// ** Hooks Imports
import { dispatch, useSelector } from 'src/store'
import { setTheme } from 'src/store/setting'

// ** Custom components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import Translations from 'src/@core/components/translations'

// ** Images Imports
import logoImg from '../../public/logo.png'

const Header = () => {
  const { theme } = useSelector(store => store.setting)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [toggleId, setToggleId] = useState<string>('')
  const toggleTheme = () => {
    dispatch(setTheme(!theme))
  }

  const handleToggle = () => {
    const newVisibility = !isVisible
    const newToggleId = theme ? (newVisibility ? 'hamburger-open' : '') : newVisibility ? 'hamburger-open-bright' : ''
    setIsVisible(newVisibility)
    setToggleId(newToggleId)
    setIsMobile(!isMobile)
  }

  const onChangeThemeHandler = () => {
    toggleTheme()
    setIsVisible(false)
    setToggleId('')
    setIsMobile(false)
  }

  return (
    <Box
      component='header'
      className={`top-0 left-0 right-0 z-50 dark:bg-libertyBlue bg-white trasition-all duration-300`}
    >
      <Box className='mx-auto container'>
        <Box className='flex justify-between h-20'>
          <Box className='w-full md:hidden flex items-center justify-between'>
            <Stack component={Link} href='/' direction='row' className='items-center no-underline'>
              <Image src={logoImg} alt='logo' className='mr-2 w-fit h-fit' />
              <Typography className='font-Inter text-2xl dark:text-white text-midnightexpress font-bold flex flex-row max-sm:text-22'>
                <Translations text='House Price' />
                &nbsp;
              </Typography>
              <Typography className='font-Inter text-2xl dark:text-white text-midnightexpress font-normal flex flex-row max-sm:text-22'>
                <Translations text='Estimator' />
                &nbsp;
              </Typography>
            </Stack>
            <IconButton className='hamburger w-10 h-10' onClick={handleToggle} aria-label='Toggle Menu'>
              {theme ? (
                <Typography className={`hamburger-span ${toggleId}`} />
              ) : (
                <Typography className={`hamburger-span-bright ${toggleId}`} />
              )}
            </IconButton>
          </Box>
          <Box className='md:flex flex-row items-center gap-6 hidden'>
            <Stack component={Link} href='/' className='flex flex-row items-center no-underline'>
              <Image src={logoImg} alt='logo' className='mr-2 w-fit h-fit' />
              <Typography className='font-Inter text-2xl text-midnightexpress dark:text-white font-bold flex flex-row max-sm:text-22'>
                <Translations text='House Price' />
                &nbsp;
              </Typography>
              <Typography className='font-Inter text-2xl text-midnightexpress dark:text-white font-normal flex flex-row max-sm:text-22'>
                <Translations text='Estimator' />
                &nbsp;
              </Typography>
            </Stack>
            <List className='flex flex-row items-center max-md:hidden'>
              {linkItems.map((item, index) => (
                <ListItem key={index} className='px-3 list-none'>
                  <Link
                    href={item.url}
                    className='no-underline text-blueBlouse font-Inter font-medium text-base transition duration-300 ease-in-out transform hover:scale-110  dark:hover:text-white hover:text-midnightExpress'
                  >
                    <Translations text={item.title} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className='md:flex flex-row items-center gap-3 hidden'>
            <OptionsMenu />
            <IconButton
              className='w-10 h-10 rounded-lg border-3 border-solid bg-whiteEdgar border-cascadingWhite hover:bg-creamyavocardo dark:hover:bg-creamyavocardo dark:hover:text-midnightexpress hover:border-milkFoam transition-all duration-300 text-saltBoxBlue hover:text-midnightExpress dark:text-white dark:bg-blueZodiac dark:border-crowBlack'
              onClick={toggleTheme}
            >
              {theme ? <IoMoonOutline size={20} /> : <IoSunnyOutline size={20} />}
            </IconButton>
          </Box>
          <Box
            className={`absolute h-screen left-0 right-0 dark:bg-libertyBlue bg-white z-20 transition-all duration-500 ease-in-out flex flex-col items-center mobile-menu ${
              isMobile ? 'w-full' : 'w-0'
            }`}
          >
            {isMobile && (
              <Box className='w-full px-6 flex flex-col'>
                <Box className={`h-20 flex transition-all duration-500 ease-in-out ${isMobile ? 'w-full' : 'w-0'}`}>
                  <Stack component={Link} href='/' className='flex flex-row items-center no-underline'>
                    <Image src={logoImg} alt='logo' className='mr-2 w-fit h-fit' />
                    <Typography className='font-Inter text-2xl dark:text-white text-midnightexpress font-bold flex flex-row max-sm:text-22'>
                      <Translations text='RWA' />
                      &nbsp;
                    </Typography>
                    <Typography className='font-Inter text-2xl dark:text-white text-midnightexpress font-normal flex flex-row max-sm:text-22'>
                      <Translations text='Estate' />
                      &nbsp;
                    </Typography>
                  </Stack>
                </Box>
                <List className='flex w-full flex-col justify-center items-center'>
                  {linkItems.map((item, index) => (
                    <ListItem key={`index${index}`} className='group relative px-2 mb-2 py-4 flex justify-center'>
                      <Link
                        href={item.url}
                        onClick={() => setIsMobile(false)}
                        className='font-Inter text-libertyBlue dark:text-white font-medium text-base list-none no-underline'
                      >
                        <Translations text={item.title} />
                      </Link>
                    </ListItem>
                  ))}
                </List>

                <IconButton
                  className='w-full h-10 rounded-lg border-3 border-solid bg-whiteEdgar border-cascadingWhite hover:bg-creamyavocardo dark:hover:bg-creamyavocardo dark:hover:text-midnightexpress hover:border-milkFoam transition-all duration-300 text-saltBoxBlue hover:text-midnightExpress dark:text-white dark:bg-blueZodiac dark:border-crowBlack'
                  onClick={onChangeThemeHandler}
                >
                  {theme ? <IoMoonOutline size={20} /> : <IoSunnyOutline size={20} />}
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Divider className='dark:bg-crowBlack bg-brightGrey' />
    </Box>
  )
}

export default Header
