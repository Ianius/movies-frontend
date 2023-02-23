import { QueryFunctionContext, QueryKey, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AuthResponse, DefaultResponse } from "../interfaces/movies";
import { useCallback, useState, useEffect } from "react";
import { fetchJSON } from "../util/fetch";
import { AuthEndpoint } from "../config/api";

interface Credentials {
    username: string,
    password: string;
}

interface Options {
    onSuccess?: (data: AuthResponse) => void;
    onError?: (error: string) => void;
}

const setUser = (user?: AuthResponse) => {
    if (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
    } else {
        window.localStorage.removeItem("user");
    }

    window.dispatchEvent(new Event("user"));
};

const onAuthResponse = (options?: Options) => (res: AuthResponse) => {
    const { error, status_message } = res;

    if (error) {
        options?.onError?.(status_message);
        setUser(undefined);
    } else {
        setUser(res);
        options?.onSuccess?.(res);
    }
};

export const useLogin = (options?: Options) => {
    return useMutation<AuthResponse, Error, Credentials>({
        mutationFn: ({ username, password }) => 
            fetchJSON(`${AuthEndpoint}/login`, {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" }
            }),

        onSuccess: onAuthResponse(options)
    });
};

export const useLogout = () => {
    return () => setUser(undefined);
};

export const useRegister = (options?: Options) => {
    return useMutation<AuthResponse, Error, Credentials>({
        mutationFn: ({ username, password }) => 
            fetchJSON(`${AuthEndpoint}/register`, {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" }
            }),

        onSuccess: onAuthResponse(options)
    });
};

export const useUser = () => {
    const readUser = useCallback(() => {
        const data =  window.localStorage.getItem("user");
        return data ? JSON.parse(data) : undefined;
    }, []);

    const [user, setUser] = useState<AuthResponse | undefined>(readUser);

    const userChanged = useCallback(() => setUser(readUser()), [readUser]);

    useEffect(() => {
        window.removeEventListener("user", userChanged);
        window.addEventListener("user", userChanged);
    }, [userChanged]);

    return user;
};

const handleAuthError = (data: DefaultResponse, logout: () => void) => {
    if (data && data.error && data.status_message === "Invalid token") {
        logout();
    }
};

export type UseAuthQueryFunction<T = unknown, TQueryKey extends QueryKey = QueryKey> = (context: QueryFunctionContext<TQueryKey>, user: AuthResponse) => T | Promise<T>;
export type UseAuthQueryOptions <TQueryFnData, TError, TData, TQueryKey extends QueryKey> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryFn'> & { queryFn: UseAuthQueryFunction<TQueryFnData, TQueryKey>};

export const useAuthQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> (options: UseAuthQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {
    const user = useUser();
    const logout = useLogout();

    const result = useQuery<TQueryFnData, TError, TData, TQueryKey>({
        ...options,
        queryFn: context => options.queryFn(context, user!),
        enabled: user !== undefined,
        onSuccess: (data) => {
            handleAuthError(data as DefaultResponse, logout);
            options?.onSuccess?.(data);
        }
    });

    return result;
};

export type UseAuthMutationFunction<TData, TVariables> = (variables: TVariables, user: AuthResponse) => Promise<TData>;
export type UseAuthMutationOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn"> & { 
    mutationFn: UseAuthMutationFunction<TData, TVariables>,
    onNotLoggedIn?: () => void;
};

export const useAuthMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown> (options: UseAuthMutationOptions<TData, TError, TVariables, TContext>) => {
    const user = useUser();
    const logout = useLogout();

    const result = useMutation<TData, TError, TVariables, TContext>({
        ...options,
        mutationFn: variables => {
            if (!user) options.onNotLoggedIn?.();
            return user ? options.mutationFn(variables, user) : new Promise(() => ({}));
        },
        onSuccess: (data, ...other) => {
            handleAuthError(data as DefaultResponse, logout);
            options.onSuccess?.(data, ...other);
        }
    });

    return result;
};
