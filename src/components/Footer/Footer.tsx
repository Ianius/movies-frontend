import { Box, Center, Image, Link, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Center
            p={4}
            bg={useColorModeValue('white', 'rgb(24, 35, 56)')}
            mt='4px'
        >
            <Link href='https://www.themoviedb.org/'>
                <Image
                    src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                    h='40px'
                />
            </Link>
        </Center>
    );
};

export default Footer;