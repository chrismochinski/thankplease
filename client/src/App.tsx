import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Market } from "./Market/Market";
import { TradingView } from "./TradingView/TradingView";
import { SvgMiddleBlob } from "./SvgMiddleBlob/SvgMiddleBlob";

function App() {
  return (
    <div className="App">
      <SvgMiddleBlob />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/tradingview" element={<TradingView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
