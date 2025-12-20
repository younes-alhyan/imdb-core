export type HttpMethod = "get" | "post";

export interface Operation {
  methode: HttpMethod;
  operationName: string;
  query?: string;
  variables?: (options: any) => Record<string, any>;
  extensions?: Record<string, any>;
}
