<template>
    <div class="whitebg wrapDiv">
        <div class="personalDiv commonDiv">
            <div class="personalLeft">
                <section class="header">
                    <span class="headericon">{{$store.state.userstatus.headIcon}}</span>
                    <p>
                        <span v-if="$store.state.userstatus.nickname">{{$store.state.userstatus.nickname}}</span>
                        <span v-else>{{$store.state.userstatus.telephone}}</span>
                        <span>UID:{{$store.state.userstatus.userId}}</span>
                    </p>
                </section>
                <div class="decs">
                    <p>总成单 : <span>{{orderTotal}}次</span></p>
                    <!-- <p>平均放行 : <span>0.00分钟</span></p> -->
                </div>
                <div class="history">
                    <p>本账号于{{registerAtTime}}注册</p>
                    <!-- <p>首页交易在 : 2018-12-30 15:22:33</p> -->
                </div>
            </div>
            <div class="personalRight">
                <div class="infoBox">
                    <p class="title">账户与安全</p>
                    <p class="line"></p>
                    <ul>
                        <!-- <li>
                            <i class="infoIcon infoIcon-email"></i>
                            <section>
                                <span>邮箱</span>
                                <span>未绑定</span>
                                <a href="">绑定</a>
                            </section>
                        </li> -->
                        <li>
                            <i class="infoIcon infoIcon-phone"></i>
                            <section>
                                <span>手机</span>
                                <span class="blackcolor">已绑定</span>
                                <!-- <a href="">关闭</a> -->
                            </section>
                        </li>
                        <!-- <li>
                            <i class="infoIcon infoIcon-google"></i>
                            <section>
                                <span>谷歌验证码</span>
                                <span>未绑定</span>
                                <a href="">绑定</a>
                            </section>
                        </li> -->
                        <li>
                            <i class="infoIcon infoIcon-pass"></i>
                            <section>
                                <span>登录密码</span>
                                <span>********</span>
                                <a @click="changePassModal = true">修改</a>
                            </section>
                        </li>
                        <li>
                            <i class="infoIcon infoIcon-pass"></i>
                            <section>
                                <span>资金密码</span>
                                <span v-if="$store.state.userstatus.isSetPayPassword == 0">未设置</span>
                                <span v-else>********</span>
                                <a v-if="$store.state.userstatus.isSetPayPassword == 0" @click="capitalModal = true">设置</a>
                                <a @click="payPassWordModal = true" v-else >重置</a>
                            </section>
                        </li>
                    </ul>
                </div>
                <div class="infoBox">
                    <p class="title">身份认证</p>
                    <p class="titleS">请如实填写您的身份信息，一经认证不可修改</p>
                    <p class="line"></p>
                    <ul>
                        <li>
                            <i class="infoIcon infoIcon-card"></i>
                            <section>
                                <span>实名认证</span>
                                <span v-if="$store.state.userstatus.isRealAuth == 0">未认证</span>
                                <span v-else>{{$store.state.userstatus.name}}，{{$store.state.userstatus.idNumber}}</span>
                                <a v-if="$store.state.userstatus.isRealAuth == 0" @click="realNameModal = true">认证</a>
                                <a v-else class="blackcolor" >已认证</a>
                            </section>
                        </li>
                        <li>
                            <i class="infoIcon infoIcon-check"></i>
                            <section>
                                <span>高级认证</span>
                                <span v-if="$store.state.userstatus.isSeniorAuth == 1">审核通过</span>
                                <span v-else>{{seniorAuthData.authStatus == 1?'等待审核':(seniorAuthData.authStatus == 2?'审核不通过'+seniorAuthData.comment:(seniorAuthData.authStatus == 3?'审核通过':'未提交审核'))}}</span>
                                <router-link v-if="$store.state.userstatus.isSeniorAuth == 0" to="certification">认证</router-link>
                                <a v-else class="blackcolor" >已认证</a>
                            </section>
                        </li>
                    </ul>
                </div>
                <div class="infoBox">
                    <p class="title">支付方式</p>
                    <p class="titleS">请务必使用本人的实名账户。被激活的支付方式将在交易时向买家展示，最多激活3种</p>
                    <p class="line"></p>
                    <ul>
                        <li v-for="(item, index) in payways" :key="index" v-if="item">
                            <i class="payicon" :class="{ 'payicon-wechat': index=='weixin', 'payicon-card': index=='bank', 'payicon-alipay': index=='alipay' }"></i>
                            <section v-if="index=='bank'">
                                <span>银行卡</span>
                                <span>{{item.cardNumber}} {{item.bankName}}</span>
                                <a @click="getPayWayBank">修改</a>
                                <i-switch v-model='item.status==1' @on-change="change(index)"></i-switch>
                            </section>
                            <section v-else>
                                <span v-if="index=='weixin'">微信</span>
                                <span v-else-if="index=='alipay'">支付宝</span>
                                <span>{{item.account}} {{item.name}}</span>
                                <a v-if="index=='weixin'" @click="getPayWayWeixin">修改</a>
                                <a v-else-if="index=='alipay'" @click="getPayWayAlipay">修改</a>
                                <i-switch v-model='item.status==1' @on-change="change(index)"></i-switch>
                            </section>
                        </li>
                    </ul>
                    <p class="addpayway" @click="openAdd" v-if="canaddpayway">添加支付方式</p>
                </div>
            </div>
        </div>
        <!-- 实名认证 -->
        <Modal
            v-model="realNameModal"
            width="490"
            @on-ok="realNameOk"
            @on-cancel="realNameCancel"
            okText="完成">
            <p class="confirmTitle">实名认证<span>为保证交易安全，请耐心完善一下信息</span></p>
            <Form :model="realNameData" label-position="top">
                <FormItem label="国家">
                    <Select v-model="realNameDataNationality" disabled>
                        <Option value="中国">中国</Option>
                    </Select>
                </FormItem>
                <FormItem label="姓名">
                    <i-input v-model="realNameData.name"></i-input>
                </FormItem>
                <FormItem label="身份证号">
                    <i-input v-model="realNameData.idNumber"></i-input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 添加支付方式 -->
        <Modal
            v-model="addPayWayModal"
            width="490"
            @on-ok="addPayWayOk"
            @on-cancel="addPayWayCancel"
            okText="完成设置">
        <p class="confirmTitle">添加支付方式</p>
        <Form :model="addPayWayData" label-position="top">
            <FormItem label="支付方式">
                <Select v-model="addPayWayData.payway">
                    <Option value="1" :disabled="$store.state.userstatus.isSetBank==1">银行卡</Option>
                    <Option value="2" :disabled="$store.state.userstatus.isSetWeixin==1">微信</Option>
                    <Option value="3" :disabled="$store.state.userstatus.isSetAlipay==1">支付宝</Option>
                </Select>
            </FormItem>

            <section v-if="addPayWayData.payway == 1">
                <FormItem label="姓名">
                    <i-input v-model="addPayWayBank.name"></i-input>
                </FormItem>
                <FormItem label="开户银行">
                    <i-input v-model="addPayWayBank.bankName"></i-input>
                </FormItem>
                <FormItem label="开户支行（选填）">
                    <i-input v-model="addPayWayBank.bankBranch"></i-input>
                </FormItem>
                <FormItem label="银行卡账号">
                    <i-input v-model="addPayWayBank.cardNumber"></i-input>
                </FormItem>
                <FormItem label="资金密码">
                    <i-input v-model="addPayWayBank.payPassword"></i-input>
                </FormItem>
            </section>
            <section v-if="addPayWayData.payway == 2">
                <FormItem label="姓名">
                    <i-input v-model="addPayWayWeixin.name"></i-input>
                </FormItem>
                <FormItem label="微信账号">
                    <i-input v-model="addPayWayWeixin.account"></i-input>
                </FormItem>
                <FormItem label="二维码">
                    <upload :uploaddata="uploaddata"></upload>
                </FormItem>
                <FormItem label="资金密码">
                    <i-input v-model="addPayWayWeixin.payPassword"></i-input>
                </FormItem>
            </section>
            <section v-if="addPayWayData.payway == 3">
                <FormItem label="姓名">
                    <i-input v-model="addPayWayAlipay.name"></i-input>
                </FormItem>
                <FormItem label="支付宝账号">
                    <i-input v-model="addPayWayAlipay.account"></i-input>
                </FormItem>
                <FormItem label="二维码">
                    <upload :uploaddata="uploaddata"></upload>
                </FormItem>
                <FormItem label="资金密码">
                    <i-input v-model="addPayWayAlipay.payPassword"></i-input>
                </FormItem>
            </section>
        </Form>
    </Modal>
        <!-- 修改银行卡支付方式 -->
        <Modal
            v-model="updataPayWayBankModal"
            width="490"
            @on-ok="addbank"
            @on-cancel="addPayWayCancel"
            okText="完成设置">
            <p class="confirmTitle">修改支付方式</p>
            <Form :model="addPayWayData" label-position="top">
                    <FormItem label="姓名">
                        <i-input v-model="addPayWayBank.name"></i-input>
                    </FormItem>
                    <FormItem label="开户银行">
                        <i-input v-model="addPayWayBank.bankName"></i-input>
                    </FormItem>
                    <FormItem label="开户支行（选填）">
                        <i-input v-model="addPayWayBank.bankBranch"></i-input>
                    </FormItem>
                    <FormItem label="银行卡账号">
                        <i-input v-model="addPayWayBank.cardNumber"></i-input>
                    </FormItem>
                    <FormItem label="资金密码">
                        <i-input v-model="addPayWayBank.payPassword"></i-input>
                    </FormItem>
            </Form>
        </Modal>
        <!-- 修改微信支付方式 -->
        <Modal
            v-model="updataPayWayWeixinModal"
            width="490"
            @on-ok="addweixin"
            @on-cancel="addPayWayCancel"
            okText="完成设置">
            <p class="confirmTitle">修改支付方式</p>
            <Form :model="addPayWayData" label-position="top">
                    <FormItem label="姓名">
                        <i-input v-model="addPayWayWeixin.name"></i-input>
                    </FormItem>
                    <FormItem label="微信账号">
                        <i-input v-model="addPayWayWeixin.account"></i-input>
                    </FormItem>
                    <FormItem label="二维码">
                        <upload :uploaddata="uploaddata"></upload>
                    </FormItem>
                    <FormItem label="资金密码">
                        <i-input v-model="addPayWayWeixin.payPassword"></i-input>
                    </FormItem>
            </Form>
        </Modal>
        <!-- 修改支付宝支付方式 -->
        <Modal
            v-model="updataPayWayAlipayModal"
            width="490"
            @on-ok="addalipay"
            @on-cancel="addPayWayCancel"
            okText="完成设置">
            <p class="confirmTitle">修改支付方式</p>
            <Form :model="addPayWayData" label-position="top">
                    <FormItem label="姓名">
                        <i-input v-model="addPayWayAlipay.name"></i-input>
                    </FormItem>
                    <FormItem label="支付宝账号">
                        <i-input v-model="addPayWayAlipay.account"></i-input>
                    </FormItem>
                    <FormItem label="二维码">
                        <upload :uploaddata='uploaddata'></upload>
                    </FormItem>
                    <FormItem label="资金密码">
                        <i-input v-model="addPayWayAlipay.payPassword"></i-input>
                    </FormItem>
            </Form>
        </Modal>
        <!-- 昵称与资金密码 -->
        <Modal
            v-model="capitalModal"
            width="490"
            @on-ok="capitalOk"
            @on-cancel="capitalCancel"
            okText="完成">
            <p class="confirmTitle">设置昵称与资金密码<span>为保证交易安全，请耐心完善一下信息</span></p>
            <Form :model="capitalData" label-position="top">
                <FormItem label="昵称">
                    <i-input v-model="capitalData.nickname"></i-input>
                </FormItem>
                <FormItem label="资金密码">
                    <i-input v-model="capitalData.payPassword"></i-input>
                </FormItem>
                <FormItem label="确认资金密码">
                    <i-input v-model="capitalrepass"></i-input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 修改登录密码 -->
        <Modal
            v-model="changePassModal"
            width="490"
            @on-ok="changePassOk"
            @on-cancel="changePassCancel"
            okText="提交">
            <p class="confirmTitle">修改登录密码</p>
            <Form :model="changePassData" label-position="top">
                <FormItem label="手机号">
                    <i-input v-model="$store.state.userstatus.telephone" disabled></i-input>
                </FormItem>
                <FormItem label="验证码" class="smscodeBox">
                    <i-input v-model="changePassData.code"></i-input>
                    <span class="sendSmscodeBtn" @click="sendcode">{{smscodeBtnText}}</span>
                </FormItem>
                <FormItem label="输入新密码">
                    <i-input v-model="changePassData.password" placeholder="8-20位数字和字母组合"></i-input>
                </FormItem>
                <FormItem label="确认新密码">
                    <i-input v-model="changePassDatarepass" placeholder="8-20位数字和字母组合"></i-input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 重置资金密码 -->
        <Modal
            v-model="payPassWordModal"
            width="490"
            @on-ok="payPassWordOk"
            @on-cancel="payPassWordCancel"
            okText="提交">
            <p class="confirmTitle">重置资金密码</p>
            <Form :model="payPassWordData" label-position="top">
                <FormItem label="手机号">
                    <i-input v-model="$store.state.userstatus.telephone" disabled></i-input>
                </FormItem>
                <FormItem label="验证码" class="smscodeBox">
                    <i-input v-model="payPassWordData.code"></i-input>
                    <span class="sendSmscodeBtn" @click="sendcode">{{smscodeBtnText}}</span>
                </FormItem>
                <FormItem label="输入新资金密码">
                    <i-input v-model="payPassWordData.password" placeholder="8-20位数字和字母组合"></i-input>
                </FormItem>
                <FormItem label="确认新资金密码">
                    <i-input v-model="payPassWordDatarepass" placeholder="8-20位数字和字母组合"></i-input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import upload from "../modules/upload";
export default {
  data() {
    return {
      codeapi: this.$common.path + "/user/sendverify",
      addPayWayBankapi: this.$common.path + "/user/addBankCard",
      addPayWayWeixinapi: this.$common.path + "/user/addWeixinPay",
      addPayWayAlipayapi: this.$common.path + "/user/addAlipay",
      getPayWayBankapi: this.$common.path + "/user/getBankCard",
      getPayWayWeixinapi: this.$common.path + "/user/getWeixinPay",
      getPayWayAlipayapi: this.$common.path + "/user/getAlipay",
      setPayWayBankapi: this.$common.path + "/user/setBankCardStatus",
      setPayWayWeixinapi: this.$common.path + "/user/setWeixinPayStatus",
      setPayWayAlipayapi: this.$common.path + "/user/setAlipayStatus",
      userbaseurl: this.$common.path+ '/user/getUserBase',
      smscodeBtnText: "发送验证码",
      disabled: true,
      wait: 90,
      realNameUrl: this.$common.path + "/user/realauth",/*实名认证信息*/
      realNameModal: false,
      realNameData: {
        name: "",
        idNumber: "",
        userId: this.$store.state.userstatus.userId
      },
      realNameDataNationality: "中国",
      addPayWayModal: false,
      addPayWayData: {
        payway: "1"
      },
      addPayWayBank: {
        userId: this.$store.state.userstatus.userId,
        name: "",
        cardNumber: "",
        bankName: "",
        bankBranch: "",
        payPassword: ""
      },
      addPayWayAlipay: {
        userId: this.$store.state.userstatus.userId,
        name: "",
        account: "",
        codePath: "",
        payPassword: ""
      },
      addPayWayWeixin: {
        userId: this.$store.state.userstatus.userId,
        name: "",
        account: "",
        codePath: "",
        payPassword: ""
      },
      capitalUrl: this.$common.path + "/user/setNicknameAndSafe",
      capitalModal: false,
      capitalData: {
        userId: this.$store.state.userstatus.userId,
        nickname: "",
        payPassword: ""
      },
      capitalrepass: "",
      changePassUrl: this.$common.path + "/user/modifyloginpassword",
      changePassModal: false,
      changePassData: {
        telephone: this.$store.state.userstatus.telephone,
        code: "",
        password: ""
      },
      changePassDatarepass: "",
      payPassWordUrl: this.$common.path + "/user/modifyPayPassword",
      payPassWordModal: false,
      payPassWordData: {
        userId: this.$store.state.userstatus.userId,
        code: "",
        password: ""
      },
      payPassWordDatarepass: "",
      getCollectionAccountUrl: this.$common.path + "/user/getCollectionAccount",
      payways: {},
      imgurl: "",
      updataPayWayBankModal: false,
      updataPayWayWeixinModal: false,
      updataPayWayAlipayModal: false,
      canaddpayway: true,
      uploaddata: {
        decs: "请上传您的收款二维码图片（*.jpg、*.png、*.jpeg）"
      },
      getSeniorAuthapi:this.$common.path+'/user/getSeniorAuth',
      seniorAuthData:{},
      orderTotal:'',
      registerAtTime:''
    }
  },
  components: {
    upload
  },
  created() {
    if (!this.$store.state.userstatus.userId) {
      this.$router.push({ name: "login" });
    }
    this.setpayway();
    this.getCollectionAccount();
    this.getSeniorAuth();
    this.getinfo();
  },
  methods: {
    setpayway() {
      this.addPayWayData.payway =
        this.$store.state.userstatus.isSetBank == 0
          ? "1"
          : this.$store.state.userstatus.isSetWeixin == 0 ? "2" : "3";
    },
    waitTime: function() {
      var _this = this;
      this.disabled = false;
      if (this.wait == 0) {
        this.smscodeBtnText = "获取验证码";
        this.disabled = true;
        this.wait = 90;
      } else {
        this.wait--;
        this.smscodeBtnText = this.wait + "S后重发";
        setTimeout(function() {
          _this.waitTime();
        }, 1000);
      }
    },
    sendcode() {
      if (!this.disabled) {
        return false;
      }
      var obj = {
        telephone: this.$store.state.userstatus.telephone
      };
      this.$http.post(this.codeapi, this.$common.sort(obj)).then(res => {
        if (res.data.status == 1) {
          this.$Message.success(res.data.message);
          this.waitTime();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    changestatus(index){
      if (this.payways[index].status == 1) {
        this.payways[index].status = 0;
      } else {
        this.payways[index].status = 1;
      }
    },
    change(index) {
      this.changestatus(index);
      var obj = {
        userId: this.$store.state.userstatus.userId,
        status: this.payways[index].status
      };
      if (index == "bank") {
        this.$http
          .post(this.setPayWayBankapi, this.$common.sort(obj))
          .then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
            } else {
              this.changestatus(index)
              this.$Message.error(res.data.message);
            }
          });
      } else if (index == "weixin") {
        this.$http
          .post(this.setPayWayWeixinapi, this.$common.sort(obj))
          .then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
            } else {
              this.changestatus(index)
              this.$Message.error(res.data.message);
            }
          });
      } else {
        this.$http
          .post(this.setPayWayAlipayapi, this.$common.sort(obj))
          .then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
            } else {
              this.changestatus(index)
              this.$Message.error(res.data.message);
            }
          });
      }
    },
      /*实名认证*/
    realNameOk() {
      this.$http
        .post(this.realNameUrl, this.$common.sort(this.realNameData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
            this.$store.state.userstatus.name = this.realNameData.name;
            this.$store.state.userstatus.idNumber = this.realNameData.idNumber;
            this.$store.state.userstatus.isRealAuth = 1;
            this.$common.setCookie("name", this.realNameData.name);
            this.$common.setCookie("idNumber", this.realNameData.idNumber);
            this.$common.setCookie("isRealAuth", 1);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    realNameCancel() {},
    openAdd() {
      this.$store.state.qiniu.uploadUrl = "";
      this.addPayWayModal = true;
    },

    addbank() {
      this.$http
        .post(this.addPayWayBankapi, this.$common.sort(this.addPayWayBank))
        .then(res => {
          if (res.data.status == 1) {
            this.$store.state.userstatus.isSetBank = 1;
            this.$common.setCookie("isSetBank", 1);
            this.getCollectionAccount();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
      /*添加微信*/
    addweixin() {
      this.addPayWayWeixin.codePath = this.$store.state.qiniu.uploadUrl;

      if (this.addPayWayWeixin.codePath == "") {
        this.$Message.error("请上传图片");
        return false;
      }
      this.$http
        .post(this.addPayWayWeixinapi, this.$common.sort(this.addPayWayWeixin))
        .then(res => {
          if (res.data.status == 1) {
            this.$store.state.userstatus.isSetWeixin = 1;
            this.$common.setCookie("isSetWeixin", 1);
            this.getCollectionAccount();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
      /*添加支付宝*/
    addalipay() {
      this.addPayWayAlipay.codePath = this.$store.state.qiniu.uploadUrl;
      if (this.addPayWayAlipay.codePath == "") {
        this.$Message.error("请上传图片");
        return false;
      }
      this.$http
        .post(this.addPayWayAlipayapi, this.$common.sort(this.addPayWayAlipay))
        .then(res => {
          if (res.data.status == 1) {
            this.$store.state.userstatus.isSetAlipay = 1;
            this.$common.setCookie("isSetAlipay", 1);
            this.getCollectionAccount();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },

    addPayWayOk() {
      if (this.addPayWayData.payway == "1") {
        this.addbank();
      } else if (this.addPayWayData.payway == "2") {
        this.addweixin();
      } else {
        this.addalipay();
      }
    },
    addPayWayCancel() {},
    capitalOk() {
      this.$http
        .post(this.capitalUrl, this.$common.sort(this.capitalData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
            this.$store.state.userstatus.nickname = this.capitalData.nickname;
            this.$store.state.userstatus.isSetPayPassword = 1;
            this.$common.getCookie("isSetPayPassword", 1);
            this.$common.getCookie("nickname", this.capitalData.nickname);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    capitalCancel() {},
    changePassOk() {
      this.$http
        .post(this.changePassUrl, this.$common.sort(this.changePassData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    changePassCancel() {},
    payPassWordOk() {
      this.$http
        .post(this.payPassWordUrl, this.$common.sort(this.payPassWordData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    payPassWordCancel() {},
    getCollectionAccount() {
      this.$http
        .get(this.getCollectionAccountUrl, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.payways = res.data.data;
            if (
              res.data.data.weixin != null &&
              res.data.data.bank != null &&
              res.data.data.alipay != null
            ) {
              this.canaddpayway = false;
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getPayWayBank() {
      this.$http
        .get(this.getPayWayBankapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            var data = res.data.data;
            this.addPayWayBank.name = data.name;
            this.addPayWayBank.cardNumber = data.card_number;
            this.addPayWayBank.bankName = data.bank_name;
            this.addPayWayBank.bankBranch = data.bank_branch;
          } else {
            this.$Message.error(res.data.message);
          }
        });
      this.updataPayWayBankModal = true;
    },
    getPayWayWeixin() {
      this.$http
        .get(this.getPayWayWeixinapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            var data = res.data.data;
            this.addPayWayWeixin.name = data.name;
            this.addPayWayWeixin.account = data.account;
            this.$store.state.qiniu.uploadUrl = data.codePath;
          } else {
            this.$Message.error(res.data.message);
          }
        });
      this.updataPayWayWeixinModal = true;
    },
    getPayWayAlipay() {
      this.$http
        .get(this.getPayWayAlipayapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            var data = res.data.data;
            this.addPayWayAlipay.name = data.name;
            this.addPayWayAlipay.account = data.account;
            this.$store.state.qiniu.uploadUrl = data.codePath;
          } else {
            this.$Message.error(res.data.message);
          }
        });
      this.updataPayWayAlipayModal = true;
    },
    getSeniorAuth(){
      this.$http
        .get(this.getSeniorAuthapi, {
          params: this.$common.sort({
            userId: this.$store.state.userstatus.userId
          })
        })
        .then(res => {
          if (res.data.status == 1) {
            this.seniorAuthData = res.data.data;
            if(this.seniorAuthData.authStatus == 3){
              this.$store.state.userstatus.isSeniorAuth == 1;
              this.$common.setCookie('isSeniorAuth',1);
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getinfo(){
            this.$http.get(this.userbaseurl,{params:this.$common.sort({userId:this.$store.state.userstatus.userId})}).then(res=>{
                if (res.data.status == 1) {
                    this.orderTotal = res.data.data.orderTotal;
                    this.registerAtTime = this.$common.timeformat(res.data.data.registerAt);
                } else {
                    this.$Message.error(res.data.message);
                }
            })
        }
  }
};
</script>

<style lang="scss" scoped>
.personalDiv {
  display: flex;
  justify-content: space-between;
  padding-top: 78px;
  color: #999999;
  .personalLeft {
    width: 252px;
    font-size: 14px;
    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 7px;
      padding-bottom: 20px;
      .headericon {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        background: #f88527;
      }
      p {
        padding-left: 12px;
        span {
          display: block;
        }
        span:nth-child(1) {
          color: #010101;
          padding-bottom: 12px;
        }
      }
    }
    .decs {
      padding: 20px 0;
      border-top: 1px solid #ced8eb;
      border-bottom: 1px solid #ced8eb;
      p {
        padding: 5px 0;
        span {
          color: #010101;
        }
      }
    }
    .history {
      padding-top: 25px;
      p {
        padding-bottom: 14px;
      }
    }
  }
  .personalRight {
    .infoBox {
      width: 823px;
      padding: 30px;
      height: auto;
      border: 1px solid #f1f1f1;
      box-shadow: 0 0 50px #cccccc;
      margin-bottom: 50px;
      .title {
        font-size: 24px;
        color: #010101;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 18px;
          span {
            color: #ed2727;
          }
        }
      }
      .titleS {
        font-size: 18px;
        color: #999999;
        padding-top: 16px;
      }
      .line {
        border-bottom: 1px solid #ced8eb;
        padding-top: 30px;
      }
      .addpayway {
        color: #2d8cf0;
        text-align: right;
        padding-right: 50px;
        padding-top: 15px;
        cursor: pointer;
      }
      ul {
        font-size: 14px;
        li {
          display: flex;
          height: 60px;
          justify-content: space-between;
          align-items: center;
          section {
            display: flex;
            flex: 1;
            justify-content: flex-start;
            align-items: center;
            margin-left: 16px;
            height: 60px;
            border-bottom: 1px solid #ebeef4;
            span:nth-child(1) {
              width: 150px;
            }
            span:nth-child(2) {
              flex: 1;
            }
            .blackcolor {
              color: #010101;
            }
          }
        }
      }
      .notanymore {
        font-size: 18px;
        text-align: center;
        padding-top: 50px;
      }
    }
  }
}
.smscodeBox {
  position: relative;
  .sendSmscodeBtn {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    padding: 0 20px;
    color: #010101;
  }
}
</style>

<style>
@import "../../assets/css/modal.css";

.ivu-switch {
  margin-left: 16px;
}
</style>
