// ** React Imports
import { MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import { IconButton, Menu, MenuItem } from '@mui/material'

// ** i18n Imports
import { useTranslation } from 'react-i18next'

// ** Flag Icon Imports
import { US, ES, FR } from 'country-flag-icons/react/3x2'

// ** Hooks Import
import { setLang } from 'src/store/setting'
import { useSelector, dispatch } from 'src/store'

const languages = [
  { code: 'en', title: 'United States', Component: US },
  { code: 'fr', title: 'France', Component: FR },
  { code: 'es', title: 'Spain', Component: ES }
]

export default function BasicMenu() {
  const { i18n } = useTranslation()
  const { lang } = useSelector(store => store.setting)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleLang = (newLang: string) => {
    dispatch(setLang(newLang))
    handleClose()
  }

  const SelectedLanguageComponent = languages.find(language => language.code === lang)?.Component

  useEffect(() => {
    i18n.changeLanguage(lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  return (
    <>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        className='w-10 h-10 rounded-lg border-3 border-solid bg-whiteEdgar border-cascadingWhite hover:bg-creamyavocardo dark:hover:bg-creamyavocardo dark:hover:text-midnightexpress hover:border-milkFoam transition-all duration-300 text-saltBoxBlue hover:text-midnightExpress dark:text-white dark:bg-blueZodiac dark:border-crowBlack'
        onClick={handleClick}
      >
        {SelectedLanguageComponent && <SelectedLanguageComponent title={lang} className='w-full h-full' />}
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {languages.map(({ code, title, Component }, index) => (
          <MenuItem className='icon-flag-wrapper' key={index} onClick={() => toggleLang(code)}>
            <Component key={code} title={title} className='icon-flag' />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
