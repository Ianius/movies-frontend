import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    fonts: {
        heading: `'Raleway', sans-serif`,
        body: `'Roboto', sans-serif`,
    },

    colors: {
        mainLight: '#7529cc',
        mainDark: '#965ed6',

        // darkAccent: '#221f47',
        darkAccent: '#2a2842',
        lightAccent: '#ffffff',

        bodyLight: '#ffffff',
        bodyDark: '#0d0c1d',

        navbarDark: '#0d0c1d',
        navbarLight: '#ffffff',
    },

    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },

    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: mode('bodyLight', 'bodyDark')(props),
                color: mode('gray.700', 'gray.300')(props),
            }
        })
    }
});

export default theme;
