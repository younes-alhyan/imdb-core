export type HttpMethod = "get" | "post";

export interface Operation {
  methode: HttpMethod;
  operationName: string;
  query?: string;
  variables?: Record<string, any>;
  extensions?: Record<string, any>;
}