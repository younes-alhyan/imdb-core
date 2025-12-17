import axios from "axios";
import type { Operation } from "../types/internal.js";

const BASE_URL = "https://api.graphql.imdb.com/";

interface GraphQLResponse<T> {
  data: T;
  errors?: any[];
}

export const imdbGraphQL = async <T>(
  cookie: string,
  { methode, operationName, query, variables = {}, extensions = {} }: Operation
): Promise<GraphQLResponse<T>> => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Cookie: cookie,
  };

  try {
    const response =
      methode === "get"
        ? await axios.get(BASE_URL, {
            headers,
            params: {
              operationName,
              variables: JSON.stringify(variables),
              extensions: JSON.stringify(extensions),
            },
          })
        : await axios.post(
            BASE_URL,
            { operationName, query, variables, extensions },
            { headers }
          );

    return response.data as GraphQLResponse<T>;
  } catch (error: any) {
    throw error.response?.data?.errors ?? error;
  }
};
