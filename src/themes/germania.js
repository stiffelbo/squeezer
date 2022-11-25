//Theme
import MarcellusRegular from '../fonts/MarcellusRegular.ttf';

import {
  createTheme,
} from '@mui/material/styles';

const marcellus = {
  fontFamily: 'MarcellusRegular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('MarcellusRegular'),
    local('MarcellusRegular'),
    url(${MarcellusRegular}) format('ttf')
  `,
};

export const themeGermania = createTheme({
  typography: {
    fontFamily: [
      'Marcellus',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize : 14,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [marcellus],
      },
    },
  },
  palette :{
    germania : {
      main : '#E6B947',
      dark : '#9b7618',
    }
  }
});