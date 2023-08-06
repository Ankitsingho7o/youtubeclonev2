import { useState } from "react";
import { AppContext } from "./context/contextApi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComp from "./componenets/Header";
import FeedComp from "./componenets/FeedComp"
import SearchResult from "./componenets/SearchResult";
import VideoDetails from "./componenets/VideoDetails";
import ChannelDetails from "./componenets/ChannelDetails";
import LimitExccded from "./componenets/LimitExceeded";

function App() {
  return (
    <>
      <AppContext>
        <BrowserRouter>
          <div className="flex flex-col h-full">
            <HeaderComp />
            <Routes>
              <Route path="/" exact element={<FeedComp />}></Route>
              <Route
                path="/searchResult/:searchQuery"
                element={<SearchResult />}
              />
              <Route
                path="/channel/:id"
                element={<ChannelDetails />}
              />
              <Route path="/video/:id" element={<VideoDetails />} />
              <Route path="/limitexceeded" element={<LimitExccded />} />

            </Routes>
          </div>
        </BrowserRouter>
      </AppContext>
    </>
  );
}

export default App;
