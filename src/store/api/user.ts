import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Tag,User } from "../types";
import baseApi from ".";

interface LoginRequest {
    email: string
    password: string
}

const userApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        authenticate: builder.mutation<User,LoginRequest>({
            query: (credentials) => ({
                url: 'authenticate',
                method: 'POST',
                body: credentials,
              }),
        })
    })
});

export const {
    useAuthenticateMutation
} = userApi;

export default userApi;
