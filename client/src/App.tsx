import "./App.scss";
import { FetchCoinGeckoList } from "./FetchCoinGeckoData/FetchCoinGeckoData";
import { Home } from "./Home/Home";
import { SvgMiddleBlob } from "./SvgMiddleBlob/SvgMiddleBlob";

function App() {
  return (
    <div className="App">
      <SvgMiddleBlob />
      <Home />
      <div className="button-row p-large align-start z-index-top">
        <FetchCoinGeckoList />
      </div>
    </div>
  );
}


export default App;
