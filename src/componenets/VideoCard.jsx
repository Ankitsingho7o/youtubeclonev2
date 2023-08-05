import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import TimeAgo from "react-timeago";
import VideoLength from "../shared/videoLength";

const VideoCard = ({ video, innerRef }) => {
  // console.log(video);
  return (
    <Link to={`/video/${video?.id?.videoId}`} ref={innerRef}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
          <img
            loading="lazy"
            className="h-full w-full object-cover"
            src={video?.snippet?.thumbnails?.high?.url}
          />
        </div>
        <div className="flex text-white mt-3">
          <div className="flex items-start">
            {/* <Link to={`/channel/${video?.author?.channelId}`}>
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={
                    authorDetail
                      ? authorDetail.avatar[0].url
                      : video?.author?.avatar[0].url
                  }
                />
              </div>
            </Link> */}
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2 hover:text-white transition-all">
            {video?.snippet?.title}
            </span>
            <span className="text-[16px] font-semibold mt-2 text-white/[0.7] flex items-center hover:text-white">
            <Link to={`/channel/${video?.snippet?.channelId}`}> {video?.snippet?.channelTitle}</Link>
              {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
              )} */}
            </span>
            <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
              {/* <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span> */}
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mr-2 ">
                .
              </span>
              <span className="truncate">
                <TimeAgo
                  date={video?.snippet?.publishTime}
                  className="text-white/[0.7]"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
