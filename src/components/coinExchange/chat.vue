<template>
<div id="tv_chart_container"></div>    
</template>

<script>
export default {
  name: "tv",
  data() {
    return {};
  },
  props:['symbol'],
  mounted() {
    this.init()
  },
  methods:{
    init(){
      var widget = (window.tvWidget = new TradingView.widget({fullscreen: true,
					symbol: this.symbol,
          interval: 'D',
					container_id: "tv_chart_container",
					datafeed: new Datafeeds.UDFCompatibleDatafeed(window.location.protocol + "//api.exchange-data.coinsup.top/v1/trading-data"),
					library_path: "../../../static/charting_library/",
					locale: "zh",
					disabled_features: ["use_localstorage_for_settings"],
					preset: "mobile",
					overrides: {
						"paneProperties.background": "#222222",
						"paneProperties.vertGridProperties.color": "#454545",
						"paneProperties.horzGridProperties.color": "#454545",
						"symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor" : "#AAA",
            "mainSeriesProperties.candleStyle.upColor": "#6ba583",
"mainSeriesProperties.candleStyle.downColor": "#d75442",
// "mainSeriesProperties.candleStyle.drawWick": true,
// "mainSeriesProperties.candleStyle.drawBorder": true,
// "mainSeriesProperties.candleStyle.borderColor": "#378658",
// "mainSeriesProperties.candleStyle.borderUpColor": "#225437",
// "mainSeriesProperties.candleStyle.borderDownColor": "#5b1a13",
// "mainSeriesProperties.candleStyle.wickUpColor": 'rgba( 115, 115, 117, 1)',
// "mainSeriesProperties.candleStyle.wickDownColor": 'rgba( 115, 115, 117, 1)',
// "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
					}
    }));
    }
  },
  watch:{
    symbol(newobj,oldobj){
      this.init()
    }
  }
};
</script>
<style>
iframe {
  height: 400px !important;
}
</style>