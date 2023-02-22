import { PopoverProps, Box, Popover, PopoverTrigger } from "@chakra-ui/react";

interface Props extends PopoverProps {
    children: React.ReactNode;
    triggerElement: React.ReactNode;
}

const PopoverWindow = ({ children, triggerElement, ...other }: Props) => {
    return (
        <Popover
            {...other}
        >
            <PopoverTrigger>
                <Box>
                    {triggerElement}
                </Box>
            </PopoverTrigger>

            {children}
        </Popover>
    );
};

export default PopoverWindow;
