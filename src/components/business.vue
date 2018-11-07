<template>
    <div class="business wrapDiv">
        <div class="businessList">
            <div class="tabs">
                <div class="buy">
                    <p>我要买</p>
                    <section>
                        <span :class="{active:typedata.type==1&&typedata.currency==$store.state.name.currencyname}" @click="selectdata(1,$store.state.name.currencyname)">{{$store.state.name.currencyname}}</span>
                        <span :class="{active:typedata.type==1&&typedata.currency=='BTC'}" @click="selectdata(1,'BTC')">BTC</span>
                        <span :class="{active:typedata.type==1&&typedata.currency=='ETH'}" @click="selectdata(1,'ETH')">ETH</span>
                        <!-- <span :class="{active:typedata.type==1&&typedata.currency=='WE'}" @click="selectdata(1,'WE')">WE</span> -->
                    </section>
                </div>
                <span class="line"></span>
                <div class="sell">
                    <p>我要卖</p>
                    <section>
                        <span :class="{active:typedata.type==2&&typedata.currency==$store.state.name.currencyname}" @click="selectdata(2,$store.state.name.currencyname)">{{$store.state.name.currencyname}}</span>
                        <span :class="{active:typedata.type==2&&typedata.currency=='BTC'}" @click="selectdata(2,'BTC')">BTC</span>
                        <span :class="{active:typedata.type==2&&typedata.currency=='ETH'}" @click="selectdata(2,'ETH')">ETH</span>
                        <!-- <span :class="{active:typedata.type==2&&typedata.currency=='WE'}" @click="selectdata(2,'WE')">WE</span> -->
                    </section>
                </div>
            </div>
            <div class="tableLists">
                <div class="tableHead">
                    <span style="width:270px">商家（30天成单|完成率）</span>
                    <span style="width:210px">数量</span>
                    <span style="width:230px">限额</span>
                    <span style="width:180px">单价</span>
                    <span style="width:160px">用户支付方式</span>
                    <span style="flex:1;text-align:right;">操作</span>
                </div>
                <ul class="list">
                    <li v-for="item in data" :key="item.advertisingId">
                        <div class="listItem" v-if="showItemId != item.advertisingId">
                            <span class="name" @click="toown(item.userId)">
                                <span class="headericon">{{item.nickname.substr(0, 1)}}</span> 
                                {{item.nickname}}（{{item.orderTotal}}|{{item.tradeRate}})
                            </span>
                            <span class="number">{{item.quantity}} {{item.currency}}</span>
                            <span class="cny1">{{item.minLimit}}-{{item.maxLimit}} {{item.fiat=='人民币'?'CNY':''}}</span>
                            <span class="cny2">{{item.price}} {{item.fiat=='人民币'?'CNY':''}}</span>
                            <section class="payWays">
                                <i class="payicon payicon-wechat" v-if="item.isWeixin == 1"></i>
                                <i class="payicon payicon-alipay" v-if="item.isAlipay == 1"></i>
                                <i class="payicon payicon-card" v-if="item.isBank == 1"></i>
                            </section>
                            <span class="done">
                                <Button v-if="item.isSeniorAuth == 0||(item.isSeniorAuth == 1&&$store.state.userstatus.isSeniorAuth == 1)" type="primary" @click="showItemId = item.advertisingId;showrate = item.price">{{item.type == 1?'出售'+item.currency:'购买'+item.currency}}</Button>
                                <span v-else style="font-size:14px;">{{item.type == 1?'出售':'购买'}}需 <a @click="pageTo('certification')">高级认证</a></span>
                            </span>
                        </div>
                        <div class="listOperate" v-else>
                            <section class="part1">
                                <span class="headericon headicon">{{item.nickname.substr(0, 1)}}</span>
                                <p class="part1p">
                                    <span>{{item.nickname}}（{{item.orderTotal}}|{{item.tradeRate}})</span>
                                    <span>{{item.quantity}} {{item.currency}}</span>
                                </p>
                                <p class="part1p">
                                    <span style="color:#00ccff">{{item.minLimit}}-{{item.maxLimit}} {{item.fiat=='人民币'?'CNY':''}}</span>
                                    <span>{{item.price}} {{item.fiat=='人民币'?'CNY':''}}</span>
                                </p>
                                <div class="form" v-if="item.type == 1">
                                    <Input v-model="sellcost" :placeholder="item.fiat=='人民币'?'CNY':''" style="width: 149px" class='input1' @on-blur="sellcostchange(sellcost)"/>
                                    <img src="../assets/images/change.png" alt="">
                                    <Input v-model="sellData.quantity" :placeholder="item.currency" style="width: 157px" class='input1' @on-blur="sellquantitychange(sellData.quantity)"/>
                                    <Input v-model="sellData.payPassword" placeholder="资金密码" type="password" style="width: 149px" class='input3'/>
                                    <span class="orderBtn" @click="sell(item.advertisingId)">下单</span>
                                    <span class="cancel" @click="cancel">取消</span>
                                </div>
                                <div class="form" v-else>
                                    <Input v-model="buycost" :placeholder="item.fiat=='人民币'?'CNY':''" style="width: 149px" class='input1' @on-blur="buycostchange(buycost)"/>
                                    <img src="../assets/images/change.png" alt="">
                                    <Input v-model="buyData.quantity" :placeholder="item.currency" style="width: 149px" class='input1' @on-blur="buyquantitychange(buyData.quantity)"/>                                    
                                    <span class="orderBtn" @click="buy(item.advertisingId)">下单</span>
                                    <span class="cancel" @click="cancel">取消</span>
                                </div>
                            </section>
                            <section class="part2">
                                <div>
                                    <span><i class="payicon payicon-wechat" v-if="item.isWeixin == 1"></i></span>
                                    <span><i class="payicon payicon-card" v-if="item.isBank == 1"></i></span>
                                    <span><i class="payicon payicon-alipay" v-if="item.isAlipay == 1"></i></span>
                                </div>
                                <p>买方付款时限为15分钟</p>
                            </section>
                        </div>
                    </li>
                </ul>
                <div class="pageBox blackpage">
                    <Page class-name="pages" @on-change='handlePage' :total="totalpage"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      getBuyapi: this.$common.path + "/advertising/getBuy",
      getSellapi: this.$common.path + "/advertising/getSell",
      api: this.$common.path + "/advertising/getBuy",
      buyapi: this.$common.path + "/order/buy",
      sellapi: this.$common.path + "/order/sell",
      typedata: {
        currency: this.$store.state.name.currencyname,
        type: 1
      },
      totalpage: 0,
      data: {},
      showItemId: "",
      showrate: "",
      buyData: {
        advertisingId: "",
        userId: this.$store.state.userstatus.userId,
        quantity: ""
      },
      buycost: "",
      sellData: {
        advertisingId: "",
        userId: this.$store.state.userstatus.userId,
        quantity: "",
        payPassword: ""
      },
      sellcost: ""
    }
  },
  created() {
    this.getlist(1);
  },
  methods: {
    pageTo(path) {
      this.$router.push({ name: path });
    },
    handlePage: function(page) {
      this.getlist(page);
    },
    toown(id) {
      this.$router.push({ name: "own", params: { id: id } });
    },
    selectdata(type, currency) {
      this.typedata.type = type;
      this.typedata.currency = currency;
      var api = "";
      if (type == 1) {
        this.api = this.getBuyapi;
      } else if (type == 2) {
        this.api = this.getSellapi;
      }
      this.getlist(1);
    },
    getlist(page) {
      this.$http
        .get(this.api, {
          params: this.$common.sort({ pageIndex: page, pageSize: 10, currency: this.typedata.currency })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.totalpage = res.data.data.recordCount;
            this.data = res.data.data.list;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    cancel(type) {
      this.sellData = {
        advertisingId: "",
        userId: this.$store.state.userstatus.userId,
        quantity: "",
        payPassword: ""
      };
      this.buyData = {
        advertisingId: "",
        userId: this.$store.state.userstatus.userId,
        quantity: ""
      };
      this.showItemId = "";
    },
    sell(id) {
      this.sellData.advertisingId = id;
      if(this.sellData.payPassword == ''){
        this.$Message.error('请输入资金密码');
        return false;
      }
      this.$http
        .post(this.sellapi, this.$common.sort(this.sellData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    buy(id) {
      this.buyData.advertisingId = id;
      this.$http
        .post(this.buyapi, this.$common.sort(this.buyData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    sellcostchange(val) {
      val = this.$common.clearNoNum(val,2);
      this.sellcost = val;
      this.sellData.quantity = parseFloat(val / this.showrate).toFixed(8);
    },
    sellquantitychange(val){
      val = this.$common.clearNoNum(val);
      this.sellData.quantity = val;
      this.sellcost = parseFloat(val*this.showrate).toFixed(2);
    },
    buycostchange(val) {
      val = this.$common.clearNoNum(val,2);
      this.buycost = val;
      this.buyData.quantity = parseFloat(val / this.showrate).toFixed(8);
    },
    buyquantitychange(val){
      val = this.$common.clearNoNum(val);
      this.buyData.quantity = val;
      this.buycost = parseFloat(val*this.showrate).toFixed(2);
    }
  },
  watch: {
    showItemId() {
      this.sellData = {
        advertisingId: "",
        userId: this.$store.state.userstatus.userId,
        quantity: "",
        payPassword: ""
      };
      this.sellcost = '',
      this.buycost = '',
      this.buyData = {
        advertisingId: "",
        userId: this.$store.state.userstatus.userId,
        quantity: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/tablelist.scss";

.business {
  .businessList {
    width: 1200px;
    margin: auto;
    .tabs {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      padding-top: 58px;
      padding-bottom: 57px;
      div {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: flex-start;
        justify-content: space-between;
        p {
          font-size: 24px;
          color: #d6e0f2;
          padding-bottom: 35px;
        }
        section {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          span {
            font-size: 24px;
            color: #ced8ed;
            padding: 16px 0;
            cursor: pointer;
          }
          .active {
            color: #3a82fe;
            border-bottom: 2px solid #3a82fe;
          }
        }
      }
      .line {
        width: 0;
        height: 98px;
        border: 1px solid #899fd5;
        margin-left: 52px;
        margin-right: 52px;
      }
    }
    .tableLists {
      padding-bottom: 18px;
      ul.list {
        li {
          .listItem {
            .name {
              display: flex;
              width: 270px;
              align-items: center;
              span.headericon {
                margin-right: 10px;
                width: 30px;
                height: 30px;
                line-height: 30px;
              }
            }
            .number {
              width: 210px;
            }
            .cny1 {
              width: 230px;
            }
            .cny2 {
              width: 180px;
            }
            .payWays {
              width: 160px;
            }
            .done {
              flex: 1;
              justify-content: flex-end;
              display: flex;
            }
          }
          .listOperate {
            display: flex;
            height: 187px;
            flex-direction: column;
            justify-content: center;
            background: #3e4a74;
            section {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 20px;
            }
            .part1 {
              .headicon {
                width: 30px;
                height: 30px;
                line-height: 30px;
                margin-right: 10px;
                position: relative;
                top: -20px;
              }
              p {
                display: flex;
                flex-direction: column;
                font-size: 17px;
                span {
                  line-height: 30px;
                }
              }
              p.part1p {
                width: 220px;
              }
              .form {
                display: flex;
                align-items: center;
                flex: 1;
                justify-content: flex-end;
                .input1,
                .input2,
                .input3 {
                  margin: 0 10px;
                }
                .orderBtn {
                  width: 68px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  font-size: 18px;
                  background: orange;
                  margin: 0 15px;
                }
                .cancel {
                  font-size: 18px;
                }
              }
            }
            .part2 {
              div {
                display: flex;
                align-items: center;
                padding-left: 20px;
                span {
                  display: flex;
                  align-items: center;
                  padding-left: 5px;
                  i {
                    display: inline-block;
                    margin-right: 13px;
                  }
                }
              }
            }
          }
        }
        .payWays {
          display: flex;
          justify-content: flex-start;
          i {
            margin-right: 12px;
          }
        }
      }
    }
  }
}
</style>
<style>
@import "../assets/css/page.css";

.listOperate .ivu-btn-primary {
  color: #d6e0f2;
  background-color: #3a82fe;
  border-color: #3a82fe;
  font-size: 17px;
  border-radius: 2px;
}
.listOperate .ivu-input {
  height: 40px;
  font-size: 14px;
  border: none;
  border-radius: 0px;
  color: #5f7eb5;
  background-color: #152453;
}
.listOperate .input1 .ivu-input {
  text-align: right;
}
.listOperate .ivu-input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #5f7eb5;
}
.listOperate .ivu-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #5f7eb5;
}
.listOperate .ivu-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #5f7eb5;
}
.listOperate .ivu-input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #5f7eb5;
}
</style>
