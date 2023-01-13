import { VStack, Heading, Center, Image, Link, useColorMode, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
    const { colorMode } = useColorMode();

    return (
        <VStack
            w='100%'
            py='20px'
            // bg={`rgba(${colorMode === 'dark' ? '230, 230, 250' : '30, 30, 30'}, 1)`}
            bg={useColorModeValue('rgb(30, 30, 30)', 'darkAccent')}
            color='white'
            justify='center'
        >
            <Heading size='xs'>Made with</Heading>

            <Link href='https://www.themoviedb.org/'>
                <Image
                    src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                    h='30px'
                    w='100%'
                />
            </Link>
        </VStack>
    );
};

export default Footer;
