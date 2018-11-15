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
        // 图表
      var widget = (window.tvWidget = new TradingView.widget({
          fullscreen: true,
          symbol: this.symbol,/*是品种显示数据格式化接口*/





            /*天单位*/

          rinterval:'1' ,/* interval: 'D'*/


          /*获取的元素*/
					container_id: "tv_chart_container",
          /*接口地址 调用数据*/
					datafeed: new Datafeeds.UDFCompatibleDatafeed(window.location.protocol + "//api.exchange-data.coinsup.top/v1/trading-data"),//找接口   时间字段在哪里返回的
          /*//api.exchange-data.coinsup.top/v1/trading-data   原来的代码*/
          /*https://api.exchange-data.coinsup.top/v1/trading-data/quoted-depth?symbol=BTC/UST*/
                 /*这是什么路径*/
					library_path: "../../../static/charting_library/",
                   /*中文*/
					locale: "zh",

					disabled_features: ["use_localstorage_for_settings"],
					preset: "mobile",/*手机端mobile*/













          /*对Widget对象的默认属性进行覆盖*/
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
 "mainSeriesProperties.candleStyle.wickUpColor": 'rgba( 115, 115, 117, 1)',
 "mainSeriesProperties.candleStyle.wickDownColor": 'rgba( 115, 115, 117, 1)',
// "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
					},


    }));

    },




},



    /*监听事件*/
  watch:{
    symbol(newobj,oldobj){
      this.init()
    }
  }
};
</script>
<style>
iframe {
  height: 300px!important;
}
</style>