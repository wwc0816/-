<template>
    <div>
        <div class="merchant_title">
            <span class="colorbule"><a :href="$common.host+'/接口文档.docx'" download='接口文档'>接口文档</a></span>
        </div>
        <div class="account_list">
            <div class="list_head">
                <span>币种</span>
            </div>
            <div class="list_li">
                <span>UST</span>
            </div>
            <div class="list_li">
                <span>WE</span>
            </div>
            <div class="list_li">
                <span>ETH</span>
            </div>
            <div class="list_li">
                <span>BTC</span>
            </div>
        </div>
        <a class="submitcoins" @click="pageTo('coinsApply')">提交自有币种？</a>
    </div>
</template>

<script>
export default {
    data(){
        return{
            coins:[
                {
                    name:'UST'
                },
                {
                    name:'BTC'
                },
                {
                    name:'ETH'
                },
                {
                    name:'WE'
                }
            ]
        }
    },
    methods:{
        pageTo(path) {
            this.$router.push({ name: path });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/accountList.scss";
@import "../../assets/scss/merchant.scss";
.submitcoins{
    display: block;
    color: #3a82fa;
    padding-bottom: 20px;
    padding-left: 24px;
    padding-top: 100px; 
}
</style>

<style>
</style>
