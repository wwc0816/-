<template>
    <div class="business wrapDiv">
        <div class="orderDiv">
            <p class="ordertitle">委托历史</p>
            <div class="orderTableLists">
                <div class="tableHead">
                    <span style="width:152px">时间</span>
                    <span style="width:100px">交易类型</span>
                    <span style="width:100px">交易对</span>
                    <span style="width:100px">方向</span>
                    <span style="width:140px">价格</span>
                    <span style="width:140px">委托量</span>
                    <span style="width:140px">已成交</span>
                    <span style="width:140px">成交均价</span>
                    <span style="width:60px">状态</span>
                    <span style="flex:1;text-align:right;">操作</span>
                </div>
                <ul class="list">
                    <li v-for="(item,index) in list" :key="index">
                        <div class="listItem">
                            <span>{{$common.timeformat(item.CreationTimeStamp)}}</span>
                            <span>币币交易</span>
                            <span class="colorbule">{{item.TokenPair}}</span>
                            <span :class="item.ExchangeType == 1?'colorgreen':'colorred'">{{item.ExchangeType == 1?'买入':'卖出'}}</span>
                            <span>{{item.QuotedPrice?item.QuotedPrice.toFixed(8):'市价'}} {{item.Base}}</span>
                            <span>{{item.Amount.toFixed(8)}} {{item.Base}}</span>
                            <span>{{item.TradedAmount.toFixed(8)}} {{item.Currency}}</span>
                            <span>{{item.TradedAvgPrice.toFixed(8)}} {{item.Base}}</span>
                            <span>{{item.Status == 1?'交易中':(item.Status == 2?'已成交':'已撤销')}}</span>
                            <span><a @click="showDetail(item.ID)" v-if="item.Status == 2">详情 <i class="arrow" :class="showid == item.ID?'icon_ic_arrow_drop_down_white':'icon_ic_arrow_drop_up_white'"></i></a></span>
                        </div>
                        <div class="listItemDetail" v-if="showid == item.ID">
                          <div>
                            <span>时间</span>
                            <span>价格 {{detaildata.Currency}}</span>
                            <span>数量 {{detaildata.Currency}}</span>
                            <span>成交额 {{detaildata.Base}}</span>
                            <span>手续费 {{detaildata.Base}}</span>
                          </div>
                          <div>
                            <span>{{$common.timeformat(detaildata.CreationTimeStamp)}}</span>
                            <span>{{detaildata.QuotedPrice?detaildata.QuotedPrice.toFixed(8):'市价'}}</span>
                            <span>{{detaildata.TradeRecords[0].TradedBaseAmount.toFixed(8)}}</span>
                            <span>{{detaildata.TradeRecords[0].Price.toFixed(8)}}</span>
                            <span>{{detaildata.TradeRecords[0].ServiceFee.toFixed(8)}}</span>
                          </div>
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
      historyapi: this.$common.coinspath + "/v1/order/history",
      recordapi: this.$common.coinspath + "/v1/order/trade/record",
      nodata: false,
      data: {
        userId: this.$store.state.userstatus.userId,
        pageTotalCount: 1,
        pageIndex: 1,
        pageSize: 10
      },
      list: [],
      showid: "",
      detaildata:{}
    };
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
    this.gethistoryList();
  },
  methods: {
    gethistoryList() {
      this.$axios
        .get(this.historyapi, {
          params: this.$common.sort(this.data)
        })
        .then(res => {
          if (res.data.status == 1) {
            this.totalPage = res.data.data.pageTotalCount;
            this.list = res.data.data;
            if (this.data.pageIndex == 1 && res.data.data.length == 0) {
              this.nodata = true;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    handlePage(page) {
      this.data.pageIndex = page;
      this.gethistoryList();
    },
    showDetail(id) {
      if (this.showid == id) {
        this.showid = "";
        this.detaildata = {};
      } else {
        this.showid = id;
        this.$axios
          .get(this.recordapi, {
            params: this.$common.sort({
              userId: this.$store.state.userstatus.userId,
              orderId: id
            })
          })
          .then(res => {
            if (res.data.status == 1) {
              this.detaildata = res.data.data;
            } else {
              this.$Message.error(res.data.message);
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/order.scss";

.orderDiv {
  .listItem {
    span:nth-child(1) {
      width: 152px;
    }
    span:nth-child(2),
    span:nth-child(3),
    span:nth-child(4) {
      width: 100px;
    }
    span:nth-child(5),
    span:nth-child(6),
    span:nth-child(7),
    span:nth-child(8) {
      width: 140px;
    }
    span:nth-child(9) {
      width: 60px;
    }
    span:nth-child(10) {
      flex: 1;
      text-align: right;
    }
  }
  .listItemDetail {
    margin: 0 12px;
    padding: 26px 32px;
    border: 1px solid #3e4a74;
    border-top: 0;
    background: #141521;
    div {
      display: flex;
      justify-content: flex-start;
      font-size: 12px;
      span:nth-child(1),
      span:nth-child(2),
      span:nth-child(3),
      span:nth-child(4) {
        flex: 1;
      }
      span:last-child {
        width: 160px;
        text-align: right;
      }
    }
    div:nth-child(1) {
      padding-bottom: 32px;
      span {
        color: #c6ccfd;
      }
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";
</style>
