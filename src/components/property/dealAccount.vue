<template>
    <div>
        <div class="account_top">
            <section>
                <span>总资产折合</span>
                <span>{{totaldata.currencyAcount.toFixed(8)}} {{totaldata.currency}}</span>
                <span class="aoumnt colorgray">≈{{totaldata.cny.toFixed(2)}} CNY</span>
            </section>
            <section>
                <a @click="pageTo('record')">财务记录</a>
                <a @click="$store.state.status.addAddressModal = true">提币地址管理</a>
            </section>
        </div>
        <div class="account_list">
            <div class="list_head">
                <span>币种</span>
                <span>可用</span>
                <span>冻结</span>
                <span>CNY估值</span>
                <span>操作</span>
            </div>
            <div class="list_li" v-for="(item, index) in data" :key="index">
                <span>{{item.currency}}</span>
                <span>{{item.thawAmount.toFixed(8)}}</span>
                <span>{{item.frozenAmount.toFixed(8)}}</span>
                <span>{{item.cny.toFixed(2)}}</span>
                <span>
                    <a @click="openrechange(item.currency)">充值</a>
                    <a @click="openwithdraw(item.currency,item.thawAmount)">提币</a>
                    <!-- <a>币币交易</a> -->
                    <Dropdown placement="bottom-end" @on-click="changeMenu" @on-visible-change="changevisible(item.currency)">
                        <a href="javascript:void(0)">
                            币币交易
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(item , index) in marketdic" :key="index" v-bind:name="item.TokenPair">
                              <span @click="Topage(item.Currency)">{{item.TokenPair}}</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </span>
            </div>
        </div>
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
              <li>请勿向上述地址充值任何非{{rechargecurrency}}资产，否则资产将不可找回。</li>
              <li>最小充值金额：1.000000{{rechargecurrency}}，小于最小金额的充值不会上账且无法退回。</li>
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
                    <Input v-model="withdrawData.toAddress" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="输入提币地址"/>
                </FormItem>
                <FormItem label="数量">
                    <i-input v-model="withdrawData.amount" placeholder="最小提币数量1" class="amount" @on-blur="test(withdrawData.amount)"></i-input>
                    <p class="amountbtn"><span class="currency">{{withdrawcurrency}}</span><span class="allwithdraw" @click="withdrawData.amount = amount">全部</span></p>
                </FormItem>
                <FormItem label="资金密码">
                    <i-input v-model="withdrawData.payPassword" placeholder="请输入资金密码" type="password"></i-input>
                </FormItem>
            </Form>
            <p class="withdraw_p"><span>手续费<i>(总提币数量{{this.free*100}}%)</i></span><span>{{cost}}{{withdrawcurrency}}</span></p>
            <p class="withdraw_p"><span>到账数量</span><span>{{withdrawData.amount - cost}}{{withdrawcurrency}}</span></p>
        </Modal>
        <!-- 选择提币地址 -->
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
      apiurl: this.$common.coinspath + "/v1/user/money/coin",
      totalapi: this.$common.coinspath + "/v1/user/money/coin_total",
      marketdicapi: this.$common.coinspath + "/v1/marketdic",
      marketdataapi: this.$common.coinspath + "/v1/marketdata/",
      rechangeapi: this.$common.coinspath + "/v1/user/coin/query/recharge_address",
      freeapi: this.$common.coinspath + '/v1/user/coin/withdraw/fee',
      total: 0,
      data: [],
      totaldata: {
        currencyAcount:0,
        cny:0
      },
      marketdic: [],
      rechargeModal: false,
      withdrawcurrency: "",
      rechargecurrency: '',
      rechargeAddress: '',
      withdrawModal: false,
      withdrawData: {
        userId: this.$store.state.userstatus.userId,
        toAddress: "",
        currency: "",
        amount: 0,
        payPassword: ""
      },
      withdrawapi: this.$common.coinspath + "/v1/user/coin/withdraw",
      amount: 0,
      cost: 0,
      addresslistModal: false,
      addresslistapi: this.$common.path + "/user/getExtractAddress",
      addressList: [],
      deleteaddreddapi: this.$common.path + "/user/removeExtractAddress",
      free:0,
    }
  },
  created() {
    this.getdatalist();
    this.gettotal();
  },
  components: { VueQr },
  methods: {
    changeMenu(val){
    },
    changevisible(currency){
      this.getmarketdic(currency) 
    },
    test(val) {
      this.withdrawData.amount = this.$common.clearNoNum(val);
        console.log(this.withdrawData.amount);

    },
    pageTo(path) {
      this.$router.push({ name: path });
    },
    Topage(currency){
      this.$router.push({ name: 'exchange' ,params:{currency:currency}});
    },
    getdatalist() {
      this.$axios
        .get(this.apiurl, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.data = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    gettotal() {
      this.$axios
        .get(this.totalapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.totaldata = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getfree() {
      this.$axios
        .get(this.freeapi, {
          params: this.$common.sort({
            cointype: this.withdrawcurrency
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.free = res.data.data.ServiceFee;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getmarketdic(coinstype) {
      this.marketdic = [];
      this.$axios
        .post(this.marketdataapi+coinstype)
        .then(res => {
          if (res.data.status == 1) {
            this.marketdic = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    openrechange(currency) {
      this.rechargeModal = true;
      this.rechargecurrency = currency;
      this.$axios
        .get(this.rechangeapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId,
            currency: currency
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.rechargeAddress = res.data.data.Address;
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
    openwithdraw(currency, amount) {
      this.withdrawModal = true;
      this.withdrawcurrency = currency;
      this.withdrawData.currency = currency;
      this.amount = amount;
      this.getfree();
    },
    withdrawOk() {
      if (this.$store.state.userstatus.isSetPayPassword == 0) {
        this.$Message.error("请先设置提币密码");
        return false;
      }
      this.$axios
        .post(this.withdrawapi, this.$common.sort(this.withdrawData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
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
    selectaddress(address) {
      this.withdrawData.toAddress = address;
      this.addresslistCancel();
    },
    addresslistOk() {
      this.addresslistModal = false;
      this.$store.state.status.addAddressModal = true;
    },
    addresslistCancel() {
      this.addresslistModal = false;
      this.withdrawModal = true;
    },
    deleteaddress(address) {
      this.$http
        .post(
          this.deleteaddreddapi,
          this.$common.sort({
            userId: this.$store.state.userstatus.userId,
            address: address
          })
        )
        .then(res => {
          if (res.data.status == 1) {
            this.openaddresslist();
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },

  },
  watch: {
    withdrawData: {
      handler(curVal, oldVal) {
        this.cost = this.$common.clearNoNum(parseFloat(curVal.amount) * this.free);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/accountList.scss";
@import "../../assets/scss/accountmodel.scss";

</style>

<style>
</style>
