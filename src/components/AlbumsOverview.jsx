import { useEffect, useState, useRef } from "react";
import {
  getSearchedItemsInit,
  getAlbumListStyles,
  getAlbumBoxStyles,
  getAlbum,
  getAlbumsApi,
} from "../helpers/index";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import SearchField from "./SearchField";
import Alert from "@mui/material/Alert";

const AlbumsOverview = () => {
  const searchedItemsInit = getSearchedItemsInit();
  const [searchedItems, setSearchedItems] = useState(searchedItemsInit);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const elementRef = useRef(searchedItems);
  elementRef.current = searchedItems;

  let intervalIndex = 0; // state of interval

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval jsem zde");
      setSearchedItems((prevItems) => {
        const prevSearchedItems = [...prevItems];
        const firstPrevSearchedItem = prevSearchedItems.shift();

        const albumsNotEmpty = albums.length > 0;
        const isWithinAlbumInterval = intervalIndex < albums.length;

        // when searched album exist, push it to the end of the array one by one
        if (albumsNotEmpty && isWithinAlbumInterval) {
          prevSearchedItems.push(albums[intervalIndex]);
          intervalIndex++;
        } else prevSearchedItems.push(firstPrevSearchedItem);

        return prevSearchedItems;
      });
    }, 1000);

    return () => {
      // cleanup called with each dependency change
      clearInterval(interval);
    };
  }, [searchedQuery, albums]);

  useEffect(() => {
    /* resets the searched items to init when searchedQuery dependency changes
     * otherwise it keeps the previous searched values and will not reset */
    setSearchedItems(searchedItemsInit);
    fetchAlbums(searchedQuery);
    intervalIndex = 0; // format rotating index number to 0 when change search term

    return () => {
      setErrorMsg(null);
    };
  }, [searchedQuery]);

  const fetchAlbums = async (searchQuery) => {
    if (searchQuery.length > 0) {
      try {
        const response = await fetch(getAlbumsApi(searchQuery));
        const albumApiResponse = await response.json();

        if (
          albumApiResponse &&
          albumApiResponse.results &&
          albumApiResponse.results.length
        ) {
          const albumData = albumApiResponse.results
            .map((album) => getAlbum(album))
            .sort();
          setAlbums(albumData);
        } else {
          setAlbums([]);
        }
      } catch (error) {
        setErrorMsg(`Error fetching albums: ${error}`);
        // typically you would log this to something like TrackJS/Sentry/NewRelic
        console.log.error("Error fetching data", error);
      }
    } else {
      setAlbums([]);
    }
  };

  const handleSearchedFieldChange = (event) =>
    setSearchedQuery(event.target.value);

  return (
    <div>
      <Container maxWidth="sm">
        <h1>Search Albums</h1>
        <Box sx={getAlbumBoxStyles()}>
          <SearchField handleSearchedFieldChange={handleSearchedFieldChange} />

          <List
            sx={{ textAlign: "center" }}
            component="nav"
            aria-label="mailbox folders"
            disablePadding={false}
          >
            {searchedItems.map((searchedItem, index) => (
              <ListItem
                sx={getAlbumListStyles()}
                key={index}
                role={undefined}
                dense
                divider
              >
                <ListItemText id={index} primary={searchedItem} />
              </ListItem>
            ))}
          </List>
          {errorMsg !== null && <Alert severity="error">{errorMsg}</Alert>}
        </Box>
      </Container>
    </div>
  );
};

export default AlbumsOverview;
