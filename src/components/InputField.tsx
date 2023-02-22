import { Input, InputLeftElement, InputGroup, InputGroupProps, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, forwardRef } from "react";

interface Props extends InputGroupProps {
    bg?: string;
    text: string;
    setText: (text: string) => void;
    type?: string;
    contrastBg?: boolean;
    onTextClear?: () => void;
    leftElement?: React.ReactNode;
    placeholder?: string;
    onTextSubmitted?: (text: string) => void;
    placeholderColor?: string;
}

const InputField = forwardRef<HTMLInputElement, Props>(({ 
    bg,
    text,
    setText,
    type = "text", 
    contrastBg,
    onTextSubmitted, 
    leftElement,
    placeholder, 
    placeholderColor,
    ...other
}, ref) => {
    const { colorMode }           = useColorMode();
    const defaultBgColor          = useColorModeValue("lightAccent", "darkAccent");
    const contrastBgColor         = useColorModeValue("lightAccent", "rgba(255, 255, 255, 0.05)");
    const bgColor                 = bg ?? (contrastBg ? contrastBgColor : defaultBgColor);
    const defaultPlaceholderColor = useColorModeValue("darkAccent", "lightAccent");

    const color  = { dark: "white",   light: "black" };
    const border = { dark: "none",    light: undefined };
    const shadow = { dark: undefined, light: "sm" };

    const handleTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setText(newText);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => (e.key === "Enter" && onTextSubmitted) && onTextSubmitted(text);

    return (
        <InputGroup
            {...other}
        >
            {
                leftElement && 
                    <InputLeftElement pointerEvents="none">
                        {leftElement}
                    </InputLeftElement>
            }

            <Input
                bg={bgColor}
                ref={ref}
                type={type}
                color={color[colorMode]}
                placeholder={placeholder}
                border={border[colorMode]}
                shadow={shadow[colorMode]}
                borderRadius="md"
                value={text}
                onChange={handleTextChanged}
                focusBorderColor="purple.400"
                onKeyDown={handleKeyDown}
                // _focus={{ border: "none" }}
                // _selected={{ border: "none" }}
                _placeholder={{ color: { placeholderColor: placeholderColor ?? defaultPlaceholderColor }, opacity: 0.8 }}
            />
        </InputGroup>
    );
});

export default InputField;
