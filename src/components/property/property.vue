<template>
    <div class="business wrapDiv">
        <div class="propertyDiv commonDiv">
            <p class="propertytitle">
                <span>我的资产</span>
            </p>
            <div class="propertymain">
              <div class="propertymainleft">
                <ul>
                  <li v-for="(item, index) in lists" :key="index" @click="pageTo(item.path,index)" :class='{active:active == index}'>{{item.name}}</li>
                </ul>
              </div>
              <div class="propertymainright">
                <router-view />
              </div>
            </div>
        </div>
        <!-- 资产互转 -->
        <Modal
            v-model="$store.state.status.withdrawModal"
            width="490"
            @on-ok="withdrawOk"
            @on-cancel="withdrawCancel"
            okText="立即划转">
            <p class="confirmTitle">资产互转<span>提币请划转到币币交易账户</span></p>
            <Form :model="withdrawData" label-position="top">
                <FormItem label="币种">
                    <p class="colorgray">{{$store.state.status.cointype}}</p>
                </FormItem>
                <FormItem label="从">
                    <Select v-model="from" @on-change='changefrom(from)'>
                        <Option value="1">币币账户</Option>
                        <Option value="2">法币账户</Option>
                    </Select>
                </FormItem>
                <FormItem label="转至">
                    <Select v-model="to" @on-change='changeto(to)'>
                        <Option value="1">币币账户</Option>
                        <Option value="2">法币账户</Option>
                    </Select>
                </FormItem>
                <FormItem label="数量">
                    <i-input v-model="withdrawData.amount" @on-blur="changeamount(withdrawData.amount)"></i-input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      lists: [
        {
          name: "交易账户",
          path: "dealAccount"
        },
        {
          name: "法币账户",
          path: "legalAccount"
        },{
          name: "商家账户",
          path: "merchantAccount"
        }
      ],
      coinurl: this.$common.coinspath + "/v1/otc/balance/coin",
      otcurl: this.$common.coinspath + "/v1/coin/balance/otc",
      from: "",
      to: "",
      withdrawData: {
        userId: this.$store.state.userstatus.userId,
        cointype: "",
        amount: ""
      }
    };
  },
  components: {},
  created() {
    if (this.$route.path == "/property/dealAccount") {
      this.active = 0;
    } else if (this.$route.path == "/property/legalAccount") {
      this.active = 1;
    } else if (this.$route.path == "/property/merchantAccount") {
      this.active = 2;
    }
  },
  methods: {
    pageTo(path, index) {
      this.active = index;
      this.$router.push({ name: path });
    },
    withdrawOk() {
      this.withdrawData.cointype = this.$store.state.status.cointype;
      var url = "";
      if (this.to == 1) {
        url = this.coinurl;
      } else {
        url = this.otcurl;
      }
      this.$axios.post(url, this.$common.sort(this.withdrawData)).then(res => {
        if (res.data.status == 1) {
          this.$Message.success(res.data.message);
          router.go({
            path: this.$router.path,
            force: true
          })
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    withdrawCancel() {},
    changefrom(value) {
      if (value == 1) {
        this.to = "2";
      } else {
        this.to = "1";
      }
    },
    changeto(value) {
      if (value == 1) {
        this.from = "2";
      } else {
        this.from = "1";
      }
    },
    changeamount(val) {
      this.withdrawData.amount = this.$common.clearNoNum(val, 2);
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/property.scss";
</style>

<style>
@import "../../assets/css/page.css";
@import "../../assets/css/modal.css";

.propertyBtn.ivu-btn {
  width: 100px;
  height: 43px;
  font-size: 18px;
  border-radius: 0;
}
textarea.ivu-input {
  resize: none;
}
</style>
