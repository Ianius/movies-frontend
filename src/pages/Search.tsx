import { useSearchParams } from 'react-router-dom';

import SearchResults from '../components/SearchResults';

const Search = () => {
    const [params] = useSearchParams();
    const query = params.get('q') ?? '';

    return (
        <SearchResults
            query={query}
        />
    );
};

export default Search;
