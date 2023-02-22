export interface Movie {
    poster_path?: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path?: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    total_results: number;
    total_pages: number;
}

export interface MovieGenre {
    id: number,
    name: string;
}

export type DefaultResponse = { error: boolean, status_message: string; };

export interface MoviePageResponse {
    page: number;
    results: Movie[];
}

export interface MovieImageResponse {
    url: string;
}

export interface MovieSearchResponse extends MoviePageResponse {
    total_results: number;
    total_pages: number;
}

export interface MovieGenresResponse {
    genres: {
        id: number;
        name: string;
    }[];
}

export interface MovieDetails {
    adult: boolean,
    backdrop_path?: string;
    budget: number,
    genres: MovieGenre[];
    homepage?: string;
    id: number,
    imdb_id?: string;
    original_language: string;
    original_title: string;
    overview?: string;
    popularity: number;
    poster_path?: string;
    production_companies: {
        name: string;
        id: number,
        logo_path?: string;
        origin_country: string;
    }[],
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[],
    release_date: string;
    revenue: number;
    runtime?: number;
    spoken_languages: {
        iso_639_1: string;
        name: string;
    }[],
    status: string;
    tagline?: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Member {
    adult: boolean;
    gender?: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    credit_id: string;
}

export interface CastMember extends Member {
    cast_id: number;
    character: string;
    order: number;
}

export interface CrewMember extends Member {
    department: string;
    job: string;
}

export interface MovieCredits {
    id: number;
    cast: CastMember[];
    crew: CrewMember[];
}

export interface AuthResponse extends DefaultResponse {
    token: string;
    username: string;
}

export interface MovieReviewsResponse {
    page: number;
    reviews: { username: string; review: string }[];
    page_count: number;
}

export interface MovieListsResponse {
    lists: {
        name: string;
    }[];
}

export interface ListResponse {
    id: number;
    name: string;
}

export interface ListDetailsResponse {
    id: number;
    results: {
        id: number;
        movie_id: number;
    }[];
}

export interface AllListsResponse extends DefaultResponse {
    favorites_id: number;
    watchlist_id: number;
    results: ListResponse[];
}

export interface ItemStatusResponse extends DefaultResponse {
    item_status: boolean;
}
