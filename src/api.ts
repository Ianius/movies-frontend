import { MoviePageResponse } from "./interfaces/movies";

const IMAGE_URL = 'https://image.tmdb.org/t/p/';
// const BASE_URL = 'https://movies-backend-production-9768.up.railway.app/api/movies';
const BASE_URL = 'http://localhost:8000/api/movies';

export namespace API {
    export async function popular(): Promise<MoviePageResponse> {
        return (
            (await fetch(`${BASE_URL}/popular`)).json()
        );
    };

    export async function trending() {
        return (
            (await fetch(`${BASE_URL}/trending`)).json()
        );
    };

    export function buildImageURL(size: string, filePath: string) {
        return `${IMAGE_URL}${size}${filePath}`;
    };

    export async function genres() {
        return (
            (await fetch(`${BASE_URL}/genres`)).json()
        );
    };

    export async function search(query: string): Promise<MoviePageResponse> {
        return (
            (await fetch(`${BASE_URL}/search?q=${query}`)).json()
        );
    };

    export async function movie(movieId: string) {
        return (
            (await fetch(`${BASE_URL}/movie/${movieId}`)).json()
        );
    }

    export async function similarMovies(movieId: string) {
        return (
            (await fetch(`${BASE_URL}/movie/${movieId}/similar`)).json()
        );
    }

    export async function credits(movieId: string) {
        return (
            (await fetch(`${BASE_URL}/credits/${movieId}`)).json()
        );
    }
}

