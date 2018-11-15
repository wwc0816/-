<!--没用的bootomFooter-->
<template>
    <div class="footer wrapDiv">
        <div class="footerContent">
            <div class="footerTop">
                <section>
                    <p class="title">
                        <img src="../../assets/images/logo.png" alt="">
                        <span></span>
                    </p>
                    <p class="text">全球领先的数字资产交易平台</p>
                    <p class="links">
                        <a href=""><img src="../../assets/images/facebook.png" alt=""></a>
                        <a href=""><img src="../../assets/images/twtter.png" alt=""></a>
                        <a href=""><img src="../../assets/images/link.png" alt=""></a>
                    </p>
                </section>
                <section class="footerright">
                    <section>
                      <p class="text">工具</p>
                      <p class="text" @click="pageTo('help')"><span>帮助中心</span></p>
                      <p class="text"><span><a style="color:#dfdef1;" href="https://www.yuque.com/abusyman/coins-up/nzgozn" target="_blank">API文档</a></span></p>
                    </section>
                    <section>
                      <p class="text">关于</p>
                      <p class="text" @click="pageTo('coinsApply')"><span>上币申请</span></p>
                    </section>
                    <section>
                      <p class="text">客服</p>
                      <p class="text"><img src="../../assets/images/email.png" alt="">coinsup.chain@gmail.com</p>
                    </section>
                </section>
            </div>
            <div class="footerbottom">
                <section>
                    <p class="langer">
                        <img src="../../assets/images/CN.png" alt="">
                        简体中文
                    </p>
                </section>
                <section>
                    <p class="email">2018.otc.coinsup.top</p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
/*export default {
  methods:{
    pageTo(path){
      location.href = this.$common.host+'/#/'+path
    }
  }
};*/
</script>

<!--<style lang="scss" scoped>
.footer {
  background: #090724;
  padding-top: 0;
  .footerContent {
    width: 1200px;
    height: 390px;
    margin: auto;
    div {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      p {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      .title {
        span {
          font-size: 24px;
          color: #ffffff;
          padding-left: 11px;
        }
      }
      .text {
        padding: 18px 0;
        color: #dfdef1;
        img {
          padding-right: 11px;
        }
      }
      .links {
        a {
          padding-right: 12px;
        }
      }
    }
    div.footerTop {
      padding-top: 45px;
      padding-bottom: 79px;
      border-bottom: 1px solid #3e4a74;
      .footerright{
        display: flex;
        section{
          padding-left: 40px;
          .text{
            span{
              cursor: pointer;
            }
          }
        }
      }
    }
    div.footerbottom {
      padding-top: 45px;
      p.langer {
        color: #fff;
        img {
          padding-right: 12px;
        }
      }
      p.email {
        color: #dcdbf3;
      }
    }
  }
}
</style>-->

