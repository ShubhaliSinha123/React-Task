import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGifSearch from "./hooks/useGifSearch";
import LoadingIndicator from "./UI/LoadingIndicator";
import Card from "./UI/Card";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { gifs, isLoading, error } = useGifSearch(searchValue, pageNumber);

  const searchHandler = (event) => {
    setSearchValue(event.target.value);
    setPageNumber(1);
  };

  return (
    <Card>
       <label>Filter by name:</label>
      <input type="text" onChange={searchHandler} />
      <br />
      <br />
      <InfiniteScroll
        dataLength={gifs.length}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={true}
      >
        {gifs.map((data, id) => {
          return (
            <div key={id}>
              <img src={data.images.fixed_height.url} />
            </div>
          );
        })}
      </InfiniteScroll>
      {isLoading && <LoadingIndicator />}
      <div>{error && "Error"}</div>
    </Card>
  );
}

export default App;
