useEffect(() => {
    setIsLoading(true);
    setError(null);
    let cancel;
    axios({
        method: 'GET',
        url: "https://api.giphy.com/v1/gifs/search",
        params: {
            api_key: "t9NTLqeKB4Cow0Vqjg1HuiLiyEFWVh0K",
            q: searchValue,
            limit: 1000
          },
          cancelToken: new axios.CancelToken(cancelToken => cancel = cancelToken)
    }).then(res => {
        setGifs(prevGifs => {
            return [...new Set([...prevGifs, ...res.data.data])]
        })
        console.log(gifs);
        setMoreGifs(res.data.data.length > 0);
        setIsLoading(false);
    }).catch(e => {
        if(axios.isCancel(e)) return;
        setError(e.message);
    })
    return () => cancel();
  }, [searchValue, pageNumber]);