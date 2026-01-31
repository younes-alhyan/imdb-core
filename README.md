# 🎬 imdb-core

![IMDb](https://img.shields.io/badge/IMDb-F5C518?style=for-the-badge&logo=imdb&logoColor=black)
![npm](https://img.shields.io/npm/v/imdb-core?style=for-the-badge&color=orange&logo=npm)
![npm downloads](https://img.shields.io/npm/dt/imdb-core?style=for-the-badge&color=blue&logo=npm)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)

## 📦 What is imdb-core?

`imdb-core` is a **TypeScript-friendly library** to interact with IMDb programmatically.  
It allows you to access **lists**, **search titles**, manage **watchlists**, and fetch **user activity** directly from your code — the kind of stuff normally only possible via the IMDb UI.

## 🚀 Features

### Lists

- **Predefined Lists**  
  Access IMDb’s main lists like **ratings**, **watchlist**, **watched history**, and **check-ins**.  
  Read and manage items in these lists programmatically.

- **User Lists**  
  Fetch your custom lists, add/remove items, or create new lists with full control.

- **Public Lists**  
  Access any public IMDb list by its ID. Perfect for reading or processing lists without modifying them.

### Search

- **Title Search**  
  Search movies, TV shows, podcasts, video games, and more.  
  Filter and sort results by popularity, ratings, release date, type, and more.

### Titles & Activity

- **Last Visited**  
  Fetch recently visited titles from your IMDb account.

- **Ratings**  
  Add or remove ratings on titles programmatically.

## ⚡ Installation

```bash
npm install imdb-core
```

or

```bash
yarn add imdb-core
```

## 💻 Usage Guide

## 1️⃣ Create an IMDb imdbClient

```ts
import imdb from "imdb-core";

const imdbClient = imdb.createImdb();
```

That’s it. No config yet.

## 2️⃣ Authenticate (set session)

IMDb doesn’t provide a public API, so authentication is done using **cookies**.

You can either:

- export cookies from your browser
- or copy the raw cookie string

```ts
await imdbClient.setSession({
  path: "cookies-imdb-com.txt",
});
```

or

```ts
await imdbClient.setSession({
  cookie: "YOUR_COOKIE_STRING",
});
```

### Optional: speed it up

If you already know your IMDb user ID (`urXXXXXXX`), pass it:

```ts
await imdbClient.setSession({
  path: "cookies-imdb-com.txt",
  userId: "ur1234567",
});
```

This skips an extra request.

## 3️⃣ Work with your lists

### Predefined lists (built-in IMDb lists)

Every IMDb account comes with a few built-in lists that track your activity automatically.

When you call:

```ts
const lists = await imdbClient.getPredefinedLists();
```

You get back a record (object) containing up to **four lists**, keyed by their purpose:

```ts
type PredefinedListKey = "ratings" | "watchlist" | "watchHistory" | "checkins";
```

Each key maps to the corresponding IMDb list on your account.

#### Options

```ts
await imdbClient.getPredefinedLists({
  isInFavPeopleWeblab,
  locale,
});
```

- `locale` → language / region
  **Default:** `"en-US"`

- `isInFavPeopleWeblab` → internal IMDb experiment flag
  **Default:** `false`
  (You can ignore this unless you know you need it.)

### Custom user lists

Fetch your own custom lists:

```ts
const userLists = await imdbClient.getUserLists();
```

This returns an **array of your lists**, created manually from IMDb.

#### Options

```ts
await imdbClient.getUserLists({
  first,
  locale,
});
```

- `first` → number of lists to fetch
  **Default:** `10`

- `locale` → language / region
  **Default:** `"en-US"`

### Public list

Fetch any public IMDb list by its ID:

```ts
const publicList = imdbClient.getPublicList("ls055592025");
```

Public lists are **read-only**.

### Create a new list

```ts
const myList = await imdbClient.createUserList({
  name: "Dark & Psychological",
  listDescription: "Stuff that messes with your head",
  visibility: "PUBLIC",
});
```

#### Options

- `name` → list name (**required**)

- `listDescription` → optional description
  **Default:** `""`

- `visibility` → `"PUBLIC"` or `"PRIVATE"`
  **Default:** `"PRIVATE"`

- `listType` → type of list (`"TITLES"`, `"PEOPLE"`, etc.)
  **Default:** `"TITLES"`

- `allowDuplicates` → allow the same item multiple times
  **Default:** `true`

### Remove a list

```ts
await imdbClient.removeUserList({
  listId: "ls055592025",
});
```

This permanently deletes the list from your account.

## 4️⃣ List objects utilities

### Get list items

Fetch all items in a list.

```ts
const listItems = await list.getItems();
```

### Add items to a list

Adds a title to a list.

```ts
await list.addItem({ titleId: "tt0318871" });
```

### Options

- `titleId` → IMDb title id (**required**)

- `includeListItemMetadata`
  **Default:** `false`

- `refTagQueryParam`
  **Default:** `"tt_ov_lst"`

- `originalTitleText`
  **Default:** `false`

- `isInPace`
  **Default:** `true`

- `rating` → rating value (1–10)
  **Required only when adding to the `ratings` list**

### Remove items from a list

```ts
await list.removeItem({ titleId: "tt0318871" });
```

## 5️⃣ Search titles

Basic search:

```ts
const results = await imdbClient.searchTitle({
  query: "berserk",
});
```

With filters and sorting:

```ts
const results = await imdbClient.searchTitle({
  query: "god of war",
  titleTypes: ["videoGame"],
  sortBy: "POPULARITY",
  sortOrder: "DESC",
});
```

#### Options

- `query` → search text (**required**)

- `titleTypes` → filter by title type (movies, series, games, etc.)
  **Default:** all supported title types

- `sortBy` → how results are sorted
  **Default:** `"POPULARITY"`

- `sortOrder` → `"ASC"` or `"DESC"`
  **Default:** `"ASC"`

- `first` → number of results to return
  **Default:** `50`

- `locale` → language / region
  **Default:** `"en-US"`

## 6️⃣ Recently visited titles

Fetch titles you recently opened on IMDb:

```ts
const recent = await imdbClient.getLastVisited({
  count: 10,
  locale: "en-US",
});
```

#### Options

- `count` → number of titles to return
  **Default:** `10`

- `locale` → language / region
  **Default:** `"en-US"`

Useful for:

- activity tracking
- history syncing
- personal dashboards

## 📜 License

This project is licensed under the [MIT License](LICENSE).
