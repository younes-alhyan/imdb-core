import type { Operation } from "../types/internal.js";
import type { SortOrder, SortType, TitleType } from "../types/public.js";

export const operationsMap = {
  // Watchlist Mutations
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
    variables: (options: { titleId: string }) => ({
      id: options.titleId,
    }),
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
    variables: (options: { titleId: string }) => ({
      id: options.titleId,
    }),
  },

  // Watched Titles Mutations
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
    variables: (options: { titleId: string }) => options,
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
    variables: (options: { titleId: string }) => options,
  },

  // Rating Mutations
  AddRating: {
    methode: "post",
    query: `mutation UpdateTitleRating($rating: Int!, $titleId: ID!) {
    rateTitle(input: { rating: $rating, titleId: $titleId }) {
      rating {
        value
      }
    }
  }`,
    operationName: "UpdateTitleRating",
    variables: (options: { titleId: string; rating: number }) => options,
  },

  RemoveRating: {
    methode: "post",
    query: `mutation DeleteTitleRating($titleId: ID!) {
    deleteTitleRating(input: { titleId: $titleId }) {
      date
    }
  }`,
    operationName: "DeleteTitleRating",
    variables: (options: { titleId: string }) => options,
  },

  // User Lists Queries and Mutations
  GetUserLists: {
    methode: "get",
    operationName: "YourListsSidebar",
    variables: (options: { first: number; locale: string }) => options,
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
    variables: (options: { isInFavPeopleWeblab: boolean; locale: string }) =>
      options,
    extensions: {
      persistedQuery: {
        sha256Hash:
          "f48bec9c67c35718c357265ef8af84ca7e397348bc2a80912a01939350ab8884",
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
    variables: (options: {
      name: string;
      listDescription: string;
      listType: "TITLES" | "PEOPLE" | "IMAGES" | "VIDEOS";
      visibility: "PRIVATE" | "PUBLIC";
      allowDuplicates: boolean;
    }) => ({
      input: {
        ...options,
      },
    }),
  },

  RemoveList: {
    methode: "post",
    operationName: "DeleteList",
    query: `
    mutation DeleteList($listId: ID!) {
      deleteList(input: { listId: $listId }) {
        listId
      }
    }
  `,
    variables: (options: { listId: string }) => options,
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
    variables: (options: {
      listId: string;
      titleId: string;
      includeListItemMetadata: boolean;
      refTagQueryParam: string;
      originalTitleText: boolean;
      isInPace: boolean;
    }) => ({
      listId: options.listId,
      constId: options.titleId, // rename only in the output
      includeListItemMetadata: options.includeListItemMetadata,
      refTagQueryParam: options.refTagQueryParam,
      originalTitleText: options.originalTitleText,
      isInPace: options.isInPace,
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
    variables: (options: { listId: string; titleId: string }) => ({
      listId: options.listId,
      constId: options.titleId,
    }),
  },

  GetLastVisited: {
    methode: "get",
    operationName: "RVI_Items",
    variables: (options: { count: number; locale: string }) => options,
    extensions: {
      persistedQuery: {
        sha256Hash:
          "32eda43bfa1053f69036b945638fc4a0ae6cc4a2429de224b3185f8b0e37717b",
        version: 1,
      },
    },
  },
  // Search Queries
  AdvancedTitleSearch: {
    methode: "get",
    operationName: "AdvancedTitleSearch",
    variables: (options: {
      first: number;
      locale: string;
      sortBy: SortType;
      sortOrder: SortOrder;
      query: string;
      titleTypes: TitleType[];
    }) => {
      const { first, locale, sortBy, sortOrder, query, titleTypes } = options;
      return {
        first,
        locale,
        sortBy,
        sortOrder,
        titleTextConstraint: { searchTerm: query },
        titleTypeConstraint: { anyTitleTypeIds: titleTypes },
      };
    },
    extensions: {
      persistedQuery: {
        sha256Hash:
          "9fc7c8867ff66c1e1aa0f39d0fd4869c64db97cddda14fea1c048ca4b568f06a",
        version: 1,
      },
    },
  },
} satisfies Record<string, Operation>;
