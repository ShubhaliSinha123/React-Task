import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGifSearch from "./hooks/useGifSearch";
import LoadingIndicator from "./UI/LoadingIndicator";
import Card from "./UI/Card";
import { DebounceInput } from 'react-debounce-input';

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
      <div className="label">
       <label style={{fontSize:"1.5rem"}}>Filter by name:</label>
      <DebounceInput className="input" type="text" onChange={searchHandler} placeholder="Search" debounceTimeout={500} minLength={1} />
      </div>
      <br />
      <br />
      <div className="container">
      <InfiniteScroll
        dataLength={gifs.length}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={true}
      >
        {gifs.map((data, id) => {
          return (
            <applet key={id} className="gif-item">
              <img src={data.images.fixed_height.url} alt="Giphy gifs!" />
            </applet>
          );
        })}
      </InfiniteScroll>
      {searchValue && isLoading && <LoadingIndicator />}
      </div>
      <div>{error && "Error"}</div>
    </Card>
  );
}

export default App;
