<template>
    <div class="business wrapDiv">
        <div class="propertyDiv commonDiv">
            <p class="propertytitle">
                <span>商家服务</span>
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
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      lists: [
        {
          name: "已开通支付币种",
          path: "merchantCoins"
        },
        {
          name: "用户列表",
          path: "merchantUserList"
        },{
          name: "订单记录",
          path: "merchantRecord"
        }
      ]
    };
  },
  components: {},
  created() {
    if (this.$route.path == "/merchant/coins") {
      this.active = 0;
    } else if (this.$route.path == "/merchant/userList") {
      this.active = 1;
    } else if (this.$route.path == "/merchant/record") {
      this.active = 2;
    }
  },
  methods: {
    pageTo(path, index) {
      this.active = index;
      this.$router.push({ name: path });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/property.scss";
</style>

