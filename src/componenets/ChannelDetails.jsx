import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";
import VideoCard from "./VideoCard";

const ChannelDetails = () => {
  const [channelDetials, setChannelDetails] = useState(false);
  const [channelVideos, setChannelVideos] = useState(false);
  const [desktopimgurl, setDesktopImgUrl] = useState(false);
  const [mobileimgurl, setMobileImgUrl] = useState(false);
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    fetchChannelDetails();
    fetchChannelVideos();
  }, [id]);

  // const handelRef = useRef()

    const handelBanner =()=>{
      const screenWidth = window.innerWidth;

    if (screenWidth < 450) {
      return (
        channelDetials?.banner?.mobile[0]?.url
      );
    } else {
      return (
     channelDetials?.banner?.desktop[0]?.url
      );
    }
    }
  // useEffect(() => {
  //    handelBanner();
  //   const handleWindowResize = () => {
  //     console.log(window.innerWidth);
  //     console.log(handelRef.current.backgroundImage);
  //     if(window.innerWidth<450){
  //       handelRef.current.backgroundImage = `url("${channelDetials?.banner?.desktop[0].url}")`
  //     }else{
  //       handelRef.current.backgroundImage = `url("${channelDetials?.banner?.desktop[0].url}")`


  //     }
  //     // setURL({channelDetials?.banner?.window.innerWidth<450?".mobile":".desktop"[3]?.url});
  //   };

  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // },[]);

  const fetchChannelDetails = () => {
    setLoading(true);
    fetchDataFromApi(`channel/details/?id=${id}`).then((res) => {
      console.log(res);
      setChannelDetails(res);
      setDesktopImgUrl(true).

      setMobileImgUrl(channelDetials?.banner?.mobile[0].url)
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
    <div className="flex flex-row  h-auto">
      <LeftNav />
      <div className="flex flex-col md:w-[calc(100%-240px)]  ">
        <div className="w-full bg-black">
          <div 
            className={`md:h-[250px] m-2 h-[200px] md:p-3 p-2 object-cover bg-center bg-cover `}
            style={{ backgroundImage: `url(${channelDetials && handelBanner()})` }}
          >
            {/* <img src={desktopimgurl && `${channelDetials?.banner?.desktop[0].url}`} alt="" /> */}
          </div>
         <div className="w-full flex">
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <h1>

              </h1>
              <h2></h2>

              <p></p>
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
