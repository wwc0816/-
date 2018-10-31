<template>
    <div>
        <div class="merchant_title tabsable">
            <span v-for="(item,index) in coins" :key="index" :class="active == index?'active':''" @click="select(index,item.type)">{{item.name}}</span>
        </div>
        <div class="account_list merchantrecord">
            <div class="list_head">
                <span>日期</span>
                <span>类型</span>
                <span>币种</span>
                <span>数量</span>
                <!-- <span>手续费</span> -->
                <span>用户ID</span>
                <span>状态</span>
                <span>操作</span>
            </div>
            <div v-for="(item,index) in list" :key="index">
                <div class="list_li">
                    <span>{{$common.timeformat(item.DealDateTime.split("(")[1].split(")")[0]*1)}}</span>
                    <span>{{type == 1?'充币':'提币'}}</span>
                    <span>{{item.Currency}}</span>
                    <span>{{item.Amount.toFixed(8)}}</span>
                    <!-- <span>99999999.99999999</span> -->
                    <span>{{item.UserId}}</span>
                    <span class="colorgreen" v-if="type == 1">成功</span>
                    <span v-else :class="item.State == 1?'colorgray':(item.State == 2?'colorbule':(item.State == 3?'colorgreen':'colorred'))">{{item.State == 1?'等待提交':(item.State == 2?'已提交':(item.State == 3?'成功':'失败'))}}</span>
                    <span @click="changeshowed(index)">详情<i class="iconboult" :class="showed==index?'iconboult icon_ic_arrow_drop_down_white':'iconboult icon_ic_arrow_drop_up_white'"></i></span>
                </div>
                <div class="detail_box" v-show="showed == index">
                    <div class="detail_box_list_head">
                        <span>日期</span>
                        <span>类型</span>
                        <span>币种</span>
                        <span>数量</span>
                        <!-- <span>手续费</span> -->
                        <span>用户ID</span>
                        <span>状态</span>
                    </div>
                    <div class="detail_box_list_li">
                        <span>{{$common.timeformat(item.DealDateTime.split("(")[1].split(")")[0]*1)}}</span>
                        <span>{{type == 1?'充币':'提币'}}</span>
                        <span>{{item.Currency}}</span>
                        <span>{{item.Amount.toFixed(8)}}</span>
                        <!-- <span>99999999.99999999</span> -->
                        <span>{{item.UserId}}</span>
                        <span class="colorgreen" v-if="type == 1">成功</span>
                        <span v-else :class="item.State == 1?'colorgray':(item.State == 2?'colorbule':(item.State == 3?'colorgreen':'colorred'))">{{item.State == 1?'等待提交':(item.State == 2?'已提交':(item.State == 3?'成功':'失败'))}}</span>
                    </div>
                    <div class="detail_box_list_head" v-if="type == 1">
                        <span>提币地址</span>
                    </div>
                    <div class="detail_box_list_li" v-if="type == 1">
                        <span>{{item.RechargeAddress}}</span>
                    </div>
                </div>
            </div>
        </div>
        <p class="notanymore" v-if="nodata">暂无数据</p>
        <div class="pageBox blackpage">
            <Page class-name="pages" @on-change="handlePage" :total="totalPage"/>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showed: -1,
      active: 0,
      type: 1,
      coins: [
        {
          name: "充币记录",
          type: "1"
        },
        {
          name: "提币记录",
          type: "2"
        }
      ],
      rechargeApi: this.$common.coinspath + "/v1/user/merchant/recharge/list",
      withdrawApi: this.$common.coinspath + "/v1/user/merchant/withdraw/list",
      api: this.$common.coinspath + "/v1/user/merchant/recharge/list",
      data: {
        userId: this.$store.state.userstatus.userId,
        currency: "",
        pageSize: 10,
        pageIndex: 1,
        pageTotalCount: 1
      },
      nodata: false,
      totalPage: 0,
      list: [],

    };
  },
  created() {
    this.getlist(1);
  },
  methods: {
    changeshowed(index){
        if(this.showed == index){
            this.showed = -1;
        }else{
            this.showed = index;
        }
    },
    select(index, type) {
      this.active = index;
      this.type = type;
      this.showed = -1;
      if (type == 1) {
        this.api = this.rechargeApi;
      } else {
        this.api = this.withdrawApi;
      }
      this.nodata = false;
      this.getlist(1);
    },
    getlist(page) {
      this.data.pageIndex = page;
      this.$axios
        .get(this.api, {
          params: this.$common.sort(this.data)
        })
        .then(res => {
          if (res.data.status == 1) {
            this.list = res.data.data;
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
      this.getlist(page);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/accountList.scss";
@import "../../assets/scss/merchant.scss";
.account_list.merchantrecord {
  .list_head,
  .list_li {
    span {
      text-align: left;
      flex: none;
      font-size: 12px;
    }
    span:nth-child(1) {
      width: 180px;
    }
    span:nth-child(2) {
      width: 100px;
    }
    span:nth-child(3) {
      width: 100px;
    }
    span:nth-child(4) {
      width: 180px;
    }
    span:nth-child(5) {
      width: 180px;
    }
    span:nth-child(6) {
      width: 50px;
    }
    // span:nth-child(7){
    //     width: 50px;
    // }
    span:nth-child(7) {
      flex: 1;
      text-align: right;
      color: #3a82fa;
      cursor: pointer;
    }
  }
  .detail_box {
    width: 100%;
    padding: 10px 60px;
    border: 1px solid #2c3753;
    border-top: none;
    background: #141522;
    .detail_box_list_head,
    .detail_box_list_li {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        flex: none;
        text-align: left;
      }
      span:nth-child(1) {
        flex: 1;
      }
      span:nth-child(2),
      span:nth-child(3) {
        width: 100px;
      }
      span:nth-child(4) {
        width: 180px;
      }
      span:nth-child(5) {
        width: 140px;
      }
    }
    .detail_box_list_head {
      line-height: 30px;
      color: #2c3753;
    }
    .detail_box_list_li {
      line-height: 25px;
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";
</style>
