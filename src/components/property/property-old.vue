<template>
    <div class="business wrapDiv">
        <div class="propertyDiv">
            <p class="propertytitle">
                <span>我的资产</span>
                <span>总资产折合 ：{{$common.number_format(total,2)}} <i>CNY</i> | 保证金 ：{{$store.state.userstatus.isPayMargin == 1?'1000.00000000':'0.00000000'}} <i>{{$store.state.name.currencyname}}</i></span>
            </p>
            <div class="propertyList">
                <ul>
                    <li v-for="(item, index) in weBankList" :key="index">
                        <section>
                            <span class="headericon">{{item.currency.substr(0, 1)}}</span>
                            <span>{{item.currency}}</span>
                        </section>
                        <section>
                            <span>法币账户</span>
                            <p>可用 ：<span>{{$common.number_format(item.thawAmount,8)}} {{item.currency}}</span></p>
                            <p>冻结 ：<span>{{$common.number_format(item.frozenAmount,8)}} {{item.currency}}</span></p>
                        </section>
                        <section>
                            <Button type="primary" class="rechargebtn propertyBtn" @click="openrechange(item.currency)">充值</Button>
                            <Button type="primary" class="propertyBtn" @click="openwithdraw(item.currency,item.thawAmount)">提币</Button>
                        </section>
                    </li>
                </ul>
            </div>
            <p class="detailtitle">资产明细</p>
            <p class="propertyDetailListTitle">
                <span>类型</span>
                <span>币种</span>
                <span>时间</span>
                <span>数量</span>
            </p>
            <ul class="propertyDetailList">
                <li v-for="(item, index) in recordList" :key="index">
                    <span>{{item.type == 1?'转入':(item.type == 2?'转出':(item.type == 3?'买入':'卖出'))}}</span>
                    <span>{{item.currency}}</span>
                    <span>{{item.createAt}}</span>
                    <span>{{$common.number_format(item.amount,8)}}</span>
                </li>
                <p class="notanymore" v-if="nodata">暂无数据</p>
            </ul>
            <div class="pageBox blackpage">
                <Page class-name="pages" @on-change="handlePage" :total="totalPage"/>
            </div>
        </div>
        <!-- 资产互转 -->
        <!-- <Modal
            v-model="withdrawModal"
            width="490"
            @on-ok="withdrawOk"
            @on-cancel="withdrawCancel"
            okText="立即划转">
            <p class="confirmTitle">资产互转<span>提币请划转到币币交易账户</span></p>
            <Form :model="withdrawData" label-position="top">
                <FormItem label="币种">
                    <Select v-model="withdrawData.currency">
                        <Option value="1">BTC</Option>
                        <Option value="2">ETC</Option>
                    </Select>
                </FormItem>
                <FormItem label="从">
                    <Select v-model="withdrawData.from">
                        <Option value="1">币币账户</Option>
                        <Option value="2">法币账户</Option>
                    </Select>
                </FormItem>
                <FormItem label="转至">
                    <Select v-model="withdrawData.to">
                        <Option value="1">币币账户</Option>
                        <Option value="2">法币账户</Option>
                    </Select>
                </FormItem>
                <FormItem label="数量">
                    <i-input v-model="withdrawData.number"></i-input>
                </FormItem>
            </Form>
        </Modal> -->
        <!-- 充值 -->
        <Modal
            v-model="rechargeModal"
            width="490">
            <p class="confirmTitle">充值{{rechargecurrency}}</p>
            <p class="linktitle">请将{{rechargecurrency}}充值到如下地址（扫描二维码获取地址）</p>
            <p class="linklocation">{{rechargeAddress}}</p>
            <a class="copycode" @click="downloadcode">复制二维码</a>
            <div class="QRcode">
              <vue-qr :text="rechargeAddress" :size="147" :margin="0"></vue-qr>
            </div>
            <ul class="rechargeDesc">
              <li>请勿向上述地址充值任何非CNDT资产，否则资产将不可找回。</li>
              <li>最小充值金额：1.000000CNDT，小于最小金额的充值不会上账且无法退回。</li>
              <li>您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过公告或短信通知您。</li>
              <li>请务必确认手机及浏览器安全，防止信息被篡改或泄露。</li>
            </ul>
            <div slot="footer"></div>
        </Modal>
        <!-- 提币 -->
        <Modal
            v-model="withdrawModal"
            width="490"
            @on-ok="withdrawOk"
            >
            <p class="confirmTitle">{{withdrawcurrency}}提币</p>
            <Form :model="withdrawData" label-position="top">
                <FormItem>
                    <p class="title_p"><span>提币地址</span><img src="../../assets/images/address.png" @click="openaddresslist"></p>
                    <Input v-model="withdrawData.extractAddress" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="输入提币地址"/>
                </FormItem>
                <FormItem label="数量">
                    <i-input v-model="withdrawData.amount" placeholder="最小提币数量1" class="amount" @on-blur="test(withdrawData.amount)"></i-input>
                    <p class="amountbtn"><span class="currency">{{withdrawcurrency}}</span><span class="allwithdraw" @click="withdrawData.amount = amount">全部</span></p>
                </FormItem>
                <FormItem label="资金密码">
                    <i-input v-model="withdrawData.payPassword" placeholder="请输入资金密码" type="password"></i-input>
                </FormItem>
            </Form>
            <p class="withdraw_p"><span>手续费<i>(总提币数量0.1%)</i></span><span>{{cost}}{{withdrawcurrency}}</span></p>
            <p class="withdraw_p"><span>到账数量</span><span>{{withdrawData.amount - cost}}{{withdrawcurrency}}</span></p>
        </Modal>
        <Modal
            v-model="addresslistModal"
            width="490"
            @on-ok="addresslistOk"
            @on-cancel="addresslistCancel"
            okText="添加地址"
            >
            <p class="confirmTitle">{{withdrawcurrency}}提币地址</p>
            <ul class="addresslist">
              <li v-for="(item, index) in addressList" :key="index">
                <section @click="selectaddress(item.address)">
                  <p>{{item.comment}}</p>
                  <p>{{item.address}}</p>
                </section>
                <img src="../../assets/images/cancel.png" @click="deleteaddress(item.address)">
              </li>
            </ul>
        </Modal>
    </div>
</template>

<script>
import VueQr from "vue-qr";

export default {
  data() {
    return {
      totalPage:0,
      withdrawModal: false,
      withdrawData: {
        userId: this.$store.state.userstatus.userId,
        extractAddress: "",
        currency: "",
        amount: 0,
        payPassword: ""
      },
      withdrawapi: this.$common.path + "/financial/extractCoin",
      rechargeModal: false,
      weBankList: [],
      getWeBankListapi: this.$common.path + "/webank/getWeBankList",
      total: "",
      getRecordapi: this.$common.path + "/financial/getRecord",
      getRecordData: {
        userId: this.$store.state.userstatus.userId,
        pageIndex: 1,
        pageSize: 10
      },
      recordList: [],
      nodata: false,
      getrechangeapi: this.$common.path + "/user/getRechargeAddress",
      rechargeAddress: "",
      rechargecurrency: "",
      withdrawcurrency: "",
      amount: 0,
      cost: 0,
      addresslistModal: false,
      addresslistapi: this.$common.path + "/user/getExtractAddress",
      addressList: [],
      deleteaddreddapi:this.$common.path + '/user/removeExtractAddress'
    };
  },
  components: { VueQr },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
    this.getAssetList();
    this.getRecordList();
    // var _this = this;
    // setTimeout(function(){
    //   _this.getRecordList();
    // },1000);
  },
  methods: {
    test(val){
      console.log(val)
      this.withdrawData.amount = this.$common.clearNoNum(val)
    },
    openwithdraw(currency, amount) {
      this.withdrawModal = true;
      this.withdrawcurrency = currency;
      this.withdrawData.currency = currency;
      this.amount = amount;
    },
    withdrawOk() {
      if(this.$store.state.userstatus.isSetPayPassword == 0){
        this.$Message.error('请先设置提币密码');
        return false;
      }
      this.$http
        .post(this.withdrawapi, this.$common.sort(this.withdrawData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getAssetList() {
      this.$http
        .get(this.getWeBankListapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.weBankList = res.data.data;
            for (var i = 0; i < this.weBankList.length; i++) {
              this.total += this.weBankList[i].cny;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getRecordList() {
      this.$http
        .get(this.getRecordapi, {
          params: this.$common.sort(this.getRecordData)
        })
        .then(res => {
          if (res.data.status == 1) {
            this.totalPage = res.data.data.recordCount;
            this.recordList = res.data.data.list;
            if (
              this.getRecordData.pageIndex == 1 &&
              res.data.data.list.length == 0
            ) {
              this.nodata = true;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    handlePage(page) {
      this.getRecordData.pageIndex = page;
      this.getRecordList();
    },
    openrechange(currency) {
      this.rechargeModal = true;
      this.rechargecurrency = currency;
      this.$http
        .get(this.getrechangeapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId,
            currency: currency
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.rechargeAddress = res.data.data.address;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    downloadcode() {
      var oQrcode = document.querySelector(".QRcode img");
      var url = oQrcode.src;
      var a = document.createElement("a");
      var event = new MouseEvent("click");
      a.download = "充值" + this.rechargecurrency + "二维码";
      a.href = url;
      a.dispatchEvent(event);
    },
    openaddresslist() {
      this.addresslistModal = true;
      this.withdrawModal = false;
      this.$http
        .get(this.addresslistapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.addressList = res.data.data.address;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    selectaddress(address){
      this.withdrawData.extractAddress = address;
      this.addresslistCancel();
    },
    addresslistOk() {
      this.addresslistModal = false;
      this.$store.state.status.addAddressModal = true;
    },
    addresslistCancel(){
      this.addresslistModal = false;
      this.withdrawModal = true;
    },
    deleteaddress(address){
      this.$http.post(this.deleteaddreddapi,this.$common.sort({userId:this.$store.state.userstatus.userId,address:address})).then(res=>{
        if(res.data.status == 1){
          this.openaddresslist();
          this.$Message.success(res.data.message);
        }else{
          this.$Message.error(res.data.message);
        }
      })
    }
  },
  watch: {
    withdrawData: {
      handler(curVal, oldVal) {
        // this.cost = parseFloat((parseFloat(curVal.amount) * 0.001).toFixed(2));
        // this.withdrawData.amount = this.$common.clearNoNum(curVal.amount);
        this.cost = this.$common.clearNoNum(parseFloat(curVal.amount) * 0.001);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.propertyDiv {
  width: 1200px;
  margin: auto;
  .propertytitle {
    padding: 52px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:nth-child(1) {
      font-size: 30px;
    }
    span:nth-child(2) {
      font-size: 17px;
      i {
        font-style: normal;
        color: #00ccff;
      }
    }
  }
  .propertyList {
    background: #191b2a;
    ul {
      padding: 0 56px;
      li {
        display: flex;
        height: 179px;
        justify-content: space-between;
        border-bottom: 1px solid #3e4a74;
        section {
          display: flex;
          flex-direction: column;
          padding-top: 33px;
        }
        section:nth-child(1) {
          .headericon {
            display: inline-block;
            text-align: center;
            background: #ffa320;
            color: #fff;
            white-space: nowrap;
            position: relative;
            overflow: hidden;
            vertical-align: middle;
            width: 35px;
            height: 35px;
            line-height: 35px;
            border-radius: 35px;
          }
          span:nth-child(2) {
            font-size: 17px;
            padding-top: 10px;
          }
        }
        section:nth-child(2) {
          flex: 1;
          padding-left: 122px;
          span:nth-child(1) {
            font-size: 17px;
            padding-bottom: 45px;
          }
          p {
            padding-bottom: 21px;
            font-size: 14px;
            span {
              color: #00ccff;
            }
          }
        }
        section:nth-child(3) {
          .rechargebtn {
            margin-top: 15px;
            margin-bottom: 10px;
          }
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
  .detailtitle {
    padding: 65px 0 45px 0;
    font-size: 24px;
  }
  .propertyDetailListTitle {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #3e4a74;
    padding-bottom: 8px;
    font-size: 18px;
    span {
      flex: 1;
    }
    span:last-child {
      text-align: right;
    }
  }
  .propertyDetailList {
    min-height: 300px;
    height: auto;
    li {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #3e4a74;
      span {
        flex: 1;
      }
      span:last-child {
        text-align: right;
      }
    }
  }
  .pageBox {
    background: transparent;
  }
}
.linktitle {
  font-size: 14px;
  text-align: center;
  color: #999999;
}
.linklocation {
  padding: 18px 0;
  font-size: 18px;
  color: #232323;
  text-align: center;
}
.copycode {
  display: block;
  margin: auto;
  width: 80px;
  font-size: 14px;
  text-align: center;
}
.QRcode {
  width: 147px;
  height: 147px;
  margin: 24px auto;
}
.rechargeDesc {
  color: #999999;
  font-size: 14px;
  list-style: disc;
  li {
    padding: 10px 0;
  }
}
.title_p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999999;
  font-size: 14px;
  img {
    cursor: pointer;
  }
}
.amount {
  position: relative;
}
.amountbtn {
  position: absolute;
  top: 0;
  right: 0;
  .currency {
    font-size: 13px;
    color: #666;
    padding-right: 7px;
    border-right: 1px solid #999999;
  }
  .allwithdraw {
    font-size: 13px;
    color: #3a82fe;
    padding-left: 7px;
    padding-right: 15px;
    cursor: pointer;
  }
}
.withdraw_p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-bottom: 32px;
  span:nth-child(1) {
    color: #000;
    i {
      color: #ccc;
      font-style: normal;
    }
  }
  span:nth-child(2) {
    color: #3a82fe;
  }
}
.addresslist{
  height: 300px;
  overflow: auto;
  li{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #cccccc;
    padding: 0 20px;
    section{
      flex: 1;
      cursor: pointer;
      p:nth-child(1){
        font-size: 16px;
        color: #3a82fe;
        padding-bottom: 10px;
      }
      p:nth-child(2){
        font-size: 12px;
        color: #ccc;
      }
    }
    img{
      cursor: pointer;
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";
@import "../../assets/css/modal.css";

.propertyBtn.ivu-btn {
  width: 100px;
  height: 43px;
  font-size: 18px;
  border-radius: 0;
}
textarea.ivu-input {
  resize: none;
}
</style>
