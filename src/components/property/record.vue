<template>
    <div class="business wrapDiv">
        <div class="recordDiv commonDiv">
            <p class="record_head">
                <span>交易账户</span> - 财务记录
            </p>
            <div class="record_box">
                <div class="record_tabs">
                    <span v-for="(item, index) in record_tabs" :key="index" :class="{active:active == index}" @click="tabs(item.currency,index)">{{item.currency}}</span>
                </div>
                <div class="record_lists">
                    <div class="record_lists_head">
                        <span>时间</span>
                        <span></span>
                        <span>类型</span>
                        <span>数量</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in record" :key="index">
                            <span>{{item.createAt}}</span>
                            <span></span>
                            <span>{{item.type == 1?'充币':(item.type == 2?'提币':(item.type == 3?'购买':(item.type == 4?'出售':(item.type == 5?'转入':(item.type == 6?'转出':(item.type == 7?'委托买入':'委托买出'))))))}}</span>
                            <span></span>
                            <span>{{item.amount.toFixed(8)}}</span>
                        </li>
                    </ul>
                    <p class="notanymore" v-if="nodata">暂无数据</p>
                    <div class="pageBox blackpage">
                        <Page class-name="pages" @on-change="handlePage" :total="totalPage"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      nodata: false,
      active: 0,
      apiurl: this.$common.coinspath + "/v1/user/money/coin",
      record_tabs: [],
      data: {
        userId: this.$store.state.userstatus.userId,
        pageIndex: 1,
        pageSize: 10,
        coinType: "",
        pageTotalCount: 1
      },
      recordapi: this.$common.coinspath + "/v1/user/money/coin_record",
      record: [],
      totalPage: 0,
    }
  },
  created() {
    this.getdatalist();
  },
  methods: {
    tabs: function(cointype,index) {
       this.data.coinType = cointype;
      this.active = index;
      this.getrecordlist(1);
    },
    getdatalist() {
      this.$http
        .get(this.apiurl, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.record_tabs = res.data.data;
            this.data.coinType = this.record_tabs[0].currency;
            this.getrecordlist(1);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getrecordlist(page) {
      this.data.pageIndex = page;
      this.$http
        .get(this.recordapi, {
          params: this.$common.sort(this.data)
        })
        .then(res => {
          if (res.data.status == 1) {
            this.record = res.data.data;
            this.totalPage = res.data.pageTotalCount;
            if (this.data.pageIndex == 1 && res.data.data.length == 0) {
              this.nodata = true;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    handlePage(page) {
      this.getRecordList(page);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/record.scss";
</style>

<style>
</style>
