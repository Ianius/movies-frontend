import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, KeyboardEvent } from "react";

import TextArea from './TextArea';

const SearchBar = () => {
    const navigate = useNavigate();
    const placeholderColor = useColorModeValue('darkAccent', 'lightAccent');

    const onSubmit = (text: string) => text.length > 0 && navigate(`/search?q=${text}`);

    return (
        <TextArea
            flex={1}
            mx='20px'
            placeholder='Search movies'
            placeholderColor={placeholderColor}
            leftElement={
                <SearchIcon
                    color={placeholderColor}
                    opacity='0.2'
                />
            }

            onTextSubmitted={onSubmit}
        />
    );
};

export default SearchBar;
