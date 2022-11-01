import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    fonts: {
        // heading: 'Hack',
        // body: 'Montserrat'
    },

    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false
    },

    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: mode('F1FAEE', '#131c2e')(props)
            }
        })
    }
});

export default theme;
