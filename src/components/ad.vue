<template>
    <div class="home wrapDiv">
        <div class="ad mapbg">
            <div>
                <section>
                <p>发布广告</p>
                <span>1. 完成“实名认证”和高级认证。</span>
                <span>2. 同意冻结100 {{$store.state.name.currencyname}}作为保证金，保证金可随时退还，退还后不可以发布广告，已发布的广告强制下架。</span>
                <span>3. 确保WE Bank有足够的{{$store.state.name.currencyname}}。</span>
                <span class="check"><i class="agreeicon" :class='{agree:agree}' @click='agree = !agree'></i>同意冻结100 {{$store.state.name.currencyname}}</span>
                <span class="applyBtn" @click="applyBtn">申请</span>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      agree: true,
      urlapi: this.$common.path + "/webank/payMargin",
      obj:{
        userId:this.$store.state.userstatus.userId
      }
    };
  },
  created(){
      if(this.$store.state.userstatus.isPayMargin == 1){
          this.$router.push({ name: "applyAd" });
      }
  },
  methods: {
    applyBtn() {
      if (!this.obj.userId) {
        this.$router.push({ name: "login" });
      }
      if (!this.agree) {
        this.$Message.info("请同意缴纳保证金");
        return false;
      }
      this.$http.post(this.urlapi, this.$common.sort(this.obj)).then(res => {
        if (res.data.status == 1) {
          this.$common.setCookie("isPayMargin", 1);
          this.$store.state.userstatus.isPayMargin = 1;
          this.$router.push({ name: "applyAd" });
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ad {
  div {
    display: flex;
    justify-content: flex-end;
    padding-top: 207px;
    padding-bottom: 200px;
    background-image: url(../assets/images/adbg.png);
    background-position-x: 50px;
    background-position-y: center;
    background-repeat: no-repeat;
    section {
      width: 550px;
      display: flex;
      flex-direction: column;
      padding-right: 130px;
      p {
        font-size: 24px;
        padding-bottom: 10px;
      }
      span {
        padding-top: 36px;
        line-height: 22px;
      }
      .check {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-bottom: 20px;
        i {
          margin-right: 10px;
        }
      }
      .applyBtn {
        width: 360px;
        height: 60px;
        background: #004398;
        color: #fefefe;
        font-size: 18px;
        line-height: 60px;
        text-align: center;
        padding: 0;
      }
    }
  }
}
</style>

<style>
</style>
