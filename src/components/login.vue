<template>
    <div class="login wrapDiv">
        <div class="loginBox">
            <div class="formBox">
                <div class="formtitle">
                    <img src="../assets/images/blacklogo.png" alt="">
                    欢迎登陆
                </div>
                <p>法币交易与币交易公用一个账户</p>
                <Form :model="formTop" label-position="top">
                    <FormItem label="账户名">
                        <Input v-model="formTop.telephone" size="large" autocomplete="off"/>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="formTop.password" type="password" autocomplete="off" size="large"/>
                    </FormItem>
                </Form>
                <router-link :to="'forget'">忘记密码</router-link>
                <section>
                    <Button type="primary" @click="tologin">立即登录</Button>
                    <span>还没有账户 ? </span>
                    <router-link :to="'register'">点击注册</router-link>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formTop: {
        telephone: "",
        password: ""
      },
      urlapi: this.$common.path + "/user/login"
    };
  },
  methods: {
    tologin() {
      this.$http.post(this.urlapi, this.$common.sort(this.formTop)).then(
        res => {
          if (res.data.status == 1) {
            var data = res.data.data;
            this.$common.setCookie("nickname", data.nickname);
            this.$common.setCookie("token", data.token);
            this.$common.setCookie("telephone", data.telephone);
            this.$common.setCookie("userId", data.userId);
            this.$common.setCookie("isPayMargin", data.isPayMargin);
            this.$common.setCookie('isSetPayPassword',data.isSetPayPassword);
            this.$common.setCookie('isRealAuth',data.isRealAuth), //是否实名认证
            this.$common.setCookie('isSeniorAuth',data.isSeniorAuth), //是否高级认证
            this.$common.setCookie('isSetNickname',data.isSetNickname), //是否设置昵称
            this.$common.setCookie('idNumber',data.idNumber), //身份证号
            this.$common.setCookie('name',data.name), 
            this.$common.setCookie('isSetBank',data.isSetBank);
            this.$common.setCookie('isSetAlipay',data.isSetAlipay);
            this.$common.setCookie('isSetWeixin',data.isSetWeixin);
            this.$store.state.userstatus.isPayMargin = data.isPayMargin;
            this.$store.state.userstatus.userId = data.userId;
            this.$store.state.userstatus.token = data.token;
            this.$store.state.userstatus.telephone = data.telephone;
            this.$store.state.userstatus.nickname = data.nickname;
            this.$store.state.userstatus.isSetPayPassword = data.isSetPayPassword;
            this.$store.state.userstatus.isRealAuth = data.isRealAuth;
            this.$store.state.userstatus.isSeniorAuth = data.isSeniorAuth;
            this.$store.state.userstatus.isSetNickname = data.isSetNickname;
            this.$store.state.userstatus.idNumber = data.idNumber;
            this.$store.state.userstatus.name = data.name;
            this.$store.state.userstatus.isSetBank = data.isSetBank;  
            this.$store.state.userstatus.isSetAlipay = data.isSetAlipay;
            this.$store.state.userstatus.isSetWeixin = data.isSetWeixin;
           
            window.location.href = '/';
          } else {
            this.$Message.error(res.data.message);
          }
        }
      );
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/form.scss";
</style>

<style>
@import "../assets/css/form.css";
</style>

