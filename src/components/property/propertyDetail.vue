<template>
    <div class="business wrapDiv">
        <div class="recordDiv commonDiv">
            <p class="record_head">
                <span>法币账户</span> - 资产明细
            </p>
            <div class="record_box">
                <div class="record_tabs">
                    <span class="active">全部</span>
                </div>
                <div class="record_lists property_detail_lists">
                    <div class="record_lists_head">
                        <span>时间</span>
                        <span>币种</span>
                        <span>类型</span>
                        <span>数量</span>
                    </div>
                    <ul>
                        <li v-for="(item, index) in recordList" :key="index">
                            <span>{{item.createAt}}</span>
                            <span>{{item.currency}}</span>
                            <span>{{item.type == 1?'转入':(item.type == 2?'转出':(item.type == 3?'买入':'卖出'))}}</span>
                            <span>{{item.amount.toFixed(8)}}</span>
                        </li>
                    </ul>
                    <p class="notanymore" v-if="nodata">暂无数据</p>
                </div>
            </div>
            <div class="pageBox blackpage">
                <Page class-name="pages" @on-change="handlePage" :total="totalPage"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      getRecordapi: this.$common.path + "/financial/getRecord",
      recordList: [],
      totalPage: 0,
      getRecordData: {
        userId: this.$store.state.userstatus.userId,
        pageIndex: 1,
        pageSize: 10,
        currency: 'all'
      },
      nodata: false,
    }
  },
  created(){
    this.getRecordList();
  },
  methods: {
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/record.scss";
.recordDiv {
  .record_box {
    .record_lists.property_detail_lists {
      ul {
        li {
          span:nth-child(4) {
            flex: 1;
            text-align: right;
            color: #d6e0f2;
          }
        }
      }
    }
  }
}
</style>

<style>
@import "../../assets/css/page.css";

</style>
