export const themeStyles = {
  breakpoints: {
    values: {
      xs: 500,
      sm: 710,
      md: 1020,
      lg: 1110,
      xl: 1295,
    },
  },
  palette: {
    mode: 'light',
    common: {
      black: '#1976d2',
      white: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#000000',
    },
    primary: {
      main: '#ffd400',
      secondary: '#00ba7c',
      contrastText: '#ffd400'
    },
    neutral: {
      main: '#ffd400',
    },
    orangeAccent: {
      main: '#ff7a00',
    },
    greenAccent: {
      main: '#00ba7c',
    },
    text: {
      primary: '#000000'
    },
    action: {
      active: '#0f1419'
    }
  },
  typography: {
    fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: '4rem',
    },
    h2: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
}
