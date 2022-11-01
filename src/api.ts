// TODO: Change this later
const API_KEY = '129dbef32e22e193a1b9828c08a68bb9';
const IMAGE_URL = 'https://image.tmdb.org/t/p/';

export namespace API {
    export const fetchPopularMovies = async () => {
        return (
            (await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)).json()
        );
    };

    export const fetchTrendingMovies = async () => {
        return (
            (await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)).json()
        );
    };

    export const getImageURL = (size: string, filePath: string) => {
        return `${IMAGE_URL}${size}${filePath}`;
    };

    export const getGenres = async () => {
        return (
            (await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)).json()
        );
    };
}

