import { BASE_URL } from "../constants";

export const getSearchedItemsInit = () => {
  return ["A", "B", "C", "D", "E"];
};

export const getAlbum = (album) => {
  if (album) {
    return album.collectionName;
  } else {
    console.error("No results for album");
  }
};

export const getAlbumsApi = (searchQuery) => {
  const baseUrl = BASE_URL;
  return `${baseUrl}search?term=${searchQuery}&entity=album&limit=5`;
};
