import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
        main: '#3498db', // Deep blue
        light: '#56b3fa', // Lighter blue
        dark: '#1a6da5', // Darker blue
        contrastText: '#ffffff', // White text for contrast
      },
      secondary: {
        main: '#f7dc6f', // Warm yellow
        light: '#ffff8c', // Lighter yellow
        dark: '#c6a700', // Darker yellow
        contrastText: '#000000', // Black text for contrast
      },
    error: {
      main: '#ef5350', // Red
      light: '#e57373', // Lighter red
      dark: '#d32f2f', // Darker red
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffa726', // Orange
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    info: {
      main: '#29b6f6', // Cyan
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: '#ffffff',
    },
    success: {
      main: '#66bb6a', // Green
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212', // Very dark gray for the app background
      paper: '#1e1e1e', // Slightly lighter gray for surfaces like cards
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)', // High-emphasis white text
      secondary: 'rgba(255, 255, 255, 0.6)', // Medium-emphasis white text
      disabled: 'rgba(255, 255, 255, 0.38)', // Low-emphasis white text
    },
    divider: 'rgba(255, 255, 255, 0.12)', // Subtle divider lines
  },
});

export default darkTheme;
