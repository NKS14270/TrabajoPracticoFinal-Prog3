const widgets = [
    { id: "graficobtc", symbol: "BINANCE:BTCUSDT" },
    { id: "graficoltc", symbol: "BINANCE:LTCUSDT" },
    { id: "graficousdt", symbol: "BINANCE:USDTars" },
    { id: "graficousdc", symbol: "BINANCE:USDCUSDT" },
    { id: "graficoeth", symbol: "BINANCE:ETHUSDT" }
  ];

  function loadTradingViewWidgets() {
    widgets.forEach(({ id, symbol }) => {
      const container = document.getElementById(id);

      const widgetContainer = document.createElement("div");
      widgetContainer.className = "tradingview-widget-container";

      const widget = document.createElement("div");
      widget.className = "tradingview-widget-container__widget";

      widgetContainer.appendChild(widget);
      container.appendChild(widgetContainer);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";

      const config = {
        symbol,
        width: 350,
        height: 220,
        locale: "es",
        dateRange: "1D",
        colorTheme: "dark",
        isTransparent: true,
        autosize: false,
        largeChartUrl: "",
        chartOnly: false,
        noTimeScale: true
      };

      script.innerHTML = JSON.stringify(config);
      widget.appendChild(script);
    });
  }

  window.addEventListener("DOMContentLoaded", loadTradingViewWidgets);