import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import { FetchCoinGeckoList } from "./FetchCoinGeckoData/FetchCoinGeckoData";
import { Home } from "./Home/Home";
import { Market } from "./Market/Market";
import { SvgMiddleBlob } from "./SvgMiddleBlob/SvgMiddleBlob";

function App() {
  return (
    <Router>

    <div className="App">
      <SvgMiddleBlob />
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/market" element={<Market />} />
      <div className="button-row p-large align-start z-index-top">
        
        <FetchCoinGeckoList />
      </div>
      </Routes>
    </div>
    </Router>
  );
}


export default App;
