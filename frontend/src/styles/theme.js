import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#ff9694',
            main: '#d16666',
            dark: '#9c373c',
            contrastText: '#e8eddf',
        },
        secondary: {
            light: '#fffe8c',
            main: '#f5cb5c',
            dark: '#bf9a2b',
            contrastText: '#242423',
        },
        neutral: {
            main: '#2D3047',
            contrastText: '#e8eddf',
        },
        background: {
            default: '#fafafa',
        },
    },
    typography: {
        fontSize: 16,
        fontWeightRegular: 500,
    }
});

export default theme;