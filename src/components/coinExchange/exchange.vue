<template>
    <div class="business wrapDiv">
        <div class="exchangeDiv">
            <div class="left">
                <p>市场</p>
                <div class="tabs">
                    <!-- <span class="active">CNT</span>
                    <span>WE</span> -->
                    <span v-for="(item,index) in marketdicdata" :key="index" :class="marketdicactived == index?'active':''" @click="selectMark(item,index)">{{item}}</span>
                </div>
                <div class="tableHead">
                    <span>币种</span>
                    <span>最新价</span>
                    <span>涨幅</span>
                </div>
                <ul>
                    <li v-for="(item,index) in marketdata" :key="index">
                        <div @click="selectMarkItem(item.Base)">
                            <span>{{item.Base}}</span>
                            <span>{{getFullNum(item.Price)}}</span>
                            <span :class="{'colorgreen':item.PriceChangeRatio>0,'colorred':item.PriceChangeRatio<0}">{{item.PriceChangeRatio>999.99?'999.99':(-999.99>item.PriceChangeRatio?'-999.99':item.PriceChangeRatio)}}%</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="right">
                <!--tradingView 插件-->
                <!--<div class="Kline">
                    &lt;!&ndash; {{Base}}/{{currencyname}} &ndash;&gt;
                    <chat :symbol='Base+"/"+currencyname'></chat>
                </div>-->
                <div class="box">
                    <div class="itembox deal">
                        <p class="title"><span class="tabs" :class="type == 1?'active':''" @click="type = 1">限价交易</span><span class="tabs" :class="type == 2?'active':''" @click="type = 2">市场交易</span></p>
                        <div class="dealblock">
                            <div class="dealitem">
                              <p class="dealitemtitle" v-if="$store.state.userstatus.userId">
                                可用 {{useabledata[currencyname]?useabledata[currencyname].toFixed(8):'0.00000000'}}{{currencyname}}
                              </p>
                                <p class="dealitemtitle" v-else>
                                    <a @click="pageTo('login')">登录</a>或<a @click="pageTo('register')">注册</a>开始交易
                                </p>
                                <section class="dealeditbox">
                                    <span class="label">买入价</span>
                                    <div class="dealedit">
                                        <input type="text" v-if="type == 1" v-model="buydata.quotedPrice" @blur="buyprice(buydata.quotedPrice)" @input="handleInput">
                                        <input type="text" v-else placeholder="以市场最优价格买入" disabled>
                                        <span>{{currencyname}}</span>
                                    </div>
                                </section>
                                <section class="dealeditbox" v-if="type == 1">
                                    <span class="label">买入量</span>
                                    <div class="dealedit">
                                        <input type="text" v-model="buydata.amount" @input="handleInput" @blur="buyamount(buydata.amount)">
                                        <span>{{Base}}</span>
                                    </div>
                                </section>
                                <section class="dealeditbox" v-else>
                                    <span class="label">交易额</span>
                                    <div class="dealedit">
                                        <input type="text" v-model="buydata.amount" @input="handleInput" @blur="buyamount(buydata.amount)">
                                        <span>{{currencyname}}</span>
                                    </div>
                                </section>
                                <!-- <Slider v-if="type == 1" v-model="buydata.amount" :min="0" :max="canbuy" :step="0.000001" :disabled="canbuy == 0?true:false"></Slider>
                                <Slider v-else v-model="buydata.amount" :min="0" :max="(useabledata[currencyname]*1)" :step="0.000001" :disabled="useabledata[currencyname] == 0?true:false"></Slider>
                                <p class="rangmmp" v-if="type == 1">
                                    <span>0 {{Base}}</span>
                                    <span>{{canbuy}} {{Base}}</span>
                                </p> -->
                                <!-- <p class="rangmmp" v-else>
                                    <span>0 {{currencyname}}</span>
                                    <span>{{useabledata[currencyname]}} {{currencyname}}</span>
                                </p> -->
                                <p class="amount" v-if="type == 1">
                                    交易额 {{buydata.quotedPrice?(buydata.quotedPrice*buydata.amount).toFixed(8):'0.00000000'}} {{currencyname}}
                                </p>
                                <p class="amount" v-else></p>
                                <p v-if="$store.state.userstatus.userId" @click="buy" class="dealbtn" style="background:#589065;">买入{{Base}}</p>
                                <p v-else class="dealbtn">买入{{Base}}</p>
                            </div>

                            <div class="dealitem">
                              <p class="dealitemtitle" v-if="$store.state.userstatus.userId">
                                可用 {{useableBasedata[Base]?useableBasedata[Base].toFixed(8):'0.00000000'}}{{Base}}
                              </p>
                                <p class="dealitemtitle" v-else>
                                    <a @click="pageTo('login')">登录</a>或<a @click="pageTo('register')">注册</a>开始交易
                                </p>
                                <section class="dealeditbox">
                                    <span class="label">卖出价</span>
                                    <div class="dealedit">
                                        <input type="text" v-if="type == 1" v-model="selldata.quotedPrice" @blur="sellprice(selldata.quotedPrice)" @input="handleInput">
                                        <input type="text" v-else placeholder="以市场最优价格卖出" disabled>
                                        <span>{{currencyname}}</span>
                                    </div>
                                </section>
                                <section class="dealeditbox">
                                    <span class="label">卖出量</span>
                                    <div class="dealedit">
                                        <input type="text" v-model="selldata.amount" @input="handleInput" @blur="sellamount(selldata.amount)">
                                        <span>{{Base}}</span>
                                    </div>
                                </section>
                                <!-- <Slider v-model="selldata.amount" :min="0" :max="(useableBasedata[Base]*1)" :step="0.000001" :disabled="useableBasedata[Base] == 0?true:false"></Slider>
                                <p class="rangmmp">
                                    <span>0 {{Base}}</span>
                                    <span>{{useableBasedata[Base]}} {{Base}}</span>
                                </p> -->
                                <p class="amount" v-if="type == 1">
                                    交易额 {{selldata.quotedPrice?(selldata.amount*selldata.quotedPrice).toFixed(8):"0.00000000"}} {{currencyname}}
                                </p>
                                <p class="amount" v-else></p>
                                <p v-if="$store.state.userstatus.userId" @click="sell" class="dealbtn" style="background:#ae4e54;">卖出{{Base}}</p>
                                <p v-else class="dealbtn">卖出{{Base}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="itembox price">
                        <p class="title"><span class="spantitle">最新价{{handicapdata.price}} {{currencyname}}</span><span class="about">≈{{handicapdata.cnyprice?handicapdata.cnyprice.toFixed(2):''}} CNY</span></p>
                        <div class="pricelists coinsexchangelist">
                          <div class="exlist_head">
                            <span></span>
                            <span>价格({{currencyname}})</span>
                            <span>数量({{Base}})</span>
                          </div>
                          <div class="exlist_li" v-for="(item , index) in handicapdata.sell " :key="index">
                            <span class="colorred">卖{{handicapdata.sell.length-index}}</span>
                            <span>{{item.FriendlyPrice}}</span>
                            <span>{{item.FriendlyAmount  }}</span>
                          </div>
                          <div class="coins_line"></div>
                          <div class="exlist_li" v-for="(item , index) in handicapdata.buy" :key="item.FriendlyPrice">
                            <span class="colorgreen">买{{index+1}}</span>
                            <span>{{item.FriendlyPrice}}</span>
                            <span>{{item.FriendlyAmount}}</span>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="itembox deepness">
                        <p class="title"><i class="iconboult icon_unfold"></i><span class="spantitle">深度图</span></p>
                        <div class="deepnessline"></div>
                    </div>
                    <div class="itembox time">
                        <p class="title"><i class="iconboult icon_unfold"></i><span class="spantitle">实时成交</span></p>
                        <div class="timelists coinsexchangelist">
                          <div class="exlist_head">
                            <span>时间</span>
                            <span>方向</span>
                            <span>价格({{currencyname}})</span>
                            <span>数量({{Base}})</span>
                          </div>
                          <div class="exlist_li" v-for="(item , index) in orderlist" :key="index">
                            <span>{{$common.timeformat(item.CreationTimeStamp)}}</span>
                            <span :class="item.ExchangeType == 1?'colorgreen':'colorred'">{{item.ExchangeType == 1?'买入':'卖出'}}</span>
                            <span v-if="item.QuotationMethod == 1">{{item.QuotedPrice}}</span>
                            <span v-else>--</span>
                            <span>{{item.Amount}}</span>
                          </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="box">
                    <div class="itembox kinds">
                        <p class="title"><i class="iconboult icon_unfold"></i><span class="spantitle">币种资料</span></p>
                        <div class="kindsbox">
                            <div class="kindsleft">
                                <p class="title_b">{{currencyname}}</p>
                                <p class="title_t">{{descriptiondata.Name}}</p>
                                <p class="title_l">简介</p>
                                <p class="desc">{{descriptiondata.Description}}</p>
                            </div>
                            <div class="kindsright">
                                <p>
                                    <span>发行时间</span>
                                    <span>{{descriptiondata.IssueDateTime}}</span>
                                </p>
                                <p>
                                    <span>发行总量</span>
                                    <span>{{descriptiondata.IssueAmount}}</span>
                                </p>
                                <p>
                                    <span>流通总量</span>
                                    <span>{{descriptiondata.CirculateAmount}}</span>
                                </p>
                                <p>
                                    <span>众筹价格</span>
                                    <span>{{descriptiondata.CrowdfundingPrice?descriptiondata.CrowdfundingPrice:'--'}}</span>
                                </p>
                                <p>
                                    <span>白皮书</span>
                                    <span><a :href="descriptiondata.WhitePaperAddress" target="_blank">{{descriptiondata.WhitePaperAddress}}</a></span>
                                </p>
                                <p>
                                    <span>官网</span>
                                    <span><a :href="descriptiondata.OfficialWebsite" target="_blank">{{descriptiondata.OfficialWebsite}}</a></span>
                                </p>
                                <p>
                                    <span>区块查询</span>
                                    <span><a :href="descriptiondata.BlockAddress" target="_blank">{{descriptiondata.BlockAddress}}</a></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
/*import chat from "./chat.vue";*/
export default {
  data() {
    return {
      currencyname: this.$route.params.currency,
      // descriptionApi: this.$common.coinspath + "/v1/coin/description",
      // descriptiondata: {},
      useableapi: this.$common.coinspath + "/v1/user/money/useable", //可用资产
      useabledata: {},
      useableBasedata: {},
      marketdicapi: this.$common.coinspath + "/v1/marketdic", //行情目录名称
      marketdicdata: {},
      marketdicactived: 0,
      marketdataapi: this.$common.coinspath + "/v1/marketdata/", //行情数据
      marketdata: [],
      type: 1,
      buydata: {
        userId: this.$store.state.userstatus.userId,
        tokenPair: "",
        quotationMethod: "",
        quotedPrice: "",
        amount: 0
      },
      canbuy: 0,
      selldata: {
        userId: this.$store.state.userstatus.userId,
        tokenPair: "",
        quotationMethod: "",
        quotedPrice: "",
        amount: 0
      },
      cansell: 0,
      Base: "",
      buyapi: this.$common.coinspath + "/v1/commission/buy",
      sellapi: this.$common.coinspath + "/v1/commission/sell",
      handicapapi: this.$common.coinspath + "/v1/handicap",
      handicapdata: {
        buy: {},
        sell: {},
        cnyprice: "",
        price: ""
      },
      ordersapi: this.$common.coinspath + "/v1/coin/trading-data/orders",
      orderlist: {}
    };
  },
 /* components: {
    chat
  },*/
  created() {
    // this.getDescriptiondata();
    this.getMarketdicdata();
    this.getMarketdata(this.currencyname);
    if (this.$store.state.userstatus.userId) {
      this.getuseable(this.currencyname);
    }
  },
  methods: {
    toNumber(val){
      var num = new Number(val)
      return num.toFixed(8);
    },
    getFullNum(num){
    //处理非数字
    console.log(num)
    if(isNaN(num)){return num};

    //处理不需要转换的数字
    var str = ''+num;
    if(!/e/i.test(str)){return num;};

    return (num).toFixed(18).replace(/\.?0+$/, "");
},
    pageTo(path) {
      location.href = this.$common.host + "/#/" + path;
    },
    getMarketdata(currencyname) {
      this.$axios.get(this.marketdataapi + currencyname).then(res => {
        if (res.data.status == 1) {
          this.marketdata = res.data.data;
          this.Base = this.marketdata[0].Base;
          this.getuseablebase(this.Base);
          this.gethandicap(this.marketdata[0].TokenPair);
          this.getorderlist(this.marketdata[0].TokenPair);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getMarketdicdata() {
      this.$axios.get(this.marketdicapi).then(res => {
        if (res.data.status == 1) {
          this.marketdicdata = res.data.data;
          this.marketdicactived = this.marketdicdata.indexOf(this.currencyname);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // getDescriptiondata() {
    //   this.$http
    //     .get(this.descriptionApi, {
    //       params: this.$common.sort({ coinType: this.currencyname })
    //     })
    //     .then(res => {
    //       if (res.data.status == 1) {
    //         if (res.data.data == null) {
    //           this.descriptiondata = {};
    //         } else {
    //           this.descriptiondata = res.data.data;
    //         }
    //       } else {
    //         this.$Message.error(res.data.message);
    //       }
    //     });
    // },
    getuseable(currency) {
      if (!this.$store.state.userstatus.userId) {
        return false;
      }
      this.$axios
        .get(this.useableapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId,
            coin: currency
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.useabledata = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getuseablebase(currency) {
      if (!this.$store.state.userstatus.userId) {
        return false;
      }
      this.$axios
        .get(this.useableapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId,
            coin: currency
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.useableBasedata = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    selectMark(currency, index) {
      this.marketdicactived = index;
      this.currencyname = currency;
      this.getMarketdata(currency);
      // this.getDescriptiondata();
      this.getuseable(currency);
    },
    selectMarkItem(base) {
      this.Base = base;
      this.getuseablebase(this.Base);
      this.gethandicap(this.Base + "/" + this.currencyname);
      this.getorderlist(this.Base + "/" + this.currencyname);
    },
    buyprice(val) {
      this.buydata.quotedPrice = this.$common.clearNoNum(val);
      if (this.useabledata[this.currencyname]) {
        this.canbuy = (this.useabledata[this.currencyname] / val).toFixed(8);
      } else {
        this.canbuy = 0;
      }
    },
    sellprice(val) {
      this.selldata.quotedPrice = this.$common.clearNoNum(val);
    },
    buyamount(val){
      this.buydata.amount = this.$common.clearNoNum(val);
    },
    sellamount(val){
      this.selldata.amount = this.$common.clearNoNum(val);
    },
    gethandicap(tokenPair) {
      this.$axios
        .get(this.handicapapi, {
          params: this.$common.sort({
            tokenpair: tokenPair
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.handicapdata.buy = res.data.data.Buying;
             /* this.handicapdata.buy.reverse((a,b)=>a.res.data.data.Buying-b.res.data.data.Buying)*/
              this.handicapdata.sell = res.data.data.Selling;
              this.handicapdata.sell.reverse((a,b)=>a.res.data.data.Selling-b.res.data.data.Selling)
              this.handicapdata.cnyprice = res.data.data.CurrentTranCnyPrice;
            this.handicapdata.price = res.data.data.CurrentTranPrice;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getorderlist(tokenPair) {
      this.$axios
        .get(this.ordersapi, {
          params: this.$common.sort({
            tokenpair: tokenPair
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.orderlist = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    buy() {
      this.buydata.tokenPair = this.Base + "/" + this.currencyname;
      this.buydata.quotationMethod = this.type;
      // console.log(this.$common.sort(this.buydata));
      this.$axios
        .post(this.buyapi, this.$common.sort(this.buydata))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    sell() {
      this.selldata.tokenPair = this.Base + "/" + this.currencyname;
      this.selldata.quotationMethod = this.type;
      this.$axios
        .post(this.sellapi, this.$common.sort(this.selldata))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    handleInput(e) {
      this.val = e.target.value.replace(/[^\d]/g, "");
    }
  }
};
</script>

<style lang="scss" scoped>
$colorgray: #525a7b;
$colorbule: #3a82fa;
$colorred: #ae4e54;
$bgcolor: #212336;
$bgcolor2: #191b2a;
.exchangeDiv {
  display: flex;
  width: 1200px;/**/
  margin: auto;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 20px;
  .left {
    width: 258px;
    background: $bgcolor2;
    padding-bottom: 40px;
      margin-top: 10px;/*插件要是添加之后在给这个属性去掉*/
    p {
      font-size: 18px;
      padding: 24px;
      padding-bottom: 0;
      background: $bgcolor;
    }
    .tabs {
      padding: 0 24px;
      display: flex;
      justify-content: flex-start;
      height: 70px;
      align-items: flex-end;
      background: $bgcolor;
      span {
        font-size: 18px;
        padding-bottom: 16px;
        border-bottom: 3px solid transparent;
        margin-right: 44px;
        cursor: pointer;
      }
      span.active {
        border-bottom: 3px solid $colorbule;
        color: $colorbule;
      }
    }
    .tableHead {
      display: flex;
      justify-content: space-between;
      height: 58px;
      font-size: 14px;
      align-items: center;
      padding: 0 24px;
    }
    ul {
      li {
        padding: 0 24px;
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 27px;
          border-bottom: 1px solid #1e2235;
          span:nth-child(1) {
            width: 100px;
            text-align: left;
          }
          span:nth-child(2) {
            flex: 1;
            text-align: center;
          }
          span:nth-child(3) {
            width: 100px;
            text-align: right;
          }
        }
      }
      li:hover {
        background: #1e2235;
      }
    }
  }
  .right {
    width: 935px;
    /*.Kline {
      width: 100%;
      height: 400px;
      background: $bgcolor2;
    }*/
    .box {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .itembox {
        background: $bgcolor2;
        .title {
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0 10px;
          background: $bgcolor;
          .spantitle {
            padding-left: 10px;
          }
          .about {
            font-size: 13px;
            color: $colorgray;
            padding-left: 10px;
          }
          .tabs {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid transparent;
            margin: 0 17px;
            cursor: pointer;
          }
          .tabs.active {
            color: $colorbule;
            border-bottom: 1px solid $colorbule;
          }
        }
      }
      .deal {
        width: 623px;
        .dealblock {
          // height: 300px;
          padding-bottom: 26px;
          display: flex;
          justify-content: space-around;
          .dealitem {
            width: 312px;
          margin: 0 25px;
            .dealitemtitle {
              padding: 14px 0;
              border-bottom: 1px solid #2c3753;
               /* margin-left: 25px;*/


              a {
                color: $colorbule;
              }
            }
            .dealeditbox {
              padding: 20px 0;
              color: $colorgray;
                /*margin-left: 25px;*/
              .label {
                padding-bottom: 8px;
                display: block;
              }
              .dealedit {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 36px;
                border: 1px solid #49557d;
                border-radius: 3px;
                background: #1e2235;
                input {
                  flex: 1;
                  padding-left: 10px;
                  border: none;
                  background: transparent;
                  color: $colorgray;
                  outline: none;
                }
                span {
                  padding-right: 20px;
                }
              }
            }
            .rangmmp {
              display: flex;
              justify-content: space-between;
            }
            .amount {
              padding: 30px 0;
                /*margin-left: 25px;*/
            }
            .dealbtn {
              width: 100%;
              height: 38px;
              line-height: 38px;
              background: #4e5b85;
              text-align: center;
              border-radius: 3px;
              cursor: pointer;
            }
          }
        }
      }
      .price {
        width: 308px;
        .pricelists {
          height: 300px;
        }
        .pricelists.coinsexchangelist {
          .exlist_head,
          .exlist_li {
            span:nth-child(1) {
              flex: 1;
            }
            span:nth-child(2),
            span:nth-child(3) {
              width: 100px;
            }
          }
        }
      }
      .deepness {
        width: 542px;
        .deepnessline {
          height: 300px;
        }
      }
      .time {
        width: 389px;
        .timelists {
          height: 300px;
          overflow: auto;
        }
        .timelists.coinsexchangelist {
          span:nth-child(1) {
            flex: 1;
          }
          span:nth-child(2) {
            width: 50px;
          }
          span:nth-child(3),
          span:nth-child(4) {
            width: 90px;
          }
        }
      }
      .kinds {
        width: 100%;
        .kindsbox {
          display: flex;
          justify-content: space-between;
          height: auto;
          padding: 30px;
          .kindsleft {
            width: 500px;
            .title_b {
              font-size: 20px;
              color: #757da0;
            }
            .title_t {
              padding: 16px 0;
              border-bottom: 1px solid #2c3753;
            }
            .title_l {
              padding-top: 24px;
              color: $colorgray;
              padding-bottom: 16px;
            }
            .desc {
              line-height: 20px;
            }
          }
          .kindsright {
            width: 745px;
            p {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height: 45px;
              border-bottom: 1px solid #28334f;
              span:nth-child(1) {
                color: $colorgray;
                width: 200px;
              }
              span:nth-child(2) {
                flex: 1;
                a {
                  color: $colorbule;
                }
              }
            }
          }
        }
      }
    }
    .coinsexchangelist {
      padding: 0 23px;
      font-size: 12px;
      .exlist_head {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        color: #525a7b;
        span {
          text-align: right;
        }
        span:nth-child(1) {
          text-align: left;
        }
      }
      .exlist_li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        span {
          text-align: right;
        }
        span:nth-child(1) {
          text-align: left;
        }
      }
      .coins_line {
        border-bottom: 1px solid #28334f;
        padding-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

<style>
</style>
