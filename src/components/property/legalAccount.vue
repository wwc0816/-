<template>
    <div>
        <div class="account_top">
            <section>
                <span>总资产折合</span>
                <span>{{total.totalHKT.toFixed(8)}} {{$store.state.name.currencyname}}</span>
                <span class="aoumnt colorgray">≈{{total.totalCNY.toFixed(2)}} CNY</span>
            </section>
            <section>
                <img src="../../assets/images/baozhengjin.png" alt="" style="padding-right:10px;"> 保障金 {{$store.state.userstatus.isPayMargin == 1?'100.00000000':'0.00000000'}} {{$store.state.name.currencyname}}
                <a @click="pageTo('propertyDetail')">资产明细</a>
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
            <div class="list_li" v-for="(item, index) in weBankList" :key="index">
                <span>{{item.currency}}</span>
                <span>{{item.thawAmount.toFixed(8)}}</span>
                <span>{{item.frozenAmount.toFixed(8)}}</span>
                <span>{{item.cny.toFixed(2)}}</span>
                <span>
                    <a @click="exchange(item.currency)">划转</a>
                    <a @click="pageTo('business')">法币交易</a>
                </span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      total: {
        totalHKT: 0,
        totalCNY: 0
      },
      getWeBankListapi: this.$common.path + "/webank/getWeBankList",
      getAssetTotalapi: this.$common.path + "/webank/getAssetTotal",
      weBankList: [],
    };
  },
  created() {
    this.getAssetList();
    this.gettotal();
  },
  methods: {
    pageTo(path) {
      this.$router.push({ name: path });
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
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    gettotal() {
      this.$http
        .get(this.getAssetTotalapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.total = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    exchange(currency) {
      this.$store.state.status.withdrawModal = true;
      this.$store.state.status.cointype = currency;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/accountList.scss";
</style>