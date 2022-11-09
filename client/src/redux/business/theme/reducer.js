const INIT = {
  current: 'default',
  themes: {
    default: {
      palette: {
        mode: 'light',
        primary: {
          main: '#ffffff'
        }
      },
      button: {
        fontSize: '0.875rem'
      }
    },
    dim: {
      components: {
        MuiGrid: {
          defaultProps: {
            backgroundColor: '#15202b',
          }
        },
        MuiTypography: {
          defaultProps: {
            color: '#f7f9f9',
          }
        }
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#15202b'
        }
      },
    },
  },
  lightsOut: {
    palette: {
      mode: 'light',
      primary: {
        main: '#000000'
      }
    },
  },
  common: {
    typography: {
      htmlFontSize: 10,
      fontSize: 50,
      fontFamily: "Helvetica,Roboto,Arial,sans-serif",
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
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 650,
        md: 988,
        lg: 1077,
        xl: 1265,
      },
    },
  },
};

export default (state = INIT) => state;
