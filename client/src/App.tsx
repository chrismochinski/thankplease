import "./App.scss";
import { FetchBasicCmcData } from "./FetchCmcData/FetchBasicCmcData";
import { FetchCoinGeckoList } from "./FetchCoinGeckoData/FetchCoinGeckoData";
import { Home } from "./Home/Home";

function App() {
  return (
    <div className="App">
      <Home />
      <div className="button-row p-large align-start">
        <FetchBasicCmcData />
        <FetchCoinGeckoList />
      </div>
    </div>
  );
}


export default App;
