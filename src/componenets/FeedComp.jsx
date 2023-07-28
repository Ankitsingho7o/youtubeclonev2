import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";
import VideoCard from "./VideoCard";
function FeedComp() {
  const { loading, searchResults } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  });

  return (
    <div className="flex flex-row h-auto  ">
      <LeftNav />
      <div className=" sm:grow w-[calc(100%-240px)]  md:ml-[240px] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {searchResults &&
            searchResults.map((item) => {
              if (item.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FeedComp;
