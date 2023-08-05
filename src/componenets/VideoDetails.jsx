import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import CommentComp from "./commentComp";
import SuggestVideoCard from "./SuggestVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [videoComments, setVideoComments] = useState(false);
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
    fetchVideoComments();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`videos?part=snippet,statistics,contentDetails&id=${id}`).then((res) => {
      // console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };
  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`search?part=snippet,id&relatedToVideoId=${id}`).then((res) => {
      // console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  };
  const fetchVideoComments = () => {
    setLoading(true);
    fetchDataFromApi(`commentThreads?&part=snippet&videoId=${id}`).then((res) => {
      console.log(res);
      setVideoComments(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center flex-row h-auto bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
          <div className="h-[400px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video && (video?.items[0]?.snippet?.title)}

          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              {/* <div className="flex items-start">
                {/* <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div> */}
         
              <div className="flex flex-col">
                <div className="text-white text-2xl font-semibold flex cursor-pointer">
                <Link to={`/channel/${video?.items[0]?.snippet?.channelId}`}>    {video?.items[0]?.snippet?.channelTitle}</Link>
                  {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )} */}
                </div>
                {/* <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div> */}
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(video?.items[0]?.statistics?.likeCount, 2)} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                {`${abbreviateNumber(video?.items[0]?.statistics?.viewCount, 2)} Views`}
              </div>
            </div>
          </div>
          {videoComments && <CommentComp videoComments={videoComments} commentCount={video}/>}
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.items?.map((item, index) => {
            if (item?.id?.kind !== "youtube#video") return false;
            return <SuggestVideoCard key={index} video={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
