import { Link, Button, Input, VStack, HStack, Heading, Box } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const onLogInClicked = () => navigate('/login');

    return (
        <VStack
            align='left'
            gap='0.5em'
        >
            <Heading size='md' mb='1em'>Join FilmFeast!</Heading>
            <Heading size='sm'>Username</Heading>
            <Input/>
            <Heading size='sm'>Password</Heading>
            <Input/>

            <Button mb='2em'>Log In</Button>

            <Box>
                {"Have an account already? "}
                <Link color='blue.300' onClick={onLogInClicked}>Log In</Link>
            </Box>
        </VStack>
    );
};

export default Signup;
