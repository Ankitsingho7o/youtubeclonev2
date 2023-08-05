import React, { useState } from "react";
import { useContext, useEffect, useRef, useCallback } from "react";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";
import VideoCard from "./VideoCard";
function FeedComp() {
  const { loading, searchResults, setPageNum,items, setItems } = useContext(Context);
  // console.log(searchResults);
  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  });

  useEffect(() => {
    if (items) {
      setItems((items) => {
        return  [...new Set(items.concat(searchResults.items))];
      });
      // setItems(searchResults.items)
    } else {
      // console.log(items);
      setItems(searchResults.items);
    }
  }, [searchResults.items]);

  // Pagination
  const observer = useRef();

  const lastVideoElement = useCallback(
    (node) => {
      // console.log("visible");
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log(searchResults.nextPageToken);
          setPageNum(searchResults.nextPageToken);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, searchResults]
  );

  return (
    <div className="flex flex-row h-[calc(100%-56px)] overflow-hidden">
      <LeftNav
     
      />
      <div
        className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black"
        id="feed"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {items &&
            items.map((item, index) => {
              // if (item.id.kind !== "youtube#video") return false;
              // console.log(items);
              if (item) {
                if (items.length === index + 1) {
                  return (
                    <VideoCard
                      key={index}
                      video={item}
                      innerRef={lastVideoElement}
                    />
                  );
                } else {
                  return <VideoCard key={index} video={item} />;
                }
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default FeedComp;
