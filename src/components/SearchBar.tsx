import { SearchIcon } from '@chakra-ui/icons';
import { useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import InputField from './InputField';

const SearchBar = () => {
    const navigate = useNavigate();
    const placeholderColor = useColorModeValue('darkAccent', 'lightAccent');

    const [searchText, setSearchText] = useState("");

    const onSubmit = () => searchText.length > 0 && navigate(`/search?q=${searchText}`);

    return (
        <InputField
            mx='20px'
            flex={1}
            text={searchText}
            setText={setSearchText}
            placeholder='Search movies'
            placeholderColor={placeholderColor}
            leftElement={<SearchIcon color={placeholderColor} opacity='0.2'/>}
            onTextSubmitted={onSubmit}
        />
    );
};

export default SearchBar;
