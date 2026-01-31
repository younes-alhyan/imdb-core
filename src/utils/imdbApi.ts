import axios from "axios";

const BASE_URL = "https://www.imdb.com";

export const imdbApi = async (
  cookie: string,
  endpoint: string
): Promise<string> => {
  try {
    const response = await axios.get(BASE_URL + endpoint, {
      headers: {
        // ---- Required ----
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        Cookie: cookie,

        // ---- Browser realism ----
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",

        // ---- Fetch metadata (important) ----
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",

        // ---- Client hints ----
        "Sec-CH-UA":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Linux"',
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    });

    return response.data;
  } catch (error: any) {
    console.error("IMDb request error:", error.response?.status, error.message);
    throw error;
  }
};
