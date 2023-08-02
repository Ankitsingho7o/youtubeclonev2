import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";
import VideoCard from "./VideoCard";
import { BsFillCheckCircleFill } from "react-icons/bs";

const ChannelDetails = () => {
  const [channelDetials, setChannelDetails] = useState(false);
  const [channelVideos, setChannelVideos] = useState(false);
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    fetchChannelDetails();
    fetchChannelVideos();
  }, [id]);

  // const handelRef = useRef()

  const handelBanner = () => {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
    if (screenWidth < 450) {
      return channelDetials?.banner?.mobile[3]?.url;
    } else {
      return channelDetials?.banner?.desktop[3]?.url;
    }
  };
  // useEffect(() => {
  //    handelBanner();
  //   // const handleWindowResize = () => {
  //   //   console.log(window.innerWidth);
  //   //   console.log(handelRef.current.backgroundImage);
  //   //   if(window.innerWidth<450){
  //   //     handelRef.current.backgroundImage = `url("${channelDetials?.banner?.desktop[0].url}")`
  //   //   }else{
  //   //     handelRef.current.backgroundImage = `url("${channelDetials?.banner?.desktop[0].url}")`

  //   //   }
  //     // setURL({channelDetials?.banner?.window.innerWidth<450?".mobile":".desktop"[3]?.url});

  //   window.addEventListener("resize", handelBanner);

  //   return () => {
  //     window.removeEventListener("resize", handelBanner);
  //   };
  // },[]);

  const fetchChannelDetails = () => {
    setLoading(true);
    fetchDataFromApi(`channel/details/?id=${id}`).then((res) => {
      console.log(res);
      setChannelDetails(res);
      // setDesktopImgUrl(true).setMobileImgUrl(
      //   channelDetials?.banner?.mobile[2].url
      // );
      setLoading(false);
    });
  };
  const fetchChannelVideos = () => {
    setLoading(true);
    fetchDataFromApi(`channel/videos/?id=${id}`).then((res) => {
      // console.log(res);
      setChannelVideos(res.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row  h-auto ">
      <LeftNav />
      <div className="flex flex-col md:w-[calc(100%-240px)]  ">
        <div className="w-full bg-black">
          <div
            className={`md:h-[250px] m-2 h-[200px] md:p-3 p-2 object-cover bg-center bg-contain md:bg-cover bg-no-repeat `}
            style={{
              backgroundImage: `url(${channelDetials && handelBanner()})`,
            }}
          >
            {/* <img src={desktopimgurl && `${channelDetials?.banner?.desktop[0].url}`} alt="" /> */}
          </div>
          <div className="w-full flex flex-col md:flex-row  p-4 items-center justify-center ">
            <div className=" h-full w-32 rounded-full overflow-hidden object-cover">
              {channelDetials && (
                <img
                  className="h-full w-full"
                  src={channelDetials?.avatar[2]?.url}
                />
              )}
            </div>
            <div className="mt-3 md:m-4 md:ml-6 md:w-1/2 flex flex-col items-center md:items-start gap-2">
              <h1 className="text-white text-2xl md:text-4xl font-bold">
                {channelDetials?.title}
                {channelDetials && channelDetials?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-white/[0.5] text-xl ml-1 inline-block" />
                )}
              </h1>
              <div className="flex gap-3 md:flex-row flex-col">
                <h2 className="text-gray-600 text-2xl">
                  {channelDetials?.username}
                </h2>
                <p className="text-gray-600 text-xl md:text-2xl">
                  {channelDetials?.stats?.subscribersText}
                </p>
                <p className="text-gray-600 text-xl md:text-2xl">
                  {channelDetials?.stats?.videosText}
                </p>
              </div>
              <h3 className="text-gray-400 text-base w-1/2 mr-6 md:mr-0 line-clamp-3">
                {channelDetials?.description}
              </h3>
            </div>
          </div>
        </div>
        <div className="grow h-full  bg-black" id="feed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {channelVideos &&
              channelVideos?.map((item) => {
                if (item.type !== "video") return false;
                return (
                  <VideoCard
                    key={item?.video?.videoId}
                    video={item?.video}
                    authorDetail={channelDetials}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
