import { imdbApi } from "../../utils/imdbApi.js";

const extractTitles = (html: string, endpoint: string) => {
  const match = html.match(
    /<script\s+id="__NEXT_DATA__"\s+type="application\/json">\s*([\s\S]*?)\s*<\/script>/
  );

  if (!match || !match[1]) return undefined;

  try {
    const data = JSON.parse(match[1]);
    const mainColumnData = data.props?.pageProps?.mainColumnData;
    let edges: any[] = [];

    const parts = endpoint.split("/").filter(Boolean);
    const type = parts[parts.length - 1];

    switch (type) {
      case "checkins":
      case "watchlist":
        edges =
          mainColumnData?.predefinedList?.titleListItemSearch?.edges ?? [];
        break;

      case "ratings":
        edges = mainColumnData?.advancedTitleSearch?.edges ?? [];
        break;

      case "watchhistory":
        edges = mainColumnData?.userWatchedTitles?.edges ?? [];
        break;

      default:
        edges = mainColumnData?.list?.titleListItemSearch?.edges;
        break;
    }

    return edges;
  } catch (e) {
    console.error("Failed to parse __NEXT_DATA__ JSON", e);
    return undefined;
  }
};

export const getItemsHandler = async (
  endpoint: string,
  getCookie: () => string
): Promise<any[]> => {
  const cookie = getCookie();

  try {
    const response = await imdbApi(cookie, endpoint);
    const items = extractTitles(response, endpoint);
    return items ?? [];
  } catch (error) {
    console.error("Failed to fetch list items", error);
    return [];
  }
};
