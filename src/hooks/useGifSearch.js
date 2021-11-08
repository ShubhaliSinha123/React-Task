import { useEffect, useState } from "react";
import axios from "axios";

const useGifSearch = (searchValue, pageNumber) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gifs, setGifs] = useState([]);

  const fetchGifs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "t9NTLqeKB4Cow0Vqjg1HuiLiyEFWVh0K",
          count: 1000,
        },
      });
      console.log(response);
      setGifs(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const searchData = async () => {
    try {
      const filteredData = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "t9NTLqeKB4Cow0Vqjg1HuiLiyEFWVh0K",
          q: searchValue,
        },
      });
      setGifs((prevGifs) => {
        return [...new Set([...prevGifs, ...filteredData.data.data])];
      });
      console.log(filteredData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    setGifs([]);
  }, [searchValue]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    searchData();
  }, [pageNumber, searchValue]);

  useEffect(() => {
    fetchGifs();
  }, []);

  return {
    isLoading,
    error,
    gifs,
  };
};

export default useGifSearch;
