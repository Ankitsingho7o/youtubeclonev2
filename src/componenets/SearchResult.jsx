import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const [searchResultItems, setSearchResultItems] = useState([]);
  const { searchQuery } = useParams();
  const { setLoading, loading } = useContext(Context);
  const [pageNum, setPageNum] = useState(" ");

  useEffect(() => {
    setSearchResultItems([]);
    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    if (pageNum) {
      fetchSearchResults();
    }
  }, [pageNum]);
  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(
      `search?part=snippet&q=${searchQuery}${
        pageNum ? `&pageToken=${pageNum}` : " "
      }`
    ).then((res) => {
      console.log(res);
      setResult(res);
      setSearchResultItems((items) => {
        return [...new Set(items?.concat(res?.items))];
      });
      setLoading(false);
    });
  };

  const observer = useRef();

  const lastVideoElement = useCallback(
    (node) => {
      console.log("visible");
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // console.log(searchResults.nextPageToken);
          setPageNum(result.nextPageToken);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {searchResultItems.map((item, index) => {
            if (item && item?.id.kind === "youtube#video") {
              if (searchResultItems.length === index + 1) {
                return (
                  <SearchResultVideoCard
                    key={item?.id?.videoId}
                    video={item}
                    innerRef={lastVideoElement}
                  />
                );
              } else {
                return (
                  <SearchResultVideoCard key={item?.id?.videoId} video={item} />
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
