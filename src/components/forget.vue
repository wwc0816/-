<template>
    <div class="login wrapDiv">
        <div class="loginBox">
            <div class="formBox">
                <div class="formtitle">
                    <img src="../assets/images/blacklogo.png" alt="">
                    重置登录密码
                </div>
                <p>重置登录密码后24小时内禁止提币</p>
                <Form :model="formData" label-position="top">
                    <FormItem label="手机号">
                        <i-input v-model="formData.telephone" size="large"></i-input>
                    </FormItem>
                    <FormItem label="验证码">
                        <Input v-model="formData.code" class="seccode" size="large"/>
                        <span class="seccodeBtn" @click="sendcode">{{smscodeBtnText}}</span>
                    </FormItem>
                    <FormItem label="登录密码">
                        <Input v-model="formData.password" placeholder="8-20位数字和字母组合" size="large"/>
                    </FormItem>
                    <FormItem label="确认密码">
                        <Input v-model="repassword" placeholder="8-20位数字和字母组合" size="large"/>
                    </FormItem>
                </Form>
                <section class='type2'>
                    <Button type="primary" @click="findpass">提交</Button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      findapi: this.$common.path + "/user/modifyloginpassword",
      codeapi: this.$common.path + "/user/sendverify",
      formData: {
        telephone: "",
        code: "",
        password: ""
      },
      repassword: "",
      smscodeBtnText: "发送验证码",
      disabled: true,
      wait: 90
    };
  },
  methods: {
    findpass() {
      if (this.formData.telephone == "") {
        this.$Message.error({
          content: "请输入正确手机号",
          duration: 10,
          closable: true
        });
        return false;
      }
      if (this.formData.code == "") {
        this.$Message.error({
          content: "请输入验证码",
          duration: 10,
          closable: true
        });
        return false;
      }
      if (this.formData.password == "") {
        this.$Message.error({
          content: "请输入密码",
          duration: 10,
          closable: true
        });
        return false;
      }
      var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      if (!reg.test(this.formData.password)) {
        this.$Message.error({
          content: "请输入8-20位数字和字母组合密码",
          duration: 10,
          closable: true
        });
        return false;
      }
      if (this.formData.password != this.repassword) {
        this.$Message.error({
          content: "请确认两次密码保持一致",
          duration: 10,
          closable: true
        });
        return false;
      }
      this.$http
        .post(this.findapi, this.$common.sort(this.formData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success(res.data.message);
            this.$router.push({name: 'login'});
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    sendcode() {
      if (!this.disabled) {
        return false;
      }
      if (this.formData.telephone == "") {
        this.$Message.error({
          content: "请输入正确手机号",
          duration: 10,
          closable: true
        });
        return false;
      }
      var obj = {
        telephone: this.formData.telephone
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
    waitTime: function() {
      var _this = this;
      _this.disabled = false;
      if (_this.wait == 0) {
        _this.smscodeBtnText = "获取验证码";
        _this.disabled = true;
        _this.wait = 90;
      } else {
        _this.wait--;
        _this.smscodeBtnText = _this.wait + "S后重发";
        setTimeout(function() {
          _this.waitTime();
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/form.scss";
</style>

<style>
@import "../assets/css/form.css";
</style>

