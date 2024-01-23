import "./App.scss";
//import everything form react router to build this into a route file
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Market } from "./Market/Market";
import { SvgMiddleBlob } from "./SvgMiddleBlob/SvgMiddleBlob";

function App() {
  return (
    <div className="App">
      <SvgMiddleBlob />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
