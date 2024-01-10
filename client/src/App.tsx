import "./App.scss";
import { FetchBasicCmcData } from "./FetchCmcData/FetchBasicCmcData";
import { FetchCoinGeckoList } from "./FetchCoinGeckoData/FetchCoinGeckoData";
import { Home } from "./Home/Home";
import { SvgBlobs } from "./SvgBlobs/SvgBlobs";

function App() {
  return (
    <div className="App">
      <SvgBlobs />
      <Home />
      <div className="button-row p-large align-start z-index-top">
        {/* <FetchBasicCmcData /> */}
        {/* <FetchCoinGeckoList /> */}
      </div>
    </div>
  );
}


export default App;
