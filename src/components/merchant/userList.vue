<template>
    <div>
        <div class="merchant_title tabsable">
            <span v-for="(item,index) in coins" :key="index" :class="active == index?'active':''" @click="select(index,item.value)">{{item.name}}</span>
        </div>
        <div class="account_list merchantUserlist">
            <div class="list_head">
                <span>币种</span>
                <span>充币地址</span>
                <span>用户ID</span>
            </div>
            <div class="list_li" v-for="(item,index) in record" :key="index">
                <span>{{item.Currency}}</span>
                <span>{{item.Address}}</span>
                <span>{{item.UserId}}</span>
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
      totalPage: 0,
      active: 0,
      coins: [
        {
          name: "全部",
          value: "all"
        },
        {
          name: "UST",
          value: "UST"
        },
        {
          name: "WE",
          value: "WE"
        },
        {
          name: "ETH",
          value: "ETH"
        },
        {
          name: "BTC",
          value: "BTC"
        }
      ],
      api: this.$common.coinspath + "/v1/user/merchant/userwallet/list",
      data: {
        userId: this.$store.state.userstatus.userId,
        currency: "",
        pageSize: 10,
        pageIndex: 1,
        pageTotalCount: 1
      },
      nodata:false,
      record:[],
    };
  },
  created() {
    this.getlist(1);
  },
  methods: {
    select(index, val) {
      this.active = index;
      if (val == "all") {
        this.data.currency = "";
      } else {
        this.data.currency = val;
      }
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
            this.record = res.data.data;
            this.totalPage = res.data.pageTotalCount;
            if (this.data.pageIndex == 1 && res.data.data.length == 0) {
              this.nodata = true;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        })
    },
    handlePage(page) {
      this.getRecordList(page);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/accountList.scss";
@import "../../assets/scss/merchant.scss";
.account_list.merchantUserlist {
  .list_head,
  .list_li {
    span:nth-child(1) {
      width: 200px;
    }
    span:nth-child(2) {
      flex: 1;
      text-align: left;
    }
    span:nth-child(3) {
      width: 300px;
      text-align: right;
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";
</style>
