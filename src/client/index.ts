import { ImdbClient } from "./imdbClient.js";
import { ImmutableListClient } from "./immutableListClient.js";
import { EditableListClient } from "./editableListClient.js";

export const createImmutableList = (
  id: string,
  endpoint: string,
  data: any,
  getCookie: () => string
) => new ImmutableListClient(id, endpoint, data, getCookie);

export const createEditableList = (
  id: string,
  endpoint: string,
  data: any,
  getCookie: () => string
) => new EditableListClient(id, endpoint, data, getCookie);

export const createImdb = () => new ImdbClient();
