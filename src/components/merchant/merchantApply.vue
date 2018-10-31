<template>
    <div class="business wrapDiv">
        <div class="merchantapply commonDiv">
            <p class="title">申请聚合支付</p>
            <div v-show="statedata.State||statedata.State == 0">
            
            <div class="content" v-if="statedata.State == 2 ||statedata.State == 4">
                <p class="title_l">经营信息</p>
                <div class="formBox">
                    <p class="label">经营内容：请你填写跟你经营内容或者主营业务相近的行业</p>
                    <textarea  rows="3" v-model="applydata.businessInfo"></textarea>
                </div>
                <div class="formBox">
                    <p class="label">产品名称</p>
                    <input type="text" v-model="applydata.productName">
                </div>
                <div class="formBox">
                    <p class="label">产品说明</p>
                    <textarea  rows="6" v-model="applydata.productInfo"></textarea>
                </div>
                <p class="title_l">联系人信息</p>
                <div class="formBox">
                    <p class="label">姓名</p>
                    <input type="text" v-model="applydata.contactName">
                </div>
                <div class="formBox">
                    <p class="label">手机号码</p>
                    <input type="text" v-model="applydata.mobilePhone">
                </div>
                <div class="formBox">
                    <p class="label">电子邮箱</p>
                    <input type="text" v-model="applydata.email">
                </div>
                <Button type="primary" style='display:block;width:240px;height:53px;margin: 60px auto;font-size:18px;' @click="apply()">立即申请</Button>
            </div>
            <div class="content" v-else>
                <img src="../../assets/images/applysuccess.png" alt="">
                <h1>已成功申请聚合支付</h1>
                <p class="desc">根据产品要求提交资料，审核周期为1-3工作日</p>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      statedata: {
        State:''
      },
      applydata: {
        userId: this.$store.state.userstatus.userId,
        businessInfo: "",
        productInfo: "",
        email: "",
        mobilePhone: "",
        contactName: "",
        withdrawNoticeUrl: "",
        productName: "",
        rechargeNoticeUrl: ""
      },
      applyapi: this.$common.coinspath + "/v1/user/merchant/apply",
      stateapi:
        this.$common.coinspath +
        "/v1/user/merchant/info/" +
        this.$store.state.userstatus.userId
    };
  },
  created() {
     if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }else{
      this.getstate();
    }
  },
  methods: {
    getstate() {
      this.$axios.get(this.stateapi).then(res => {
        if (res.data.status == 1) {
          this.statedata = res.data.data;
          if(this.statedata.State == 1){
            this.$router.push({ name: 'merchantAccount' });
          }
        } else if(res.data.status == 0){
          this.statedata.State = 4;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    apply() {
      this.$axios
        .post(this.applyapi, this.$common.sort(this.applydata))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success('提交成功，请等待审核');
            this.getstate();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$colorgray: #627ba9;
$colorbule: #3a82fa;
$bordercolor: #2c3753;
$inputcolor: #141522;
$bgcolor: #191b2a;
.merchantapply {
  padding: 30px 0;
  .title {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    background: #212336;
    padding: 0 22px;
    font-size: 18px;
  }
  .content {
    background: $bgcolor;
    padding: 0 40px 40px 40px;
    .title_l {
      font-size: 18px;
      color: $colorbule;
      padding-top: 40px;
    }
    .formBox {
      width: 1043px;
      margin: auto;
      padding-bottom: 20px;
      .label {
        padding: 30px 0;
        color: $colorgray;
      }
      textarea {
        width: 100%;
        background: $inputcolor;
        border: 1px solid $bordercolor;
        resize: none;
        outline: none;
        color: inherit;
        padding: 10px 20px;
        line-height: 25px;
      }
      input {
        width: 100%;
        height: 55px;
        background: $inputcolor;
        border: 1px solid $bordercolor;
        outline: none;
        color: inherit;
        padding: 0 20px;
      }
    }
    img {
      display: block;
      padding-top: 132px;
      padding-bottom: 10px;
      margin: auto;
    }
    h1 {
      text-align: center;
      font-size: 30px;
      padding: 34px 0;
    }
    p.desc {
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>

<style>
</style>
