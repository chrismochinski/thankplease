import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import { FetchCoinGeckoList } from "./FetchCoinGeckoData/FetchCoinGeckoData";
import { Home } from "./Home/Home";
import { SvgMiddleBlob } from "./SvgMiddleBlob/SvgMiddleBlob";

function App() {
  return (
    <Router>

    <div className="App">
      <SvgMiddleBlob />
      <Routes>

      <Home />
      <div className="button-row p-large align-start z-index-top">
        
        <FetchCoinGeckoList />
      </div>
      </Routes>
    </div>
    </Router>
  );
}


export default App;
