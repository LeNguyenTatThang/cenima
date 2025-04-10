import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#205082',
            light: '#9bbad6',
            dark: '#1a3a5f',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#6bc3d1',
            light: '#c9dceb',
            dark: '#4d99a5',
            contrastText: '#ffffff',
        },
        error: {
            main: '#a44641',
            light: '#dfa3a2',
            dark: '#7e3632',
        },
        warning: {
            main: '#9b8469',
            light: '#dfdab4',
            dark: '#73614e',
        },
        background: {
            default: '#f9f9fb',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"IBM Plex Sans", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 500,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#333333',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    borderRight: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                    borderRadius: 8,
                },
            },
        },
    },
})

export default theme
