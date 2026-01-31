import type { Operation } from "../types/internal.js";

export const operationsMap = {
  AddToWatchList: {
    methode: "post",
    operationName: "AddIdToWatchlist",
    query: `mutation AddIdToWatchlist($id: ID!) {
    addItemToPredefinedList(
      input: { classType: WATCH_LIST, item: { itemElementId: $id } }
    ) {
      modifiedItem {
        itemId
      }
    }
  }`,
    variables: (id: string) => ({ id }),
  },

  RemoveFromWatchList: {
    methode: "post",
    operationName: "RemoveIdFromWatchlist",
    query: `mutation RemoveIdFromWatchlist($id: ID!) {
  removeElementFromPredefinedList(
    input: { classType: WATCH_LIST, itemElementId: $id }
  ) {
    modifiedItem {
      itemId
    }
  }
}`,
    variables: (id: string) => ({ id }),
  },

  AddToWatched: {
    methode: "post",
    operationName: "AddWatchedTitle",
    query: `mutation AddWatchedTitle($titleId: ID!) {
  addWatchedTitle(titleId: $titleId) {
    message {
      language
      value
    }
    success
  }
}`,
    variables: (titleId: string) => ({ titleId }),
  },

  RemoveFromWatched: {
    methode: "post",
    operationName: "RemoveWatchedTitle",
    query: `mutation RemoveWatchedTitle($titleId: ID!) {
  removeWatchedTitle(titleId: $titleId) {
    message {
      language
      value
    }
    remainingWatchedSourceTypes
    remainingReview {
      id
    }
    success
  }
}`,
    variables: (titleId: string) => ({ titleId }),
  },

  GetUserLists: {
    methode: "get",
    operationName: "YourListsSidebar",
    variables: (first: number = 10, locale: string = "en-US") => ({
      first,
      locale,
    }),
    extensions: {
      persistedQuery: {
        sha256Hash:
          "75a494af2aa5c310bb0347e014a46fabb9f274a87daec0ccb5ce76fbade2b866",
        version: 1,
      },
    },
  },

  GetPredefinedLists: {
    methode: "get",
    operationName: "YourPredefinedListsSidebar",
    variables: (
      isInFavPeopleWeblab: boolean = false,
      locale: string = "en-US"
    ) => ({
      isInFavPeopleWeblab,
      locale,
    }),
    extensions: {
      persistedQuery: {
        sha256Hash:
          "f48bec9c67c35718c357265ef8af84ca7e397348bc2a80912a01939350ab8884",
        version: 1,
      },
    },
  },

  GetLastVisited: {
    methode: "get",
    operationName: "RVI_Items",
    variables: (count: number = 10, locale: string = "en-US") => ({
      count,
      locale,
    }),
    extensions: {
      persistedQuery: {
        sha256Hash:
          "32eda43bfa1053f69036b945638fc4a0ae6cc4a2429de224b3185f8b0e37717b",
        version: 1,
      },
    },
  },

  CreateList: {
    methode: "post",
    operationName: "ListCreate",
    query: `mutation ListCreate($input: CreateListInput!) {
  createList(input: $input) {
    listId
  }
}`,
    variables: (
      name: string = "",
      listDescription: string = "",
      listType: "TITLES" | "PEOPLE" | "IMAGES" | "VIDEOS" = "TITLES",
      visibility: "PRIVATE" | "PUBLIC" = "PRIVATE",
      allowDuplicates: boolean = false
    ) => ({
      input: {
        name,
        listDescription,
        listType,
        visibility,
        allowDuplicates,
      },
    }),
  },

  AddItemToList: {
    methode: "post",
    operationName: "AddConstToList",
    query: `mutation AddConstToList($listId: ID!, $constId: ID!) {
  addItemToList(input: { listId: $listId, item: { itemElementId: $constId } }) {
    listId
    modifiedItem {
      itemId
    }
  }
}`,
    variables: (
      listId: string,
      constId: string,
      includeListItemMetadata: boolean = false,
      refTagQueryParam: string = "tt_ov_lst",
      originalTitleText: boolean = false,
      isInPace: boolean = true
    ) => ({
      listId,
      constId,
      includeListItemMetadata,
      refTagQueryParam,
      originalTitleText,
      isInPace,
    }),
  },

  RemoveItemFromList: {
    methode: "post",
    operationName: "RemoveConstFromList",
    query: `mutation RemoveConstFromList($listId: ID!, $constId: ID!) {
  removeElementFromList(input: { listId: $listId, itemElementId: $constId }) {
    listId
  }
}`,
    variables: (listId: string, constId: string) => ({ listId, constId }),
  },
} satisfies Record<string, Operation>;
