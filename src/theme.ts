import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    fonts: {
        heading: `'Roboto', sans-serif`,
        body: `'Roboto', sans-serif`
    },

    colors: {
        lightBackground: '#f8f8f8',
        darkBackground: '#131c2e',
        lightNavbar: '#f0f0f0',
        darkNavbar: 'rgb(14, 23, 38)'
    },

    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false
    },

    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: mode('lightBackground', 'darkBackground')(props)
            }
        })
    }
});

export default theme;
