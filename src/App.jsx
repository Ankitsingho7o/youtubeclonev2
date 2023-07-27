import { useState } from "react";
import { AppContext } from "./context/contextApi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  HeaderComp  from "./componenets/header";
import FeedComp from "./componenets/feed";

function App() {
  return (
    <>
      <AppContext>
        <BrowserRouter>
        <div className="flex flex-col h-full">
          <HeaderComp/>
          <Routes>
            <Route path="/"  exact  element={<FeedComp/>}></Route>
            {/*<Route path="/searchResults/:searchQuery" element={}></Route>
            <Route path="/video/:id" element={}></Route> */}
          </Routes>
          </div>
        </BrowserRouter>
      </AppContext>
    </>
  );
}

export default App;
