import { useState } from "react";
import { AppContext } from "./context/contextApi";

function App() {
  return (
    <>
      <AppContext>
   
        <h1 className="text-2xl text-pink-700">Hello World</h1>
      </AppContext>
    </>
  );
}

export default App;
