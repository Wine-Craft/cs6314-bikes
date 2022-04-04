import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ff8100',
        },
        secondary: {
            main: '#5fe0b7',
        },
        background: {
            default: '#fafafa',
        },
    },
});

export default theme;