import { IconType } from "react-icons/lib/cjs";
import { IconButton, Icon, Tooltip, useColorMode, forwardRef } from "@chakra-ui/react";

interface Props {
    icon: IconType;
    isSelected?: boolean;
    onSelected?: () => void;
    tooltipText: string;
}

const SelectableButton = forwardRef<Props, 'button'>(({ icon, isSelected, onSelected, tooltipText }, ref) => {
    const { colorMode } = useColorMode();
    const bgColor = { light: "gray.300", dark: "gray.700" };
    const hoverColor = { light: "gray.500", dark: "gray.500" };

    return (
        <Tooltip
            label={tooltipText} 
            placement="bottom" 
            hasArrow
        >
            <IconButton
                ref={ref}
                aria-label={tooltipText}
                size="lg"
                icon={<Icon as={icon} />}
                onClick={onSelected}
                transition="0.2s"
                _active={{ transform: "scale(0.96)" }}
                _hover={{ bg: isSelected ? 'purple.300' : hoverColor[colorMode] }}
                bg={isSelected ? "purple.500" : bgColor[colorMode]}
                borderRadius='full'
                color={isSelected ? "white" : "gray.600"}
            />
        </Tooltip>
    );
});

export default SelectableButton;
