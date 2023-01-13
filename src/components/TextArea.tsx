import { Box, Input, InputLeftElement, InputGroup, InputGroupProps, useColorMode, useColorModeValue, forwardRef } from '@chakra-ui/react';
import { ChangeEvent, useState, KeyboardEvent } from "react";

interface Props extends InputGroupProps {
    bg?: string;
    type?: string;
    leftElement?: React.ReactNode;
    placeholder?: string;
    onTextSubmitted?: (text: string) => void;
    placeholderColor?: string;
}

const TextArea = ({ 
    bg,
    type = 'text', 
    onTextSubmitted, 
    leftElement,
    placeholder, 
    placeholderColor,
    ...other
}: Props) => {
    const [text, setText] = useState('');
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('lightAccent', 'darkAccent');
    const defaultPlaceholderColor = useColorModeValue('darkAccent', 'lightAccent');

    const handleSearchTextChanged = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => (e.key === "Enter" && onTextSubmitted) && onTextSubmitted(text);

    return (
        <InputGroup
            {...other}
            bg={undefined}
        >
            {
                leftElement && 
                    <InputLeftElement pointerEvents='none'>
                        {leftElement}
                    </InputLeftElement>
            }

            <Input
                bg={bg ?? bgColor}
                type={type}
                color={useColorModeValue('black', 'white')}
                placeholder={placeholder}
                border={colorMode === 'dark' ? 'none' : undefined}
                borderRadius='md'
                value={text}
                onChange={handleSearchTextChanged}
                focusBorderColor='purple.400'
                onKeyDown={handleKeyDown}
                // _focus={{ border: 'none' }}
                // _selected={{ border: 'none' }}
                _placeholder={{ color: { placeholderColor: placeholderColor ?? defaultPlaceholderColor }, opacity: 0.8 }}
            />
        </InputGroup>
    );
};

export default TextArea;
