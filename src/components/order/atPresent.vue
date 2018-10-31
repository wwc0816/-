<template>
    <div class="business wrapDiv">
        <div class="orderDiv">
            <p class="ordertitle">当前委托</p>
            <div class="orderTableLists">
                <div class="tableHead">
                    <span style="width:150px">时间</span>
                    <span style="width:90px">交易类型</span>
                    <span style="width:90px">交易对</span>
                    <span style="width:90px">方向</span>
                    <span style="width:140px">价格</span>
                    <span style="width:140px">数量</span>
                    <span style="width:140px">委托总额</span>
                    <span style="width:140px">已成交</span>
                    <span style="width:140px">未成交</span>
                    <span style="flex:1;text-align:right;">操作</span>
                </div>
                <ul class="list">
                    <li>
                        <div class="listItem" v-for="(item, index) in listdata" :key="index">
                            <span>{{$common.timeformat(item.CreationTimeStamp)}}</span>
                            <span>币币交易</span>
                            <span class="colorbule">{{item.TokenPair}}</span>
                            <span :class="item.ExchangeType == 1?'colorgreen':'colorred'">{{item.ExchangeType == 1?'买入':'卖出'}}</span>
                            <span>{{item.QuotedPrice?item.QuotedPrice.toFixed(8):'市价'}} {{item.Currency}}</span>
                            <span>{{item.Amount.toFixed(8)}} {{item.Base}}</span>
                            <span>{{(item.TradedAvgPrice*item.Amount).toFixed(8)}} {{item.Currency}}</span>
                            <span>{{item.TradedAmount.toFixed(8)}} {{item.Base}}</span>
                            <span>{{item.PendingAmount.toFixed(8)}} {{item.Base}}</span>
                            <span>
                                <a class="cancelorder" v-if="item.Status == 1" @click="detel(item.ID)">撤单</a>
                                <span v-else-if="item.Status == 2">已完成</span>
                                <span v-else>已撤销</span>
                            </span>
                        </div>
                    </li>
                    
                    <p class="notanymore" v-if="nodata">暂无数据</p>
                </ul>
                <div class="pageBox blackpage">
                    <Page class-name="pages" @on-change="handlePage" :total="totalPage"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      totalPage: 0,
      nodata: false,
      apiurl: this.$common.coinspath + "/v1/commission/current",
      detelurl: this.$common.coinspath + "/v1/commission/cancel/",
      listdata: [],
      data: {
        tokenPair: "",
        userId: this.$store.state.userstatus.userId,
        pageIndex: 1,
        pageSize: 10,
        pageTotalCount: 1
      },
      totalPage: 0
    };
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
    this.getlist();
  },
  methods: {
    handlePage(page) {
      this.data.pageIndex = page;
      this.getlist();
    },
    getlist() {
      this.$http
        .get(this.apiurl, {
          params: this.$common.sort(this.data)
        })
        .then(res => {
          if (res.data.status == 1) {
            this.totalPage = res.data.data.pageTotalCount;
            this.listdata = res.data.data;
            if (this.data.pageIndex == 1 && res.data.data.length == 0) {
              this.nodata = true;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    detel(id) {
      this.$http.get(this.detelurl + id).then(res => {
        if (res.data.status == 1) {
          this.$Message.success(res.data.message);
          this.getlist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/order.scss";

.orderDiv {
  .listItem {
    span:nth-child(1) {
      width: 150px;
    }
    span:nth-child(2),
    span:nth-child(3),
    span:nth-child(4) {
      width: 90px;
    }
    span:nth-child(5),
    span:nth-child(6),
    span:nth-child(7),
    span:nth-child(8),
    span:nth-child(9) {
      width: 140px;
    }
    span:nth-child(10) {
      flex: 1;
      text-align: right;
      a {
        color: #3a82fa;
        border: 1px solid #3a82fa;
        padding: 5px 9px;
        font-size: 12px;
        border-radius: 2px;
      }
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";
</style>
