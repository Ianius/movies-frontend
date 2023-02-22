import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
    ratio?: number;
}

const AspectRatioConstraint = ({ ratio = 1, children, ...rest }: Props) => {
    return (
        <Box
            {...rest}
        >
            <Box
                h='0'
                w='100%'
                overflow='hidden'
                position='relative'
                paddingTop={`${(1 / ratio) * 100}%`}
            >
                {children}
            </Box>
        </Box>
    );
};

export default AspectRatioConstraint;
