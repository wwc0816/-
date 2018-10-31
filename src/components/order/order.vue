<template>
    <div class="business wrapDiv">
        <div class="orderDiv">
            <p class="ordertitle">法币订单</p>
            <div class="orderTableLists">
                <div class="tableHead">
                    <span style="width:152px">订单号</span>
                    <span style="width:120px">交易类型</span>
                    <span style="width:210px">总价</span>
                    <span style="width:210px">单价</span>
                    <span style="width:176px">时间</span>
                    <span style="width:100px">状态</span>
                    <span style="flex:1;text-align:right;">交易对象</span>
                </div>
                <ul class="list">
                    <li v-for="(item, index) in list" :key="index">
                        <div class="listItem">
                            <span class="ordernumber" @click="toDetail(item.orderId)">{{item.orderId}}</span>
                            <span class="ordertype"><span>{{(item.isPublisher == 1 && item.type == 1) || (item.isPublisher == 0 && item.type == 2)?'购买':'出售'}}</span></span>
                            <span>{{item.amount}} CNY</span>
                            <span>{{item.price}} CNY</span>
                            <span>{{item.createdAt}}</span>
                            <span class="orderstatus"><span class="statusicon statusicon-cancel" :class="{'statusicon-waiting':item.status == 1,'statusicon-payed':item.status == 2,'statusicon-doing':item.status == 3,'statusicon-cancel':item.status == 4,'statusicon-finshed':item.status == 5}"></span>{{item.status==1?'未付款':(item.status==2?'已付款':(item.status==3?'申诉中':(item.status==4?'已取消':(item.status==5?'已完成':''))))}}</span>
                            <span class="orderobject" @click="toown(item.userId)">{{item.nickname}}</span>
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
        totalPage:0,
        orderapi:this.$common.path+'/order/getList',
        nodata: false,
        data:{
            userId:this.$store.state.userstatus.userId,
            status:0,
            pageIndex:1,
            pageSize:10
        },
        list:[],
    };
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.$http
        .get(this.orderapi, {
          params: this.$common.sort(this.data)
        })
        .then(res => {
          if (res.data.status == 1) {
            this.totalPage = res.data.data.recordCount;
            this.list = res.data.data.list;
            if (this.data.pageIndex == 1 && res.data.data.list.length == 0) {
              this.nodata = true
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    handlePage(page){
      this.data.pageIndex=page;
      this.getOrderList();
    },
    toDetail(id){
      this.$router.push({ name: "businessDetail",params:{id:id} });
    },
    toown(id){
      this.$router.push({ name: "own",params:{id:id} });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/order.scss";
$colorbule: #3a82fa;
.orderDiv {
  .listItem {
    .ordernumber {
      color:$colorbule;
      width: 152px;
      cursor: pointer;
    }
    .ordertype {
      width: 120px;
      span {
        color: #ffa320;
      }
    }
    span:nth-child(3) {
      width: 210px;
    }
    span:nth-child(4) {
      width: 210px;
    }
    span:nth-child(5) {
      width: 176px;
    }
    .orderstatus {
      width: 100px;
      display: flex;
      align-items: center;
      .statusicon {
        margin-right: 8px;
      }
    }
    .orderobject {
      flex: 1;
      text-align: right;
      color: $colorbule;
      cursor: pointer;
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";
</style>
