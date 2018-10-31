<template>
    <div class="business wrapDiv">
        <div class="orderDiv">
            <p class="ordertitle">交易明细</p>
            <div class="orderTableLists">
                <div class="tableHead">
                    <span style="width:180px">时间</span>
                    <span style="width:110px">交易类型</span>
                    <span style="width:110px">交易对</span>
                    <span style="width:110px">方向</span>
                    <span style="width:170px">价格</span>
                    <span style="width:170px">数量</span>
                    <span style="width:170px">成交额</span>
                    <span style="flex:1;text-align:right;">手续费</span>
                </div>
                <ul class="list">
                    <li>
                        <div class="listItem">
                            <span>2018-09-08 12:21:33</span>
                            <span>币币交易</span>
                            <span class="colorbule">WE/CNT</span>
                            <span class="colorgreen">购买</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                        </div>
                    </li>
                    <li>
                        <div class="listItem">
                            <span>2018-09-08 12:21:33</span>
                            <span>币币交易</span>
                            <span class="colorbule">WE/CNT</span>
                            <span class="colorgreen">购买</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                        </div>
                    </li>
                    <li>
                        <div class="listItem">
                            <span>2018-09-08 12:21:33</span>
                            <span>币币交易</span>
                            <span class="colorbule">WE/CNT</span>
                            <span class="colorred">卖出</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
                            <span>12345678.12345678</span>
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
  data(){
      return{
          recordapi:this.$common.coinspath+'v1/order/trade/record',
          totalPage: 0,
      nodata: false,
      data: {
        tokenPair: "",
        userId: this.$store.state.userstatus.userId,
        pageIndex: 1,
        pageSize: 10,
        pageTotalCount: 1
      },
      totalPage: 0
      }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/order.scss";

.orderDiv {
  .listItem {
    span:nth-child(1){
      width: 180px;
    }
    span:nth-child(2),span:nth-child(3),span:nth-child(4){
      width: 110px;
    }
    span:nth-child(5),span:nth-child(6),span:nth-child(7){
      width: 170px;
    }
    span:nth-child(8){
      flex: 1;
      text-align: right;
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";
</style>
