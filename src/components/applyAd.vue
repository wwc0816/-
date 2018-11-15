<template>
    <div class="business wrapDiv">
        <div class="applyad commonDiv">
            <p class="title">发布广告</p>
            <div class="applyFormBox">
                <section>
                    <p>国家/地区</p>
                    <Select v-model="data.area">
                        <Option v-for="item in nationalitys" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </section>
                <section>
                    <p>选择法币</p>
                    <Select v-model="data.fiat">
                        <Option v-for="item in legalys" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </section>
                <section>
                    <p>交易类型</p>
                    <Select v-model="data.type">
                        <Option v-for="item in tradetypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </section>
                <section>
                    <p>选择货币</p>
                    <Select v-model="data.currency">
                        <Option v-for="item in currencys" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </section>
            </div>
            <div class="applyFormBox">
                <section>
                    <p>货币单价</p>
                    <i-input v-model="data.price" placeholder="输入货币单价" @on-blur="pricechange(data.price)">
                        <span slot="append">CNY</span>
                    </i-input>
                </section>
                <section>
                    <p>交易数量</p>
                    <i-input v-model="data.quantity" placeholder="输入交易数量" @on-blur="quantitychange(data.quantity)">
                        <span slot="append">{{data.currency}}</span>
                    </i-input>
                </section>
                <section>
                    <p>单笔最小金额</p>
                    <i-input v-model="data.minLimit" placeholder="输入单笔最小金额" @on-blur="minLimitchange(data.minLimit)">
                        <span slot="append">{{data.currency}}</span>
                    </i-input>
                </section>
                <section>
                    <p>单笔最大金额</p>
                    <i-input v-model="data.maxLimit" placeholder="输入单笔最大金额" @on-blur="maxLimitchange(data.maxLimit)">
                        <span slot="append">{{data.currency}}</span>
                    </i-input>
                </section>
            </div>
            <div class="applyFormBox">
                <!-- <section>
                    <p>付款方式</p>
                    <Select v-model="data.payway">
                        <Option v-for="item in payways" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </section> -->
                <section>
                    <p>需对方通过高级认证</p>
                    <Select v-model="data.isSeniorAuth">
                        <Option v-for="item in authentications" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </section>
            </div>
            <div class="applyFormBox">
                <section>
                    <p>资金密码</p>
                    <input type="text" style="display: none;">
                    <input type="password" style="display: none;">
                    <i-input v-model="data.payPassword" placeholder="请输入资金密码" type="password" autocomplete="off"></i-input>
                </section>
            </div>
            <Button class="applyBtn" @click="applyBtn">发布广告</Button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      urlapi: this.$common.path + "/advertising/publish",
      nationalitys: [
        {
          value: "中国",
          label: "中国"
        }
      ],
      legalys: [
        {
          value: "人民币",
          label: "人民币"
        }
      ],
      tradetypes: [
        {
          value: "1",
          label: "我要买"
        },
        {
          value: "2",
          label: "我要卖"
        }
      ],
      currencys: [
        {
          value: this.$store.state.name.currencyname,
          label: this.$store.state.name.currencyname
        },{
          value: 'BTC',
          label: 'BTC'
        },{
          value: 'ETH',
          label: 'ETH'
        }
      ],
    //   payways: [
    //     {
    //       value: "1",
    //       label: "银行卡"
    //     },
    //     {
    //       value: "2",
    //       label: "微信支付"
    //     },
    //     {
    //       value: "3",
    //       label: "支付宝支付"
    //     }
    //   ],
      authentications: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ],
      data: {
        userId: this.$store.state.userstatus.userId,
        area: "中国",
        fiat: "人民币",
        type: "1",
        currency: this.$store.state.name.currencyname,
        // payway: "1",
        isSeniorAuth: 1,
        price: "",
        quantity: "",
        minLimit: "",
        maxLimit: "",
        payPassword: ""
      }
    };
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
    if (this.$store.state.userstatus.isPayMargin == 0) {
      this.$router.push({ name: "ad" });
    }
  },
  methods: {
    applyBtn() {
      if (this.data.price == "") {
        this.$Message.info("请填写单价");
        return;
      }
      if (this.data.quantity == "") {
        this.$Message.info("请填写数量");
        return;
      }
      if (this.data.minLimit == "") {
        this.$Message.info("请填写最小限额");
        return;
      }
      if (this.data.maxLimit == "") {
        this.$Message.info("请填写大小限额");
        return;
      }
      if (this.data.payPassword == "") {
        this.$Message.info("请填写资金密码");
        return;
      }
      this.$http.post(this.urlapi, this.$common.sort(this.data)).then(res => {
        if (res.data.status == 1) {
          this.$router.push({ name: "myAd" });
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    pricechange(val){
      val = this.$common.clearNoNum(val);
      this.data.price = val;
    },
    quantitychange(val){
      val = this.$common.clearNoNum(val);
      this.data.quantity = val;
    },
    minLimitchange(val){
      val = this.$common.clearNoNum(val);
      this.data.minLimit = val;
    },
    maxLimitchange(val){
      val = this.$common.clearNoNum(val);
      this.data.maxLimit = val;
    },
  }
};
</script>

<style lang="scss" scoped>
.applyad {
  padding-bottom: 100px;
  .title {
    font-size: 36px;
    padding: 70px 0;
  }
  .applyFormBox {
    display: flex;
    justify-content: flex-start;
    section {
      width: 276px;
      padding-bottom: 61px;
      margin-right: 30px;
      p {
        font-size: 14px;
        padding-bottom: 15px;
      }
    }
    section:last-child {
      margin-right: 0;
    }
  }
}
</style>

<style>
.applyFormBox .ivu-select,
.applyFormBox .ivu-select-arrow {
  color: #d6e0f2;
}
.applyFormBox .ivu-select-selection {
  background-color: #3c508c;
  border-radius: 0;
  border: none;
}
.applyFormBox .ivu-select-single .ivu-select-selection {
  height: 40px;
}
.applyFormBox .ivu-select-visible .ivu-select-selection {
  box-shadow: none;
}
.applyFormBox .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.applyFormBox .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.applyFormBox .ivu-input-group {
  font-size: 14px;
}
.applyFormBox .ivu-input {
  height: 40px;
  font-size: 14px;
  color: #d6e0f2;
  border: none;
  border-radius: 0;
  outline: none;
  box-shadow: none;
  background-color: #3c508c;
}
.applyFormBox .ivu-input-group-append,
.applyFormBox .ivu-input-group-prepend {
  font-size: 14px;
  color: #d6e0f2;
  border: none;
  border-radius: 0;
  background-color: #3c508c;
}
.applyFormBox .ivu-input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #87aef5;
}
.applyFormBox .ivu-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #87aef5;
}
.applyFormBox .ivu-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #87aef5;
}
.applyFormBox .ivu-input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #87aef5;
}
.applyad .ivu-btn {
  color: #fff;
  background-color: #0d5bb5;
  border-color: #0d5bb5;
  width: 160px;
  height: 60px;
  font-size: 18px;
  margin: auto;
  display: block;
}
</style>
