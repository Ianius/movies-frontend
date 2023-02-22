import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, useQueryClient, QueryClient } from "@tanstack/react-query";
import { MoviesEndpoint } from "../config/api";
import { MovieImageResponse, DefaultResponse, MovieDetails, Movie, AllListsResponse, ItemStatusResponse, ListDetailsResponse, MovieCredits, MovieGenresResponse, MoviePageResponse, MovieReviewsResponse, MovieSearchResponse } from "../interfaces/movies";
import { fetchJSON } from "../util/fetch";
import { useAuthMutation, UseAuthMutationOptions, useAuthQuery } from "./auth";
import { useParams } from "react-router-dom";

interface UseImageResult {
    url?: string;
    isLoading: boolean;
}

export const useReviews = (movieId: number, page: number) => 
    useQuery<MovieReviewsResponse>([movieId, page], () => 
        fetchJSON(`${MoviesEndpoint}/movie/${movieId}/reviews?page=${page}`)
    );

const useImage = (size: string, filePath: string, options?: UseQueryOptions<any, any>): UseImageResult => {
    const { data, isLoading } = useQuery<MovieImageResponse, Error>({
        ...options,
        queryFn: () => fetchJSON(`${MoviesEndpoint}/image?size=${size}&filePath=${filePath}`),
        queryKey: ['image', filePath],
    });

    return { url: data?.url, isLoading };
};

export const usePosterImage = (size: string, movie?: Movie | MovieDetails): UseImageResult => {
    const hasPoster = movie?.poster_path !== undefined;
    const posterPath = movie?.poster_path ?? '';
    return useImage(size, posterPath, { enabled: hasPoster });
};

export const usePopular = () =>
    useQuery<MoviePageResponse, Error>(["popular_movies"], () => 
        fetchJSON(`${MoviesEndpoint}/popular`)
    );

export const useTrending = () =>
    useQuery<MoviePageResponse, Error>(["trending_movies"], () => 
        fetchJSON(`${MoviesEndpoint}/trending`)
    );

export const useSimilar = (movieId: number) =>
    useQuery<MoviePageResponse, Error>(["similar_movies"], () => 
        fetchJSON(`${MoviesEndpoint}/movie/${movieId}/similar`)
    );

export const useSearch = (query: string, page: number = 1, options?: UseQueryOptions<any, any>) =>
    useQuery<MovieSearchResponse, Error>({
        ...options,
        queryFn: () => fetchJSON(`${MoviesEndpoint}/search?q=${query}&page=${page}`),
        queryKey: [query, page]
    });

export const useGenres = () => {
    const { data = { genres: [] }, ...other } = useQuery<MovieGenresResponse, Error>(["movie_genres"], () => 
        fetchJSON(`${MoviesEndpoint}/genres`)
    );

    return { data, ...other };
}

export const useMovie = (movieId: number) =>
    useQuery<MovieDetails, Error>(["movie", movieId], () => 
        fetchJSON(`${MoviesEndpoint}/movie/${movieId}`)
    );

const useParamsId = () => {
    const params = useParams<Record<'id', string>>();
    return parseInt(params.id ?? "-1");
};

export const useParamsMovie = () => useMovie(useParamsId());
export const useParamsMovieCredits = () => useCredits(useParamsId());
export const useParamsMovieSimilar = () => useSimilar(useParamsId());

export const useCredits = (movieId: number) => 
    useQuery<MovieCredits, Error>(["credits", movieId], () => 
        fetchJSON(`${MoviesEndpoint}/movie/${movieId}/credits`)
    );


export const usePostReview = (options?: UseMutationOptions<{}, Error, {}>) => {
    type Variables = { token: string, movieId: number, review: string }
    return useMutation<{}, Error, Variables>({
        ...options,
        mutationFn: ({ token, movieId, review }) =>  
            fetchJSON(`${MoviesEndpoint}/reviews`, {
                method: 'POST',
                body: JSON.stringify({ movieId, review }),
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            }),
    });
}

type UseCreateListVariables = { name: string };

export const useCreateList = (options?: Omit<UseAuthMutationOptions<DefaultResponse, Error, UseCreateListVariables>, "mutationFn">) => {
    return useAuthMutation<DefaultResponse, Error, UseCreateListVariables>({
        ...options,
        mutationFn: ({ name }, user) =>  
            fetchJSON(`${MoviesEndpoint}/list`, {
                method: 'POST',
                body: JSON.stringify({ name }),
                headers: { 
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json' 
                }
            })
    });
};

type UseDeleteListVariables = { id: number };

export const useDeleteList = (options?: Omit<UseAuthMutationOptions<DefaultResponse, Error, UseDeleteListVariables>, "mutationFn">) => {
    return useAuthMutation<DefaultResponse, Error, UseDeleteListVariables>({
        ...options,
        mutationFn: ({ id }, user) =>  
            fetchJSON(`${MoviesEndpoint}/list/?id=${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${user.token}`,
                }
            })
    });
};

type UseModifyListVariables = { listId: number, movieId: number };
type UseModifyListOptions = Omit<UseAuthMutationOptions<DefaultResponse, Error, UseModifyListVariables>, 'mutationFn'>;

const onListModifySuccess = (data: DefaultResponse, listId: number, queryClient: QueryClient) => {
    const { error } = data;

    if (!error) {
        queryClient.refetchQueries({ queryKey: ["item_status"] });
        queryClient.refetchQueries({ queryKey: ["list", "details", listId] });
    }
};

export const useAddToList = (options?: UseModifyListOptions) => {
    const queryClient = useQueryClient();

    return useAuthMutation<DefaultResponse, Error, UseModifyListVariables>({
        ...options,
        mutationFn: ({ listId, movieId }, user) =>  
            fetchJSON(`${MoviesEndpoint}/list/${listId}`, {
                method: 'POST',
                body: JSON.stringify({ movieId }),
                headers: { 
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json' 
                }
            }),

        onSuccess: (data, variables, ...args) => {
            onListModifySuccess(data, variables.listId, queryClient);
            options?.onSuccess?.(data, variables, ...args);
        }
    });
}

export const useDeleteFromList = (options?: UseModifyListOptions) => {
    const queryClient = useQueryClient();

    return useAuthMutation<DefaultResponse, Error, UseModifyListVariables>({
        ...options,
        mutationFn: ({ listId, movieId }, user) =>  
            fetchJSON(`${MoviesEndpoint}/list/${listId}?item_id=${movieId}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${user.token}`,
                }
            }),


        onSuccess: (data, variables, ...args) => {
            onListModifySuccess(data, variables.listId, queryClient);
            options?.onSuccess?.(data, variables, ...args);
        }
    });
};

export const useModifyList = (options?: Omit<UseAuthMutationOptions<DefaultResponse, Error, UseModifyListVariables>, 'mutationFn'>) => {
    return {
        add: useAddToList(options),
        delete: useDeleteFromList(options)
    };
};

export const useItemStatus = (listId: number, itemId: number) => {
    return useAuthQuery<ItemStatusResponse>({
        queryKey: ["item_status", listId, itemId],
        queryFn: (_, user) => 
            fetchJSON(`${MoviesEndpoint}/list/${listId}/item_status?item_id=${itemId}`, {
                headers: { 
                    'Authorization': `Bearer ${user?.token}`
                }
            }),
    });
};

export const useItemStatusAny = (itemId: number) => {
    return useAuthQuery<ItemStatusResponse>({
        queryKey: ["item_status", "any", itemId],
        queryFn: (_, user) => 
            fetchJSON(`${MoviesEndpoint}/list/item_status_any?item_id=${itemId}`, {
                headers: { 
                    'Authorization': `Bearer ${user?.token}`
                }
            })
    });
};

export const useLists = () => {
    return useAuthQuery<AllListsResponse, Error>({
        queryKey: ["list", "all"],
        queryFn: (_, user) =>
            fetchJSON(`${MoviesEndpoint}/list/all`, {
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            }),
    });
};

// Returns only the user-created lists, excluding the default ones
export const useUserLists = () => {
    const { data, ...other } = useLists();

    if (data) {
        data.results = data.results.filter(({ name }) => name !== "Favorites" && name !== "Watchlist");
    }

    return { data, ...other };
};

export const useListDetails = (listId: number) => {
    return useAuthQuery<ListDetailsResponse, Error>({
        queryKey: ["list", "details", listId],
        queryFn: (_, user) => 
            fetchJSON(`${MoviesEndpoint}/list/${listId}/details`, {
                headers: { 
                    'Authorization': `Bearer ${user.token}`
                }
            }),
    });
};
