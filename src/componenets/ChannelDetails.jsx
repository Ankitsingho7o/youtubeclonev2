import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { abbreviateNumber } from "js-abbreviation-number";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";
import VideoCard from "./VideoCard";
import "./ChannelDetails.css";

const ChannelDetails = () => {
  const [channelDetials, setChannelDetails] = useState(false);
  const [channelVideos, setChannelVideos] = useState([]);
  const [reult, setResult] = useState(false);
  const [feedAnim, setFeedAnim] = useState(false);
  const { id } = useParams();
  const { setLoading, loading } = useContext(Context);
  const [pageNum, setPageNum] = useState(false);
  
  console.log(reult);

  const obs = useRef();

  useEffect(() => {
    setChannelVideos([]);
    fetchChannelVideos();
    fetchChannelDetails();
  }, [id]);
            
  useEffect(() => {
    obs.current.addEventListener("scroll", handelScroll);
  }, []);

  useEffect(() => {
    if (pageNum) {
      console.log("first");
      fetchChannelVideos();
    }
  }, [pageNum]);

  const handelScroll = () => {
    if (obs.current.scrollTop > 10) {
      setFeedAnim(true);
    } else {
      setFeedAnim(false);
    }
  };

  const fetchChannelVideos = () => {
    setLoading(true);
    fetchDataFromApi(
      `search?part=snippet,id&order=date&channelId=${id}${
        pageNum ? `&pageToken=${pageNum}` : " "
      }`
    ).then((res) => {
      setResult(res.nextPageToken);
      setChannelVideos((items) => {
        return [...new Set(items?.concat(res?.items))];
      });
      setLoading(false);
    });
  };
  const fetchChannelDetails = () => {
    setLoading(true);
    fetchDataFromApi(`channels?part=snippet,statistics&id=${id}`).then(
      (res) => {
        // console.log(res);
        setChannelDetails(res);
        setLoading(false);
      }
    );
  };
  const observer = useRef();

  const lastVideoElement = useCallback(
   (node)  => {
     if (loading) return;
     if (observer.current) observer.current.disconnect();
     observer.current = new IntersectionObserver((entries) => {
       if (entries[0].isIntersecting) {
          console.log("visible");
          console.log(reult);
          // if (reult) {
          //   console.log(reult);
            setPageNum(reult);
          // }
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading,reult]
  );

  return (
    <div className="flex flex-row h-auto overflow-hidden">
      <LeftNav />
      <div className="flex flex-col md:w-[calc(100%-240px)]">
        <div
          className={`w-full bg-black ${
            feedAnim ? "max-h-0" : "max-h-auto"
          }  transition-all ease-in-out duration-500 active"`}
        >
          <div className="w-full flex flex-col md:flex-row  p-4 items-center justify-center ">
            <div className=" h-full w-32 rounded-full overflow-hidden object-cover">
              {channelDetials && (
                <img
                  className="h-full w-full"
                  src={channelDetials?.items[0]?.snippet?.thumbnails?.high?.url}
                />
              )}
            </div>
            <div className="mt-3 md:m-4 md:ml-6 md:w-1/2 flex flex-col items-center md:items-start gap-2">
              <h1 className="text-white text-2xl md:text-4xl font-bold">
                {channelDetials && channelDetials?.items[0]?.snippet?.title}
                {/*{channelDetials && channelDetials?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-white/[0.5] text-xl ml-1 inline-block" />
                )} */}
              </h1>
              <div className="flex gap-3 md:flex-row flex-col">
                <h2 className="text-gray-600 text-2xl">
                  {channelDetials &&
                    channelDetials?.items[0]?.snippet?.customUrl}
                </h2>
                <p className="text-gray-600 text-xl md:text-2xl">
                  {channelDetials &&
                    `${abbreviateNumber(
                      channelDetials?.items[0]?.statistics.subscriberCount,
                      2
                    )} subscribers`}
                </p>
                <p className="text-gray-600 text-xl md:text-2xl">
                  {channelDetials &&
                    `${abbreviateNumber(
                      channelDetials?.items[0]?.statistics.videoCount,
                      2
                    )} Videos`}
                </p>
              </div>
              <h3 className="text-gray-400 text-base w-4/5 mr-6 md:mr-0 line-clamp-4">
                {channelDetials &&
                  channelDetials?.items[0]?.snippet?.description}
              </h3>
            </div>
          </div>
        </div>
        <div
          className={`grow h-full  bg-black overflow-y-auto `}
          id="feed"
          ref={obs}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5`}
          >
            {
              channelVideos?.map((item, index) => {
                if (item && item?.id.kind === "youtube#video") {
                  if (channelVideos.length === index + 1) {
                    return (
                      <VideoCard
                        key={item?.id?.videoId}
                        video={item}
                        innerRef={lastVideoElement}
                      />
                    );
                  } else {
                    return <VideoCard key={item?.id?.videoId} video={item} />;
                  }
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;

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
