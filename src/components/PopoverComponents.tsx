import { PopoverContent, PopoverContentProps, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, PopoverFooter, useColorModeValue } from "@chakra-ui/react";

interface Props extends PopoverContentProps { 
    header: React.ReactNode; 
    footer?: React.ReactNode; 
    children: React.ReactNode; 
}

const PopoverComponents = ({ header, footer, children, ...other }: Props) => {
    return (
        <PopoverContent
            bg={useColorModeValue('lightAccent', 'darkAccent')}
            border='none'
            shadow='md'
            {...other}
        >
            <PopoverArrow/>
            <PopoverCloseButton/>
            <PopoverHeader>{header}</PopoverHeader>
            <PopoverBody>{children}</PopoverBody>
            { footer &&
                <PopoverFooter>{footer}</PopoverFooter>
            }
        </PopoverContent>
    );
};

export default PopoverComponents;
