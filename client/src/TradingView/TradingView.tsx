import React, { useEffect, useRef, memo } from "react";
import "./TradingView.scss";

export function TradingView() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [
              "CRYPTO:BTCUSD|1D"
            ],
            [
              "COINBASE:GSTUSD|1D"
            ],
            [
              "CRYPTO:GMTUSD|1D"
            ],
            [
              "CRYPTO:ADAUSD|1D"
            ],
            [
              "CRYPTO:XRPUSD|1D"
            ]
          ],
          "chartOnly": false,
          "width": 800,
          "height": 600,
          "locale": "en",
          "colorTheme": "light",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "Raleway Dots, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "candlesticks",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f"
        }`;
    if (container.current) {
      console.log("appending!");
      (container.current as HTMLElement).appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container z-index-top" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
}

export default memo(TradingView);
