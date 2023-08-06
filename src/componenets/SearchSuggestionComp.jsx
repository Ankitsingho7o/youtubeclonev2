import React, { useEffect, useState } from "react";
import { fetchAutoComplete } from "../utils/autoCompleteApi";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchSuggestionComp = ({ suggestionVisiblity, query, setQuery }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  function handelSearch(suggestion) {
    suggestionVisiblity(false);
    setQuery("");
    navigate(`/searchResult/${suggestion}`);
  }
  useEffect(() => {
    if (query) {
      // console.log("here");
      fetchAutoComplete(`&q=${query}`).then((res) => {
        // console.log(res[1]);
        if (res[1].length >= 1) {
          setData(res[1]);
          suggestionVisiblity(true);
        }
      });
    } else {
      suggestionVisiblity(false);
    }
  }, [query]);

  return (
    <>
      {data &&
        data.map((suggestion, index) => {
          return (
            <ul className="list-none font-bold">
              <li
                className=" flex gap-2 items-center hover:bg-gray-600 p-2 rounded-md"
                key={index}
                onClick={() => handelSearch(suggestion)}
              >
                <IoIosSearch className="text-white text-xl" />
                {suggestion}
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default SearchSuggestionComp;
