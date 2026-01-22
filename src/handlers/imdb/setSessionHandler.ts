import { parseCookie } from "../../utils/parseCookie.js";
import type { ImdbClient } from "../../client/imdbClient.js";
import { imdbApi } from "../../utils/imdbApi.js";

export const extractUserData = (
  html: string
): { id: string; username: string } => {
  // Extract userId
  const idMatch = html.match(
    /<meta property="og:url" content="https:\/\/www\.imdb\.com\/user\/(ur\d+)\/"/
  );

  // Extract username
  const usernameMatch = html.match(
    /<title>([^<]+)&#x27;s Profile - IMDb<\/title>/
  );

  const userData = {
    id: "",
    username: "",
  };

  if (!idMatch || !usernameMatch) return userData;

  return {
    id: idMatch[1] || userData.id,
    username: usernameMatch[1] || userData.username,
  };
};

export async function setSessionHandler(
  client: ImdbClient,
  options: { path?: string; cookie?: string; userId?: string }
): Promise<boolean> {
  const { path, cookie, userId } = options;

  if ((!path && !cookie) || (path && cookie)) {
    throw new Error("Provide either path or cookie, but not both");
  }

  if (cookie) {
    client.cookie = cookie;
  } else if (path) {
    client.cookie = parseCookie(path);
  }

  if (userId) {
    client.userId = userId;
    return true;
  }

  try {
    const response = await imdbApi(client.cookie, "/user");
    const { id } = extractUserData(response);
    if (!id) return false;

    client.userId = id;
  } catch (error) {
    return false;
  }

  return true;
}
