import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Raleway', sans-serif`,
    },

    colors: {
        light: {
            50: '#f7f7f7',
            100: '#e0e0e0',
            200: '#c5c5c5',
            300: '#a6a6a6',
            400: '#949494',
            500: '#7d7d7d',
            600: '#696969',
            700: '#545454',
            800: '#474747',
            900: '#333333'
        },
        dark: {
            50: '#f3f3f3',
            100: '#e7e7e8',
            200: '#c3c3c5',
            300: '#9f9fa1',
            400: '#56585b',
            500: '#0e1015',
            600: '#0d0e13',
            700: '#0b0c10',
            800: '#080a0d',
            900: '#07080a'
        },
        foreground: '#202B43',
        navbarDark: '#131c2e',
        navbarLight: '#333333',
        pink: {
            50: '#ffe5eb',
            100: '#f8bcc4',
            200: '#ed929e',
            300: '#e46779',
            400: '#dc3d52',
            500: '#c22339',
            600: '#981a2c',
            700: '#6e111f',
            800: '#440811',
            900: '#1e0003',
        },
        blue: {
            50: '#f6fbff',
            100: '#edf7ff',
            200: '#d1ecff',
            300: '#b5e1ff',
            400: '#7ecaff',
            500: '#47b3ff',
            600: '#40a1e6',
            700: '#3586bf',
            800: '#2b6b99',
            900: '#23587d'
        },
        cyan: {
            50: '#f5fdfd',
            100: '#eafbfb',
            200: '#cbf6f4',
            300: '#acf0ed',
            400: '#6ee4e0',
            500: '#30d9d3',
            600: '#2bc3be',
            700: '#24a39e',
            800: '#1d827f',
            900: '#186a67'
        },
    },

    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false
    },

    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: mode('light.500', '#0e1726')(props)
            }
        })
    }
});

export default theme;
