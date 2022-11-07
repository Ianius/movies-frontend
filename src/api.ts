// TODO: Change this later
const IMAGE_URL = 'https://image.tmdb.org/t/p/';
const BASE_URL = 'http://localhost:8000/api/movies';

export namespace API {
    export const popular = async () => {
        // return (
        //     (await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)).json()
        // );
        return (
            (await fetch(`${BASE_URL}/popular`)).json()
        );
    };

    export const trending = async () => {
        return (
            (await fetch(`${BASE_URL}/trending`)).json()
        );
    };

    export const buildImageURL = (size: string, filePath: string) => {
        return `${IMAGE_URL}${size}${filePath}`;
    };

    export const genres = async () => {
        return (
            (await fetch(`${BASE_URL}/genres`)).json()
        );
    };
}

