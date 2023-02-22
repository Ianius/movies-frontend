import { Center } from '@chakra-ui/react';

interface Props {
    error: Error;
}

const ErrorDisplay = ({ error }: Props) => {
    return (
        <Center 
            flex={1}
        >
            Error! {error.message}
        </Center>
    );
};

export default ErrorDisplay;
