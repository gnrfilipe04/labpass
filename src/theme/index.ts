import { extendTheme } from 'native-base'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// extend the theme
export const theme = extendTheme({ 
  config,
  colors: {
    primary: {
      '50': '#fafafa',
      '500': '#71717a',
      '900': '#070808',
    },
    secondary: {
      '400':'#9333ea',
    },
  },
})

  type MyThemeType = typeof theme;
  
  declare module 'native-base' {
    type ICustomTheme = MyThemeType
  }
