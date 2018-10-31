<template>
    <div class="whitebg wrapDiv">
        <div class="ownDiv commonDiv">
            <div class="ownHead">
                <section>
                    <span class="headericon" v-if="data.nickname">{{data.nickname.substr(0, 1)}}</span>
                    <span>{{data.nickname}}</span>
                </section>
                <section>
                    <div>
                        <p v-if="data.isPayMargin">{{data.isPayMargin==1?'1000':'0'}}{{$store.state.name.currencyname}}</p>
                        <p>商家保证金</p>
                    </div>
                    <div>
                        <p>{{data.tradeRate}}%</p>
                        <p>完成率</p>
                    </div>
                    <div>
                        <p>{{data.orderTotal}}次</p>
                        <p>总成单</p>
                    </div>
                    <!-- <div>
                        <p>9999次</p>
                        <p>30日成单</p>
                    </div>
                    <div>
                        <p>0.44分钟</p>
                        <p>平均放行</p>
                    </div> -->
                </section>
            </div>
            <div class="ownStatus">
                <p>注册时间 : {{times}}</p>
                <section>
                    <span>
                        手机认证
                        <i class="iconStatus icon_priority"></i>
                    </span>
                    <span>
                        实名认证
                        <i class="iconStatus icon_priority" v-if="data.isRealAuth == 1"></i>
                        <i class="iconStatus icon_unpriority" v-else></i>
                    </span>
                    <span>
                        高级认证
                        <i class="iconStatus icon_priority" v-if="data.isSeniorAuth == 1"></i>
                        <i class="iconStatus icon_unpriority" v-else></i>
                    </span>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            apiurl: this.$common.path+ '/user/getUserBase',
            ownuserid:this.$route.params.id,
            data:{},
            times:''
        }
    },
    created(){
        this.getinfo();
    },
    methods:{
        getinfo(){
            this.$http.get(this.apiurl,{params:this.$common.sort({userId:this.ownuserid})}).then(res=>{
                if (res.data.status == 1) {
                    this.data = res.data.data;
                    this.times = this.$common.timeformat(this.data.registerAt);
                } else {
                    this.$Message.error(res.data.message);
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.ownDiv {
  font-size: 14px;
  color: #010101;
  height: 500px;
  .ownHead {
    display: flex;
    height: 70px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ced8eb;
    margin-top: 50px;
    section {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    section:nth-child(1) {
      span:nth-child(2) {
        padding-left: 13px;
      }
    }
    section:nth-child(2) {
      div {
        width: 75px;
        text-align: center;
        margin-left: 40px;
        p:nth-child(1) {
          padding-bottom: 13px;
        }
        p:nth-child(2) {
          color: #999999;
        }
      }
    }
  }
  .ownStatus {
    display: flex;
    height: 54px;
    justify-content: space-between;
    align-items: center;
    p {
      color: #999;
    }
    section {
      span {
        padding-left: 42px;
        i{
            margin-left: 8px;
        }
      }
    }
  }
}
</style>

<style>
</style>
