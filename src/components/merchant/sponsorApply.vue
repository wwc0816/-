<template>
    <div class="business wrapDiv">
        <div class="merchantapply commonDiv">
            <p class="title">申请保荐机构</p>
            <div v-show="statedata.State||statedata.State == 0">
                <div class="content" v-if="statedata.State == 2 ||statedata.State == 4">
                    <p class="title_l">经营信息</p>
                    <div class="formBox">
                        <p class="label">机构名称</p>
                        <input type="text" v-model="applydata.Name">
                    </div>
                    <div class="formBox">
                        <p class="label">简介</p>
                        <textarea  rows="3" v-model="applydata.Intro"></textarea>
                    </div>
                    <div class="formBox">
                        <p class="label">官方地址</p>
                        <input type="text" v-model="applydata.OfficialUrl">
                    </div>
                    <div class="formBox">
                        <p class="label">保荐人信息</p>
                        <input  type="text" v-model="applydata.PersonInfo">
                    </div>
                    <p class="title_l">联系人信息</p>
                    <div class="formBox">
                        <p class="label">姓名</p>
                        <input type="text" v-model="applydata.ContactName">
                    </div>
                    <div class="formBox">
                        <p class="label">手机号码</p>
                        <input type="text" v-model="applydata.MobilePhone">
                    </div>
                    <div class="formBox">
                        <p class="label">电子邮箱</p>
                        <input type="text" v-model="applydata.email">
                    </div>
                    <Button type="primary" style='display:block;width:240px;height:53px;margin: 60px auto;font-size:18px;' @click="apply()">立即申请</Button>
                </div>
                <div class="content" v-else>
                    <img src="../../assets/images/applysuccess.png" alt="">
                    <h1>已成功申请保荐机构</h1>
                    <p class="desc">根据产品要求提交资料，审核周期为1-3工作日</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                statedata: {
                    State:''
                },
                applydata: {
                    userId: this.$store.state.userstatus.userId,
                    Intro: "",
                    PersonInfo: "",
                    OfficialUrl:"",
                    email: "",
                    MobilePhone: "",
                    ContactName: "",
                    withdrawNoticeUrl: "",
                    Name: "",
                    rechargeNoticeUrl: ""
                },
                applyapi: this.$common.coinspath + "v1/user/sponsor/apply",/*产品姓名  产品说明  接口*//*姓名 手机号   接口*/

                stateapi:
                this.$common.coinspath +
                "/v1/user/merchant/info/" +
                this.$store.state.userstatus.userId,//获取商家信息
            };


        },
        created() {
            if (!this.$store.state.userstatus.userId) {
                this.$router.push({ name: "login" });
            }else{
                this.getstate();
            }
            console.log(this.stateapi);
            console.log(this.applyapi);
        },
        methods: {
            getstate() {
                this.$axios.post(this.stateapi/*this.$common.sort(this.applydata)*/)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.statedata = res.data.data;
                            console.log(this.statedata);

                            if(this.statedata.State == 1){
                                this.$router.push({ name: 'sponsorAccount' });
                            }
                        } else if(res.data.status == 0){
                            this.statedata.State = 4;
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
                console.log(this.stateapi);
            },
            apply() {
                this.$http
                    .post(this.applyapi, this.$common.sort(this.applydata))
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$Message.success('提交成功，请等待审核');
                            this.getstate();
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
    $colorgray: #627ba9;
    $colorbule: #3a82fa;
    $bordercolor: #2c3753;
    $inputcolor: #141522;
    $bgcolor: #191b2a;
    .merchantapply {
        padding: 30px 0;
    .title {
        display: flex;
        height: 60px;
        align-items: center;
        justify-content: space-between;
        background: #212336;
        padding: 0 22px;
        font-size: 18px;
    }
    .content {
        background: $bgcolor;
        padding: 0 40px 40px 40px;
    .title_l {
        font-size: 18px;
        color: $colorbule;
        padding-top: 40px;
    }
    .formBox {
        width: 1043px;
        margin: auto;
        padding-bottom: 20px;
    .label {
        padding: 30px 0;
        color: $colorgray;
    }
    textarea {
        width: 100%;
        background: $inputcolor;
        border: 1px solid $bordercolor;
        resize: none;
        outline: none;
        color: inherit;
        padding: 10px 20px;
        line-height: 25px;
    }
    input {
        width: 100%;
        height: 55px;
        background: $inputcolor;
        border: 1px solid $bordercolor;
        outline: none;
        color: inherit;
        padding: 0 20px;
    }
    }
    img {
        display: block;
        padding-top: 132px;
        padding-bottom: 10px;
        margin: auto;
    }
    h1 {
        text-align: center;
        font-size: 30px;
        padding: 34px 0;
    }
    p.desc {
        text-align: center;
        font-size: 18px;
    }
    }
    }
</style>

<style>
</style>
