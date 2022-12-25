import { Center, Image, Link, useColorModeValue } from "@chakra-ui/react";

const Footer = ({ h }: { h: number }) => {
    return (
        <Center
            p={0}
            h={`${h}px`}
            m='0px'
            bg={useColorModeValue('white', 'rgb(24, 35, 56)')}
        >
            <Link href='https://www.themoviedb.org/'>
                <Image
                    src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                    w='100%'
                    h='100%'
                />
            </Link>
        </Center>
    );
};

export default Footer;
