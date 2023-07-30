import React from "react";
import { useContext, useEffect, useRef, useCallback } from "react";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";
import VideoCard from "./VideoCard";
function FeedComp() {
  const { loading, searchResults,checking} =
    useContext(Context);
  console.log(searchResults);
  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  });

  // Pagination
  // const observer = useRef();

  // const lastVideoEllement = useCallback(
  //   (node) => {
  //     console.log("visible");
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setCursorNext(searchResults.cursorNext);
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [loading]
  // );

  return (
    <div className="flex flex-row h-[calc(100%-56px)] ">
      <LeftNav />
      <div
        className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black"
        id="feed"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          { searchResults && (
            searchResults.map((item) => {
              if (item.type !== "video") return false;

                 return (<VideoCard key={item?.video?.videoId} video={item?.video} /> ) ;
            }))}
        </div>
      </div>
    </div>
  );
}

export default FeedComp;
