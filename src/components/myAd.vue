<template>
    <div class="whitebg wrapDiv">
        <div class="myadDiv commonDiv">
            <p>
                我的广告
                <Button type="primary" class="myadbtn" @click="$router.push({ name: 'applyAd' })">发布广告</Button>
            </p>
            <div class="listheadr">
                <span style="width:150px">广告编号</span>
                <span style="width:120px">广告类型</span>
                <span style="width:180px">数量</span>
                <span style="width:230px">订单限额</span>
                <span style="width:130px">单价</span>
                <span style="width:200px">创建时间</span>
                <span>操作</span>
            </div>
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <span>#{{item.advertisingId}}</span>
                    <span>{{item.type==1?'购买':'出售'}}</span>
                    <span>{{item.quantity}} {{item.currency}}</span>
                    <span>{{item.minLimit}}-{{item.maxLimit}} {{item.currency}}</span>
                    <span>{{item.price}} CNY</span>
                    <span>{{item.createdAt}}</span>
                    <section>
                        <Button type="error" class="myadbtn" @click="deletead(item.advertisingId)">删除</Button>
                        <Button type="primary" class="myadbtn" @click="editad(item.advertisingId)">修改</Button>
                    </section>
                </li>
            </ul>
        </div>
        <div class="withePageBox">
          <Page class-name="pages" @on-change='handlePage' :total="totalPage"/>
        </div>
        <!-- 删除广告 -->
        <Modal
            v-model="deleteAdModal"
            width="490"
            @on-ok="deleteAdOk"
            title="删除广告"
            okText="删除">
            <Form :model="deleteAdData" label-position="top">
                <FormItem label="输入资金密码">
                    <i-input v-model="deleteAdData.payPassword" placeholder="输入资金密码"></i-input>
                </FormItem>               
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      totalPage:0,
      adapi: this.$common.path + "/advertising/getUserAdvertising",
      data: {
        userId: this.$store.state.userstatus.userId,
        pageIndex: 1,
        pageSize: 10,
        currency: 'all'
      },
      list: [],
      deleteapi:this.$common.path+'/advertising/remove',
      deleteAdModal:false,
      deleteAdData:{
        advertisingId:'',
        payPassword:''
      }
    }
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
      return false;
    }
    this.getAdList();
  },
  methods: {
    getAdList() {
      this.$http
        .get(this.adapi, {
          params: this.$common.sort(this.data)
        })
        .then(res => {
          if (res.data.status == 1) {
            this.totalPage = res.data.data.recordCount;
            this.list = res.data.data.list;
            if (this.data.pageIndex == 1 && res.data.data.list.length == 0) {
              this.$router.push({ name: "applyAd" });
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    editad(id){
      this.$router.push({ name: "editAd" ,params:{id,id}});
    },
    deletead(id){
      this.deleteAdData.advertisingId = id;
      this.deleteAdData.payPassword = '';
      this.deleteAdModal = true;
    },
    deleteAdOk(){
      this.$http
        .post(this.deleteapi, this.$common.sort(this.deleteAdData))
        .then(res => {
          if (res.data.status == 1) {
            this.getAdList();
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    handlePage(page){
      this.data.pageIndex=page;
      this.getAdList();
    }
  }
};
</script>

<style lang="scss" scoped>
.myadDiv {
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 85px 0 23px 0;
    font-size: 30px;
    color: #010101;
  }
  .listheadr {
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #999999;
    border-bottom: 1px solid #ced8eb;
    span:last-child {
      text-align: right;
      flex: 1;
    }
  }
  ul {
    min-height: 500px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ced8eb;
      height: 96px;
      color: #000;
      font-size: 14px;
      span:nth-child(1) {
        width: 150px;
        color: #3a82fe;
      }
      span:nth-child(2) {
        width: 120px;
      }
      span:nth-child(3) {
        width: 180px;
      }
      span:nth-child(4) {
        width: 230px;
      }
      span:nth-child(5) {
        width: 130px;
      }
      span:nth-child(6) {
        width: 200px;
      }
      section {
        flex: 1;
      }
    }
  }
}
</style>

<style>
@import '../assets/css/withepage.css';

.myadbtn.ivu-btn {
  width: 85px;
  height: 35px;
  font-size: 14px;
  border-radius: 0;
}
</style>
