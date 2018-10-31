<template>
    <div class="home wrapDiv">
        <div class="homeContent mapbg">
            <img src="../assets/images/WeChainOTC.png" alt="" class="bigLogo">
            <p class="slogen">全球领先的数字资产金融服务和交易平台</p>
            <!-- <div class="selectBox">
                        <Select v-model="nationality" disabled style="width:120px" size="large" class="nationality">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="tradeType" style="width:120px" size="large" class="tradeType">
                            <Option v-for="item in tradeTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <section class="inputBox">
                            <Input v-model="currency" class="currency" style="width: 200px" />
                            <span class="line"></span>
                            <Select v-model="currencyType" style="width:100px" size="large" class="currencyType">
                                <Option v-for="item in currencyTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </section>
                        <Select v-model="virtual" style="width:120px" size="large" class="virtual">
                            <Option v-for="item in virtuals" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <span class="passtext">通过</span>
                        <Select v-model="payType" style="width:175px" size="large" class="payType">
                            <Option v-for="item in payTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <span class="selectBtn">搜索</span>    
            </div> -->
            <div class="decBox">
                <section>
                    <img src="../assets/images/safe.png" alt="">
                    <span>安全可信赖</span>
                    <p>多年数字资产金融服务经验<br />专业分布式架构和防 DDOS 攻击系统</p>
                </section>
                <section>
                    <img src="../assets/images/free.png" alt="">
                    <span>全球生态布局</span>
                    <p>多个国家设立本土化交易服务中心<br />打造多业务形态为一体的区块链生态圈</p>
                </section>
                <section>
                    <img src="../assets/images/server.png" alt="">
                    <span>用户至上</span>
                    <p>7*24小时客服支持，随时帮你处理订单问题</p>
                </section>
            </div>
            <div class="download">
                <p><img src="../assets/images/logo.png"> 手机客户端</p>
                <span>随时提醒 快速交易</span>
                <section>
                    <a target="_blank" href="http://cdn.bxgsft.cn/appp.php/4549"></a>
                    <a target="_blank" href="http://cdn.bxgsft.cn/appp.php/3266"></a>
                </section>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
  // data() {
  //   return {
  //     cityList: [
  //       {
  //         value: "1",
  //         label: "中国"
  //       }
  //     ],
  //     tradeTypes: [
  //       {
  //         value: "1",
  //         label: "购买"
  //       },
  //       {
  //         value: "2",
  //         label: "出售"
  //       }
  //     ],
  //     currencyTypes: [
  //       {
  //         value: "1",
  //         label: "人民币"
  //       },
  //       {
  //         value: "2",
  //         label: "美元"
  //       },
  //       {
  //         value: "3",
  //         label: "日元"
  //       }
  //     ],
  //     virtuals: [
  //       {
  //         value: "1",
  //         label: "BTC"
  //       },
  //       {
  //         value: "2",
  //         label: "ETH"
  //       },
  //       {
  //         value: "3",
  //         label: "USDT"
  //       },
  //       {
  //         value: "4",
  //         label: "EOS"
  //       },
  //       {
  //         value: "5",
  //         label: "HT"
  //       }
  //     ],
  //     payTypes: [
  //       {
  //         value: "1",
  //         label: "全部支付方式"
  //       },
  //       {
  //         value: "2",
  //         label: "微信支付"
  //       },
  //       {
  //         value: "3",
  //         label: "支付宝支付"
  //       },
  //       {
  //         value: "4",
  //         label: "银行卡支付"
  //       }
  //     ],
  //     virtual: "1",
  //     payType: "1",
  //     currency: "",
  //     nationality: "1",
  //     tradeType: "1",
  //     currencyType: "1"
  //   };
  // }
};
</script>

<style lang="scss" scoped>
.home {
  .homeContent {
    .bigLogo {
      display: block;
      padding-top: 177px;
      margin: auto;
    }
    .slogen {
      padding-top: 63px;
      font-size: 30px;
      color: #ffffff;
      text-align: center;
    }
    // .selectBox {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   width: 1200px;
    //   height: 40px;
    //   padding-top: 221px;
    //   .inputBox{
    //       display: flex;
    //       align-items: center;
    //       background: #3c508c;
    //       .line{
    //           width: 0;
    //           height: 35px;
    //           border: 1px solid #103278;
    //       }
    //   }
    //   .passtext{
    //       font-size: 14px;
    //   }
    //   .selectBtn{
    //       font-size: 18px;
    //       width: 80px;
    //       height: 40px;
    //       text-align: center;
    //       line-height: 40px;
    //       color: #ffffff;
    //       background: #0d5bbe;
    //       cursor: pointer;
    //   }
    // }
    .decBox {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding-top: 117px;
      section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
        span {
          font-size: 24px;
          color: #ffffff;
          padding-top: 30px;
          padding-bottom: 8px;
        }
        p {
          color: #d6e0f2;
          line-height: 36px;
        }
      }
    }
    .download {
      color: #ffffff;
      height: 450px;
      background-image: url(../assets/images/downloadbg.png);
      background-position: right center;
      background-repeat: no-repeat;
      p {
        padding-top: 133px;
        font-size: 24px;
      }
      span {
        display: block;
        color: #ced8ed;
        padding-top: 19px;
        padding-bottom: 25px;
      }
      section {
        display: flex;
        flex-direction: row;
        a {
          width: 120px;
          height: 49px;
          margin-right: 27px;
        }
        a:nth-child(1) {
          background-image: url(../assets/images/Android.png);
        }
        a:nth-child(2) {
          background-image: url(../assets/images/iphone.png);
        }
      }
    }
  }
}
</style>

<style>
.selectBox .ivu-select-large.ivu-select-single .ivu-select-selection{
    height: 40px;
}
.selectBox .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .selectBox .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    height: 40px;
    line-height: 40px;
    background: #3c508c;

}
.selectBox .ivu-select-selection{
    border-radius: 0;
    border: none;
}
.selectBox .ivu-select{
    color: #d6e0f2;
    box-shadow:none;
}
.selectBox .ivu-select-arrow{
    color: #d6e0f2;
}
.selectBox .ivu-input{
    background-color: #3c508c;
    color: #d6e0f2;
    font-size: 14px;
    border: none;
    box-shadow:none;
}
</style>

