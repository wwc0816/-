<template>
    <div class="login wrapDiv">
        <div class="loginBox">
            <div class="formBox">
                <div class="formtitle">
                    <img src="../assets/images/blacklogo.png" alt="">
                    注册
                </div>
                <p>法币交易与币交易公用一个账户</p>
                <Form :model="formData" label-position="top">
                    <FormItem label="国际">
                        <Select v-model="nation" size="large" disabled>
                            <Option v-for="item in nationality" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号">
                        <i-input v-model="formData.telephone" size="large">
                            <Select v-model="phonehead" slot="prepend" style="width: 80px" disabled>
                                <Option value="0086">0086</Option>
                            </Select>
                        </i-input>
                    </FormItem>
                    <FormItem label="验证码">
                        <Input v-model="formData.code" class="seccode" size="large" :maxlength='6'/>
                        <span class="seccodeBtn" @click="sendcode">{{smscodeBtnText}}</span>
                    </FormItem>
                    <FormItem label="登录密码">
                        <Input v-model="formData.password" type="password" placeholder="8-20位数字和字母组合" size="large" :maxlength='20' autocomplete="off"/>
                    </FormItem>
                    <FormItem label="确认密码">
                        <Input v-model="repassword" type="password" placeholder="8-20位数字和字母组合" size="large" :maxlength='20' autocomplete="off"/>
                    </FormItem>
                </Form>
                <section class="type2">
                    <i :class='{agree:agree}' @click='agree = !agree'></i>
                    <span>我已阅读并同意</span>
                    <a @click="pageTo('policy')">《用户协议》</a>
                </section>
                <section>
                    <Button type="primary" @click="registerBtn">确定注册</Button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      codeapi: this.$common.path + "/user/sendverify",
      registerapi: this.$common.path + "/user/register",
      formData: {
        telephone: "",
        code: "",
        password: ""
      },
      repassword: "",
      nation: 1,
      phonehead: "0086",
      nationality: [
        {
          value: 1,
          label: "中国"
        },
        {
          value: 2,
          label: "美国"
        },
        {
          value: 3,
          label: "日本"
        }
      ],
      agree: true,
      smscodeBtnText: "发送验证码",
      disabled: true,
      wait: 90
    };
  },
  methods: {
    pageTo(path){
      this.$router.push({ name: path });
    },
    registerBtn() {
      if (!this.agree) {
        this.$Message.info("请阅读并同意《用户协议》");
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
        .post(this.registerapi, this.$common.sort(this.formData))
        .then(res => {
          if (res.data.status == 1) {
            this.$Message.success("注册成功");
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
.loginBox {
  i {
    width: 22px;
    height: 22px;
    background-image: url(../assets/images/priorityed.png);
  }
  i.agree {
    background-image: url(../assets/images/priority.png);
  }
}
</style>

<style>
@import "../assets/css/form.css";
</style>

