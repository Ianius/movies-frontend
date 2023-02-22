import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearch } from '../hooks/movie';

import MovieCategoryGrid from './MovieCategoryGrid';
import ErrorDisplay from './ErrorDisplay';
import PageSelector from './PageSelector';

interface Props {
    query: string;
}

const SearchResults = ({ query }: Props) => {
    const [page, setPage] = useState(1);

    const { data, error } = useSearch(query, page);

    if (error) {
        return <ErrorDisplay error={error} />;
    }

    return (
        <VStack
            pb='2em'
            spacing='0px'
        >
            <MovieCategoryGrid
                title='Search results'
                movies={data}
            />

            { data &&
                <PageSelector 
                    page={page}
                    totalPages={data.total_pages}
                    selectPage={setPage}
                    justify='center'
                />
            }
        </VStack>
    );
};

export default SearchResults;