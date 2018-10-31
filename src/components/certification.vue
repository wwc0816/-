<template>
    <div class="cccbg wrapDiv">
        <div class="certificationDiv commonDiv">
            <div class="certificationBox">
                <p class="title">身份认证</p>
                <div class="tips">
                    <p>&bull; 为了您的资产安全，需要验证您的身份才能进行其他操作；认证信息一经验证不能修改，请务必如实填写；</p>
                    <p>&bull; 请保持图片清晰，每张图片占空间大小需小于3MB</p>
                </div>
                <div class="steps">
                    <span :class="{'active':step == 1||step == 2||step == 3}">1.上传身份证</span>
                    <span :class="{'active':step == 2||step == 3}">2.上传手持身份证</span>
                    <span :class="{'active':step == 3}">3.上传视频
                        <i>手持本人身份证</i>
                    </span>
                </div>
                <div class="uploadDiv">
                    <div class="step1 uploadbox" v-if="step == 1">
                        <section>
                            <span>身份证正面照</span>
                            <div class="upimgbox">
                                <upload :uploaddata='{decs:"身份证正面照"}'></upload>
                            </div>
                            <img src="../assets/images/idcardface.png" alt="">
                        </section>
                        <section>
                            <span>身份证反面照</span>
                            <div class="upimgbox">
                                <upload2 :uploaddata='{decs:"身份证反面照"}'></upload2>
                            </div>
                            <img src="../assets/images/idcardback.png" alt="">
                        </section>
                    </div>

                    <div class="step2 uploadbox" v-else-if="step == 2">
                        <section>
                            <span>手持身份证正面照</span>
                            <div class="upimgbox">
                                <upload3 :uploaddata='{decs:"手持身份证正面照"}'></upload3>
                            </div>
                            <img src="../assets/images/idcardface.png" alt="">
                        </section>
                        <section>
                            <span>手持身份证反面照</span>
                            <div class="upimgbox">
                                <upload4 :uploaddata='{decs:"手持身份证反面照"}'></upload4>
                            </div>
                            <img src="../assets/images/idcardback.png" alt="">
                        </section>
                    </div>

                    <div class="step3 uploadbox" v-else-if="step == 3">
                        <p class="decs">
                            请拍摄一段个人清晰视频<span>（手持身份证）</span>并说：我是***（本人姓名），我对自己在CoinsUp上的一切行为负责，<br>我承诺遵守当地法规，资金来源合法，并且不会用于非法用途。
                        </p>
                            <div class="upimgbox">
                               <div class="upimgbox">
                                    <uploadvideo :uploaddata='{decs:"手持本人身份证"}'></uploadvideo>
                                </div>
                            </div>                          
                    </div>
                </div>
                <Button class="nextBtn" @click="nextstep">{{nextBtn}}</Button>
                <p class="hit">※ 如有不便，可下载CoinsUp App进行高级认证！</p>
            </div>
        </div>
    </div>
</template>

<script>
import upload from "./modules/uploadIdcardface";
import upload2 from "./modules/uploadIdcardback";
import upload3 from "./modules/uploadIdcardhandface";
import upload4 from "./modules/uploadIdcardhandback";
import uploadvideo from "./modules/uploadvideo";

export default {
  data() {
    return {
      nextBtn: "下一步",
      step: 1,
      seniorauthapi: this.$common.path + "/user/seniorauth"
    };
  },
  components: {
    upload,
    upload2,
    upload3,
    upload4,
    uploadvideo
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    nextstep() {
      if (this.step == 1) {
        if (
          this.$store.state.qiniu.cardFaceUrl != "" &&
          this.$store.state.qiniu.cardBackUrl != ""
        ) {
          this.step = 2;
        } else {
          this.$Message.info("请上传照片");
        }
      } else if (this.step == 2) {
        if (
          this.$store.state.qiniu.handCardFaceUrl != "" &&
          this.$store.state.qiniu.handCardBackUrl != ""
        ) {
          this.step = 3;
          this.nextBtn = '完成';
        } else {
          this.$Message.info("请上传照片");
        }
      } else if (this.step == 3) {
        if (this.$store.state.qiniu.videoUrl != "") {
          var data = {
            userId: this.$store.state.userstatus.userId,
            idPositivePath: this.$store.state.qiniu.cardFaceUrl,
            idReversePath: this.$store.state.qiniu.cardBackUrl,
            idHandPositivePath: this.$store.state.qiniu.handCardFaceUrl,
            idHandVedioPath: this.$store.state.qiniu.handCardBackUrl,
            checkCode: this.$common.MathRand()
          };
          this.$http
            .post(this.seniorauthapi, this.$common.sort(data))
            .then(res => {
              if (res.data.status == 1) {
                this.$Message.success(res.data.message);
                this.$router.push({ name: "personal" });
              } else {
                this.$Message.error(res.data.message);
              }
            })
        } else {
          this.$Message.info("请上传照片");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.certificationDiv {
  padding-top: 38px;
  padding-bottom: 100px;
  .certificationBox {
    background: #ffffff;
    height: 1090px;
    .title {
      font-size: 25px;
      height: 90px;
      color: #000000;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ced8eb;
      padding-left: 40px;
    }
    .tips {
      width: 1035px;
      height: 150px;
      margin: 15px auto 54px auto;
      background: #fffae8;
      padding-top: 45px;
      p {
        padding-left: 76px;
        padding-bottom: 22px;
        color: #999999;
        font-size: 18px;
      }
    }
    .steps {
      display: flex;
      width: 1035px;
      margin: auto;
      justify-content: space-between;
      align-items: center;
      span {
        display: flex;
        width: 343px;
        height: 69px;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #fff;
        background: #ccc;
        i {
          font-size: 12px;
          font-style: normal;
          padding-top: 5px;
        }
      }
      span:last-child {
        flex-direction: column;
      }
      span.active {
        background: #2b65c9;
      }
    }
    .uploadDiv {
      width: 977px;
      margin: auto;
      padding-top: 50px;
      padding-bottom: 25px;
      color: #000000;
      section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 0;
        .upimgbox {
          width: 352px;
          height: 200px;
        }
      }
      .step3 {
        .decs {
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          padding-top: 30px;
          padding-bottom: 50px;
          span {
            color: #2b65c9;
          }
        }
        .upimgbox {
          width: 352px;
          margin: auto;
          margin-bottom: 120px;
        }
      }
    }
    .hit {
      font-size: 14px;
      color: #000000;
      text-align: right;
      padding-right: 48px;
      padding-top: 20px;
    }
  }
}
</style>

<style>
.nextBtn.ivu-btn {
  display: block;
  margin: auto;
  width: 343px;
  height: 69px;
  border: none;
  border-radius: 0;
  background-color: #2b65c9;
  font-size: 24px;
  color: #ffffff;
}
</style>
