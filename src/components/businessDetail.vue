<template>
    <div class="whitebg wrapDiv">
        <div class="businessDetail">
            <div class="leftpart">
                <p class="ordercode color1">订单 : #{{orderid}}</p>
                <p class="title">你向{{data.publisherNick}}{{orderType == 1?'购买':'出售'}}{{data.quantity}} {{data.currency}}</p>
                <p class="orderinfo">
                    <span>交易价格</span>:
                    <span>{{data.price}} CNY/{{data.currency}}</span>
                </p>
                <p class="orderinfo">
                    <span>交易数量</span>:
                    <span>{{data.quantity}} {{data.currency}}</span>
                </p>
                <p class="orderinfo">
                    <span>总价</span>:
                    <span class="color2">{{data.amount}} CNY</span>
                </p>
                <p class="paytitle color1">卖方收款方式</p>
                <section>
                    <p v-if="data.bank">
                        <i></i>
                        <i class="payicon payicon-card"></i>
                        <span class="color1">银行卡</span>
                        <span class="">{{data.bank.name}} {{data.bank.cardNumber}} {{data.bank.bankName}} {{data.bank.bankBranch}}</span>
                    </p>
                    <p v-if="data.alipay">
                        <i></i>
                        <i class="payicon payicon-alipay"></i>
                        <span class="color1">支付宝</span>
                        <span class="">{{data.alipay.name}} {{data.alipay.account}}</span>
                        <img src="../assets/images/qrcode.png" @click="alipaycodeModel = true">
                    </p>
                    <p v-if="data.weixin">
                        <i></i>
                        <i class="payicon payicon-wechat"></i>
                        <span class="color1">微信</span>
                        <span class="">{{data.weixin.name}} {{data.weixin.account}}</span>
                        <img src="../assets/images/qrcode.png" @click="weixincodeModel = true">
                    </p>
                </section>
                    <p class="paydesc" v-if="(orderType == 1&&data.status != 1)||orderType == 2">付款参考号 ： {{data.checkCode}}</p>
                    <section v-if="data.isUserComplain == 0&&data.isPublisherComplain == 0">
                    <p class="paydesc" v-if="orderType == 1&&data.status == 1">待支付，请于<span class="color3">{{countText}}</span>内向{{data.publisherNick}}支付<span class="color2">{{data.amount}} CNY</span>，付款参考号 ： {{data.checkCode}}</p>
                    <Button v-if="orderType == 1&&data.status == 1" @click="handleRender('标记已付款?',1)">标记已付款</Button>
                    <p v-if="orderType == 1&&data.status == 2">你已付款成功，等待卖家确认放行。</p>
                    <p v-if="orderType == 1&&data.status == 5">卖家已确认放行，订单已完成。</p>
                    <p v-if="orderType == 2&&data.status == 1">你已下单成功，等待买家付款。</p>
                    <Button v-if="orderType == 2&&data.status == 2" @click="handleRender('确认放行?',2)">确认放行</Button>
                    <p v-if="orderType == 2&&data.status == 5">您已确认放行，订单已完成。</p>
                    </section>
                    <section v-else>
                        <p v-if="(data.isPublisher == 1&&data.isPublisherComplain == 1)||(data.isPublisher == 0&&data.isUserComplain == 1)">您已提交申诉，等待平台客服联系您。</p>
                        <p v-else>{{orderType == 1?'卖家已提交申诉，平台客服稍后会联系您。':'买家已提交申诉，平台客服稍后会联系您。'}}</p>
                    </section>
                    <a class="color2" v-if="orderType == 1&&(data.status != 4&&data.status != 5)" @click="handleRender('取消订单?',3)">取消订单</a>
                    <a style="color: #fdba00;" v-if="(data.status != 1&&data.status != 4&&data.status != 5)&&((data.isPublisher == 1&&data.isPublisherComplain == 0)||(data.isPublisher == 0&&data.isUserComplain == 0))" @click="complain">申诉</a>
                    <a style="color: #fdba00;" v-if="(data.status != 4&&data.status != 5)&&((data.isPublisher == 1&&data.isPublisherComplain == 1)||(data.isPublisher == 0&&data.isUserComplain == 1))" @click="cancelComplain">取消申诉</a>
                    <p v-if="data.status == 4">订单已取消</p>
                    <p class="tipstitle">交易提醒</p>
                    <p class="tips color1">1. 当你进入交易时，卖家的数字资产会被锁定在平台的钱包中，因此不必担心给卖家付款。如果卖家</p>
                    <p class="tips color1">2. 在您付款5分钟后还未放行数字资产，点击‘申诉’按钮，我们的客服团队将会帮助您。</p>
                    <p class="tips color1">3. 若您已完成付款，请务必点击‘已付款’按钮，卖家确认收款后，您就会收到数字资产。</p>
                    <p class="tips color1">4. 在转账过程中请勿备注类似BTC、USDT、火币等信息，防止造成您的汇款被拦截、银行卡被冻结等问题，因此到账延迟，卖方可选择拒绝成交。</p>
                    <p class="tips color1">5. 请勿使用非平台实名的银行卡、支付宝等进行转款，否则卖家可拒绝成交并投诉。</p>
            </div>
            <div class="rightpart">
                <chat :orderId='orderid' :name='data.publisherNick'></chat>
            </div>
        </div>
        <Icon type="ios-link" />
        <Modal v-model="weixincodeModel" width="300" v-if="data.weixin" class="Modelbox">
            <img :src="data.weixin.codePath" style="width:200px;height:200px;">
            <p slot="footer"></p>
        </Modal>
        <Modal v-model="alipaycodeModel" width="300" v-if="data.alipay" class="Modelbox">
            <img :src="data.alipay.codePath" style="width:200px;height:200px;">
            <p slot="footer"></p>
        </Modal>
    </div>
</template>

<script>
import chat from "./modules/chat.vue";
export default {
  data() {
    return {
      detailapi: this.$common.path + "/order/get",
      payedapi: this.$common.path + "/order/payed",
      cancelapi: this.$common.path + "/order/cancel",
      complainapi: this.$common.path + "/order/complain",
      cancelcomplainapi: this.$common.path + "/order/cancelComplain",
      releaseapi: this.$common.path + "/order/release",
      data: {},
      orderid: this.$route.params.id,
      orderType: "", //1:购买 2:出售
      alipaycodeModel: false,
      weixincodeModel: false,
      countText: ""
    };
  },
  components: {
    chat
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
    this.getDetail();
  },
  methods: {
    handleRender(text, type) {
      this.$Modal.confirm({
        render: h => {
          return h("p", {
            style: {
              color: "#333",
              fontSize: "18px"
            },
            domProps: {
              innerHTML: text
            }
          });
        },
        onOk: () => {
          if (type == 1) {
            this.payed();
          } else if (type == 2) {
            this.release();
          } else if (type == 3) {
            this.cancel();
          }
        }
      });
    },
    getDetail() {
      this.$http
        .get(this.detailapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId,
            orderId: this.orderid
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.data = res.data.data;
            if (this.data.cancelAt != 0) {
              this.countTime();
            }
            if (
              (this.data.isPublisher == 1 && this.data.type == 1) ||
              (this.data.isPublisher == 0 && this.data.type == 2)
            ) {
              this.orderType = 1;
            } else {
              this.orderType = 2;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    payed() {
      this.$http
        .post(this.payedapi, this.$common.sort({ orderId: this.orderid }))
        .then(res => {
          if (res.data.status == 1) {
            this.getDetail();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    cancel() {
      this.$http
        .post(this.cancelapi, this.$common.sort({ orderId: this.orderid }))
        .then(res => {
          if (res.data.status == 1) {
            this.getDetail();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    release() {
      this.$http
        .post(this.releaseapi, this.$common.sort({ orderId: this.orderid }))
        .then(res => {
          if (res.data.status == 1) {
            this.getDetail();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    complain() {
      this.$http
        .post(this.complainapi, this.$common.sort({ orderId: this.orderid }))
        .then(res => {
          if (res.data.status == 1) {
            this.getDetail();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    cancelComplain() {
      this.$http
        .post(
          this.cancelcomplainapi,
          this.$common.sort({ orderId: this.orderid })
        )
        .then(res => {
          if (res.data.status == 1) {
            this.getDetail();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    countTime() {
      var _this = this;
      if (this.data.cancelAt == 0) {
        this.getDetail();
        return false;
      } else {
        this.data.cancelAt--;
        this.countText =
          parseInt(this.data.cancelAt / 60) +
          "分" +
          this.data.cancelAt % 60 +
          "秒";
        setTimeout(function() {
          _this.countTime();
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.businessDetail {
  display: flex;
  width: 1200px;
  margin: auto;
  padding-top: 65px;
  padding-bottom: 100px;
  font-size: 18px;
  color: #000000;
  .leftpart {
    width: 800px;
    .color1 {
      color: #999999;
    }
    .color2 {
      color: #3a82fe;
    }
    .color3 {
      color: red;
    }
    .ordercode {
      padding-bottom: 25px;
    }
    .title {
      font-size: 30px;
      padding-bottom: 39px;
    }
    .orderinfo {
      padding-bottom: 30px;
    }
    .paytitle {
      padding: 20px 0;
    }
    section {
      p {
        display: flex;
        height: 45px;
        justify-content: flex-start;
        align-items: center;
        i:nth-child(1) {
          margin-right: 23px;
        }
        i:nth-child(2) {
          margin-right: 14px;
        }
        span:nth-child(3) {
          width: 80px;
        }
        img {
          padding-left: 20px;
          display: inline-block;
        }
      }
    }
    .paydesc {
      padding: 40px 0;
    }
    a {
      display: inline-block;
      padding: 35px 10px 0 0;
    }
    .tipstitle {
      padding: 15px 0;
      padding-top: 50px;
    }
    .tips {
      padding-top: 25px;
    }
  }
}
</style>

<style>
.leftpart .ivu-btn {
  display: block;
  width: 224px;
  height: 68px;
  background: #3a82fe;
  color: #f7f8fa;
  font-size: 24px;
  border: none;
  border-radius: 0;
}
.rightpart textarea {
  border: none;
  outline: none;
  resize: none;
}
.rightpart .ivu-input:focus {
  box-shadow: none;
}
.Modelbox .ivu-modal-body {
  text-align: center;
}
.Modelbox .ivu-modal-footer {
  padding: 0;
}
</style>
