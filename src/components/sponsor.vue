<template>
    <div class="sponsor">
        <swiper ></swiper>
        <div class="sponsor_Sor" >
            <i></i>
            <span>保荐机构</span>
            <a @click="pageTo('sponsorAccount')">
                <img src="../assets/images/立即申请成为保荐机构.png" alt="">
            </a>
            <div class="sponsor_Ul" >
            <div v-for="item in todo">
                <img :src="item.LogoUrl">
                <ul>
                    <li>机构名称:{{item.Name}}</li>
                    <li>机构名称:{{item.Intro}}</li>
                    <li>保健项目:{{item.Coins}}</li>
                    <li>联系方式:{{item.Email}}</li>
                </ul>
            </div>
                </div>
        </div>
    </div>
</template>

<script>
    import swiper from "./order/swiper.vue";
    export default {
        data(){
            return {
                apiurl: this.$common.coinspath + "/v1/user/sponsor/all",
                todo:[]
            }
        },
        created(){
            this.getApiUrl();
        },
        methods:{
            pageTo(path){
                this.$router.push({ name: path });
            },
            getApiUrl(){
                this.$http.get(this.apiurl,this.$common.sort(this.todo))
                    .then(res=>{
                        console.log(res.data);
                        this.todo=res.data.data
                    })
            },

        },
        components: {swiper},
        computed: {}
    }
</script>


<style lang="scss"  scoped>
    .sponsor {
        width: 100%;

    .sponsor_Sor {
        width: 1200px;
        margin: 0 auto;
        height: 1740px;

    span {
        height: 88px;
        font-size: 18px;
        color: #000000;
        line-height: 88px;
        margin-left: 10px
    }

    i {
        display: inline-block;
        background: url("../assets/images/椭圆2拷贝.png") no-repeat no-repeat;
        width: 21px;
        height: 21px;
        vertical-align: text-bottom
    }

    a {
        float: right;
        margin-top: 22px;
    }

    }
    .sponsor_Ul {
        width: 100%;

    div {
        float: left;
        margin: 9px 9px;
        padding-top: 24px;
        width: 579px;
        height: 174px;
        background: #f1f2f7;
    }

    img {
        float: left;
        width: 174px;
        height: 47px;
    }
    ul {
        float: left;
        margin-left: 58px;
    li {
        height: 35px;
        line-height: 24px;
        font-size: 14px;
        color: #000000;
    }

    }
    }
    }



</style>