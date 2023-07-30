import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "../componenets/LeftNav";

const ChannelDetails = () => {
  const [channelDetials, setChannelDetails] = useState(false);
  const [channelVideos, setChannelVideos] = useState(false);
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    fetchChannelDetails();
    fetchChannelVideos();
  }, [id]);

  const fetchChannelDetails = () => {
    setLoading(true);
    fetchDataFromApi(`channel/details/?id=${id}`).then((res) => {
      console.log(res);
      setChannelDetails(res);
      setLoading(false);
    });
  };
  const fetchChannelVideos = () => {
    setLoading(true);
    fetchDataFromApi(`channel/videos/?id=${id}`).then((res) => {
      console.log(res);
      setChannelVideos(res);
      setLoading(false);
    });
  };

  console.log(id);

  return (
    <div>
      <LeftNav />
      <h1 className="text-white">Channel details</h1>
    </div>
  );
};

export default ChannelDetails;
