<template>
    <div class="header">
        <img src="../assets/images/logo.png" alt="" class="logo" @click="toIndex" style="cursor:pointer;">
        <ul class="menuUl">
            <li><a @click="$router.push({ name: 'exchange' ,params:{currency:'UST'}});">币币交易</a></li>
            <li><a @click="pageTo('business')">法币交易</a></li>
            <li><a @click="pageTo('myAd')">发布广告</a></li>
            <li><a @click="pageTo('merchantApply')">聚合支付</a></li>
            <li><a @click="pageTo('sponsor')">保荐机构</a></li>
            <li><a @click="pageTo('download')">客户端下载</a></li>
        </ul>
        <!-- <section>
            <div v-if="$store.state.userstatus.userId">
                <router-link :to="'order'">订单</router-link>
                <router-link :to="'property'">资产</router-link>
                <router-link :to="'personal'" v-if="$store.state.userstatus.nickname">{{$store.state.userstatus.nickname}}</router-link>
                <router-link :to="'personal'" v-else>{{$store.state.userstatus.telephone}}</router-link>
            </div>
            <div v-else>
                <router-link :to="'login'">登录</router-link>
                <router-link :to="'register'">注册</router-link>
            </div>
            <span><img src="../assets/images/CN.png" alt="" class="langicon"></span>
        </section> -->
        <Menu mode="horizontal" :theme="theme" class="meunMenu">
        <MenuItem name='4' v-if="!$store.state.userstatus.userId">
                <a @click="pageTo('login')" class="menulink">登录</a>
        </MenuItem>
        <MenuItem name='5' v-if="!$store.state.userstatus.userId">
                <a @click="pageTo('register')" class="menulink">注册</a>
        </MenuItem>
        <!-- <MenuItem name='1' v-if="$store.state.userstatus.userId">
                <a @click="pageTo('order')" class="menulink">订单</a>
        </MenuItem> -->
        <MenuItem name='2' v-if="$store.state.userstatus.userId">
                <a @click="pageTo('property')" class="menulink">资产</a>
        </MenuItem>
        <Submenu name='6' v-if="$store.state.userstatus.userId">
            <template slot="title">
                <a class="menulink">订单</a>
            </template>
                <MenuItem name='6-1'>
                <a @click="pageTo('order')" class="menuitemlink">法币订单</a>
                </MenuItem>
                <MenuItem name='6-2'>
                <a @click="pageTo('atPresent')" class="menuitemlink">当前委托</a>
                </MenuItem>
                <MenuItem name='6-3'>
                <a @click="pageTo('history')" class="menuitemlink">委托历史</a>
                </MenuItem>
        </Submenu>
        <Submenu name='3' v-if="$store.state.userstatus.userId">
            <template slot="title">
                <span class="headericon">{{$common.headIcon()}}</span>
            </template>
                <MenuItem name='3-1'>
                <a @click="pageTo('personal')" class="menuitemlink">个人中心</a>
                </MenuItem>
                <!-- <MenuItem name='3-2'>
                <a class="menuitemlink" @click="$store.state.status.addAddressModal = true">添加提币地址</a>
                </MenuItem> -->
                <MenuItem name='3-3'>
                <a class="menuitemlink" @click="logout">退出</a>
                </MenuItem>
        </Submenu>
        </Menu>
        <Modal
            v-model="$store.state.status.addAddressModal"
            @on-ok="caddAddressOk"
            width="490">
            <p class="confirmTitle">添加地址</p>
            <Form :model="data" label-position="top">
                <FormItem label="地址">
                    <Input v-model="data.address" type="textarea" style="resize:none" :autosize="{minRows: 3,maxRows: 3}" placeholder="输入地址"/>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="data.comment" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="输入备注"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "dark",
      data: {
        address: "",
        comment: "",
        userId: this.$store.state.userstatus.userId
      },
      addAddressapi:this.$common.path+'/user/addExtractAddress'
    };
  },
  methods: {
    toIndex() {
      this.$router.push({ name: "home" });
    },
    pageTo(path){
      this.$router.push({ name: path });
    },
    logout() {
      this.$store.state.userstatus = {};
      this.$common.clearCookie();
      this.toIndex();
    },
    caddAddressOk(){
        this.$http.post(this.addAddressapi,this.$common.sort(this.data)).then(res=>{
            if (res.data.status == 1) {
                this.$Message.success(res.data.message);
            }else{
                this.$Message.error(res.data.message);
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  min-width: 1200px;
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3;
  .logo {
    padding-left: 50px;
    padding-right: 13px;
  }
  ul.menuUl {
    flex: 1;
    li {
      float: left;
      padding: 0 25px;
      a {
        color: #fff;
      }

    }
    a:hover{
    color:red;

   }


  }


  .meunMenu {
    background: transparent;
  }
  //   section {
  //     display: flex;
  //     flex-direction: row;
  //     align-items: center;
  //     justify-content: flex-end;
  //     padding-right: 30px;
  //     a {
  //       color: #fff;
  //       padding: 0 18px;
  //     }
  //   }
  .menulink {
    font-size: 17px;
    color: #fff;
  }
  .menuitemlink {
    color: #333;
  }
  .ivu-menu-submenu {
    .headericon {
      display: inline-block;
    }
  }
a:hover{
    color:red;

}
}
</style>

<style>
@import "../assets/css/modal.css";

.ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
  background: transparent;
}
textarea.ivu-input {
  resize: none;
}
</style>
