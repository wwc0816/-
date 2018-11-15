<template>
    <div v-show="statedata.State||statedata.State == 0">
        <div class="account_top" v-if="statedata.State == 1">
            <section>
                <span>保荐机构</span>


            </section>
            <section>
                <a @click="pageTo('merchant')">保荐上币</a>
                <a @click="pageTo('sponsorRecord')">财务记录</a>
                <a @click="$store.state.status.addAddressModal = true">提币地址管理</a>
            </section>
        </div>
        <div class="account_top" v-else>
            <span>保荐机制</span>
        </div>
        <div class="account_list" v-if="statedata.State == 1">
            <div class="list_head">
                <span>币种</span>
                <span>可用</span>

                <span>累计保荐盈利</span>
                <span>操作</span>
            </div>
            <div class="list_li" v-for="(item, index) in data" :key="index">
                <span>{{item.currency}}</span>
                <span>{{item.thawAmount.toFixed(8)}}</span>

                <span>{{item.cny.toFixed(2)}}</span>
                <span>

                    <a @click="openwithdraw(item.currency,item.thawAmount)">提币</a>
                    <Dropdown placement="bottom-end" @on-click="changeMenu" @on-visible-change="changevisible(item.currency)">

                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(item , index) in marketdic" :key="index" v-bind:name="item.TokenPair">
                              <span @click="Topage(item.Currency)">{{item.TokenPair}}</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </span>
            </div>
        </div>
        <div class="nomerchant" v-else>
            <p class="title">如何申请保荐机制</p>
            <p>为规范项目方上币行为，提高上币的项目和保荐机构的水平，保护投资人的权益，活跃数字加密货币市场，根据市场经验，特制订此机制，以便更多的优质项目方收到更多权益。</p>
            <p>保荐机构履行保荐职责应当指定保荐代表人负责保荐工作</p>
            <p>一、保荐机构负责项目方发行的主承销工作，对公开上币的项目方进行审查，并根据Coinsup提供保荐意见</p>
            <p>二、项目方及其项目负责人，经理，懂事和其他高级管理人员等相应的签名人员，应当遵守Coinsup规则，并配合保荐机构履行保荐职责。保荐机构及其保荐代表人履行保荐职责，不能减轻或者免除发行人及其高管人员，中介机构及其签名人员的责任。</p>
            <p>三、Coinsup会依照自己的规则监管项目方，同时也将对保荐机构进行定期检查及审核，不符合标准或有违规操作的保荐机构，将取消其保荐资格
            </p>
            <br>
            <br>
            <p>以下为保荐机构和保荐人登记的注册登记</p>
            <p>  一、有以下情形之一，不得注册为保荐机构</p>
            <p> （1）公司治理结构存在重大缺陷，风险控制制度不健全或未有效执行；</p>
            <p> （2）最近12个月有不良记录；</p>
            <p> （3）违反其他Coinsup规定的机构；</p>
            <p>二、个人申请保荐人，需要在其已成为保荐机构的公司任职，并至少在该企业任职1年以上，并需要有保荐机构负责人，经理，董事等签名人员的推荐；</p>
            <p>三、保荐机构和个人在登记注册时，申请的文件需要清晰真实，准确完整。如部分内容出现重大变更，需提前15日提交至Coinsup重新进行审核；</p>
            <p>四、如违反Coinsup保荐机构及个人的管理规范，Coinsup将从保荐机构及个人名单中除名；</p>
            <br>
            <br>
            <p>保荐机构的职责</p>
            <p>一、保荐机构应当尽职推荐项目方顺利上币，项目方上币成功好，应当持续监督项目方履行规范运作，信守承诺，信息披露等义务；</p>
            <p>二、保荐机构对首次上币的项目方，应按规定进行上币前辅导，上币成功后，也至少对首次上币方进行为期6个月的辅导；</p>
            <p>三、项目方经辅导，审查满足下列要求，保荐机构可以推荐其上币；</p>
            <p>（1）符合上线准则，具备可持续开发能力；</p>
            <p>（2）产品上线后，发币成功，并无功能性BUG；</p>
            <p>（3）项目方，实际控制人，负责人均为实际自然人，并有能力解决项目问题；</p>
            <p>（4）项目推进，治理，运营不存在重大缺陷；</p>
            <p>（5）高管人员熟知相应的知识与运营技巧；</p>
            <p>四、保荐机构推荐项目方上币，对项目方及其发起人、大股东、实际控制人进行尽职调查、审慎核查，根据发行人的委托，组织编制申请文件并出具推荐文件</p>
            <p>五、保荐机构对发行人公开发行募集文件中无中介机构及其签名人员专业意见支持的内容，应当进行充分、广泛、合理的调查，对发行人提供的资料和披露的内容进行独立判断，并有充分理由确信所作的判断与发行人公开发行募集文件的内容不存在实质性差异。</p>
            <p>六、保荐机构对发行人公开发行募集文件中有中介机构及其签名人员出具专业意见的内容，应当进行审慎核查，对发行人提供的资料和披露的内容进行独立判断，保荐机构所作的判断与中介机构的专业意见存在重大差异的，应当对有关事项进行调查、复核，并可聘请其他中介机构提供专业服务。</p>
            <p>七、保荐机构应当在推荐文件中就下列事情做出承诺；</p>
            <p>（1）有充分理由确信项目方符合“保荐机构的职责”第三条；</p>
            <p>（2）有充分理由确信项目方申请文件不存在虚假信息；</p>
            <p>（3）有充分理由确信项目方的负责人在上币申请中表达意见的依据充分合理；</p>
            <p>（4）保证所指定的保荐代表人及本保荐机构的相关人员已勤勉尽责，对项目方申请文件进行了尽职调查、审慎核查；</p>
            <p>八、项目方在持续督导期间出现下列情形之一的，Coinsup自确认之日起三个月内不再受理相关保荐代表人具体负责的推荐：</p>
            <p>（1）实际盈利低于盈利预测达20%以上；</p>
            <p>（2）项目方上币后，产品出现重大功能性BUG；</p>
            <p>（3）项目方上币后，再其保荐机构监督期呢，其运营方案，实施方案均出现重大失误；</p>
            <br>
            <br>
            <p>保荐机构，永远获取项目方交易手续费20%</p>

            <Button type="primary" style='display:block;width:240px;height:53px;margin: 60px auto;font-size:18px;' @click="pageTo('sponsorApply')">立即申请</Button>
        </div>
        <!-- 充值 -->
        <Modal
                v-model="rechargeModal"
                width="490">
            <p class="confirmTitle">充值{{rechargecurrency}}</p>
            <p class="linktitle">请将{{rechargecurrency}}充值到如下地址（扫描二维码获取地址）</p>
            <p class="linklocation">{{rechargeAddress}}</p>
            <a class="copycode" @click="downloadcode">复制二维码</a>
            <div class="QRcode">
                <vue-qr :text="rechargeAddress" :size="147" :margin="0"></vue-qr>
            </div>
            <ul class="rechargeDesc">
                <li>请勿向上述地址充值任何非{{rechargecurrency}}资产，否则资产将不可找回。</li>
                <li>最小充值金额：1.000000{{rechargecurrency}}，小于最小金额的充值不会上账且无法退回。</li>
                <li>您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过公告或短信通知您。</li>
                <li>请务必确认手机及浏览器安全，防止信息被篡改或泄露。</li>
            </ul>
            <div slot="footer"></div>
        </Modal>
        <!-- 提币 -->
        <Modal
                v-model="withdrawModal"
                width="490"
                @on-ok="withdrawOk"
        >
            <p class="confirmTitle">{{withdrawcurrency}}提币</p>
            <Form :model="withdrawData" label-position="top">
                <FormItem>
                    <p class="title_p"><span>提币地址</span><img src="../../assets/images/address.png" @click="openaddresslist"></p>
                    <Input v-model="withdrawData.toAddress" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="输入提币地址"/>
                </FormItem>
                <FormItem label="数量">
                    <i-input v-model="withdrawData.amount" placeholder="最小提币数量1" class="amount" @on-blur="test(withdrawData.amount)"></i-input>
                    <p class="amountbtn"><span class="currency">{{withdrawcurrency}}</span><span class="allwithdraw" @click="withdrawData.amount = amount">全部</span></p>
                </FormItem>
                <FormItem label="资金密码">
                    <i-input v-model="withdrawData.payPassword" placeholder="请输入资金密码" type="password"></i-input>
                </FormItem>
            </Form>
            <p class="withdraw_p"><span>手续费<i>(总提币数量{{this.free*100}}%)</i></span><span>{{cost}}{{withdrawcurrency}}</span></p>
            <p class="withdraw_p"><span>到账数量</span><span>{{withdrawData.amount - cost}}{{withdrawcurrency}}</span></p>
        </Modal>
        <!-- 选择提币地址 -->
        <Modal
                v-model="addresslistModal"
                width="490"
                @on-ok="addresslistOk"
                @on-cancel="addresslistCancel"
                okText="添加地址"
        >
            <p class="confirmTitle">{{withdrawcurrency}}提币地址</p>
            <ul class="addresslist">
                <li v-for="(item, index) in addressList" :key="index">
                    <section @click="selectaddress(item.address)">
                        <p>{{item.comment}}</p>
                        <p>{{item.address}}</p>
                    </section>
                    <img src="../../assets/images/cancel.png" @click="deleteaddress(item.address)">
                </li>
            </ul>
        </Modal>

    </div>
</template>

<script>
    import VueQr from "vue-qr";

    export default {
        data() {
            return {
                status: 1,
                apiurl: this.$common.coinspath + "/v1/user/money/coin",// 交易账户资产
                totalapi: this.$common.coinspath + "/v1/user/money/coin_total",//交易账户总资产
                marketdicapi: this.$common.coinspath + "/v1/marketdic",// 获取行情目录
                marketdataapi: this.$common.coinspath + "/v1/marketdata/",//获取行情数据（首页）
                rechangeapi:
                this.$common.coinspath + "/v1/user/coin/query/recharge_address",//获取充币地址
                freeapi: this.$common.coinspath + "/v1/user/coin/withdraw/fee",//提币费用获取
                total: 0,
                data: [],
                totaldata: {
                    currencyAcount: 0,
                    cny: 0
                },
                marketdic: [],
                rechargeModal: false,
                withdrawcurrency: "",
                rechargecurrency: "",
                rechargeAddress: "",
                withdrawModal: false,
                withdrawData: {
                    userId: this.$store.state.userstatus.userId,
                    toAddress: "",
                    currency: "",
                    amount: 0,
                    payPassword: ""
                },
                withdrawapi: this.$common.coinspath + "/v1/user/coin/withdraw",//提币接口
                amount: 0,
                cost: 0,
                addresslistModal: false,
                addresslistapi: this.$common.path + "/user/getExtractAddress",//获取提币地址
                addressList: [],
                deleteaddreddapi: this.$common.path + "/user/removeExtractAddress",//删除提币地址
                free: 0,
                stateapi:
                this.$common.coinspath +
                "/v1/user/merchant/info/" +
                this.$store.state.userstatus.userId,//获取商家信息
                statedata: {
                    State:''
                }
            };
        },
        created() {
            this.getstate();
            this.getdatalist();
            this.gettotal();
        },
        components: { VueQr },
        methods: {
            getstate() {
                this.$axios.get(this.stateapi).then(res => {
                    if (res.data.status == 1) {
                        this.statedata = res.data.data;
                    } else {
                        this.statedata.State = 4;
                    }
                });
            },
            changeMenu(val) {},
            changevisible(currency) {
                this.getmarketdic(currency);
            },
            test(val) {
                this.withdrawData.amount = this.$common.clearNoNum(val);
            },
            pageTo(path) {
                this.$router.push({ name: path });
            },
            Topage(currency){
                this.$router.push({ name: 'exchange' ,params:{currency:currency}});
            },
            getdatalist() {
                this.$axios
                    .get(this.apiurl, {
                        params: this.$common.sort({
                            userId: this.$store.state.userstatus.userId
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.data = res.data.data;
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            },
            gettotal() {
                this.$axios
                    .get(this.totalapi, {
                        params: this.$common.sort({
                            userId: this.$store.state.userstatus.userId
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.totaldata = res.data.data;
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            },
            getfree() {
                this.$axios
                    .get(this.freeapi, {
                        params: this.$common.sort({
                            cointype: this.withdrawcurrency
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.free = res.data.data.ServiceFee;
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            },
            getmarketdic(coinstype) {
                this.marketdic = [];
                this.$axios.post(this.marketdataapi + coinstype).then(res => {
                    if (res.data.status == 1) {
                        this.marketdic = res.data.data;
                    } else {
                        this.$Message.error(res.data.message);
                    }
                });
            },
            openrechange(currency) {
                this.rechargeModal = true;
                this.rechargecurrency = currency;
                this.$axios
                    .get(this.rechangeapi, {
                        params: this.$common.sort({
                            userId: this.$store.state.userstatus.userId,
                            currency: currency
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.rechargeAddress = res.data.data.Address;
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            },
            downloadcode() {
                var oQrcode = document.querySelector(".QRcode img");
                var url = oQrcode.src;
                var a = document.createElement("a");
                var event = new MouseEvent("click");
                a.download = "充值" + this.rechargecurrency + "二维码";
                a.href = url;
                a.dispatchEvent(event);
            },
            openwithdraw(currency, amount) {
                this.withdrawModal = true;
                this.withdrawcurrency = currency;
                this.withdrawData.currency = currency;
                this.amount = amount;
                this.getfree();
            },
            withdrawOk() {
                if (this.$store.state.userstatus.isSetPayPassword == 0) {
                    this.$Message.error("请先设置提币密码");
                    return false;
                }
                this.$axios
                    .post(this.withdrawapi, this.$common.sort(this.withdrawData))
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$Message.success(res.data.message);
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            },
            openaddresslist() {
                this.addresslistModal = true;
                this.withdrawModal = false;
                this.$http
                    .get(this.addresslistapi, {
                        params: this.$common.sort({
                            userId: this.$store.state.userstatus.userId
                        })
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.addressList = res.data.data.address;
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            },
            selectaddress(address) {
                this.withdrawData.toAddress = address;
                this.addresslistCancel();
            },
            addresslistOk() {
                this.addresslistModal = false;
                this.$store.state.status.addAddressModal = true;
            },
            addresslistCancel() {
                this.addresslistModal = false;
                this.withdrawModal = true;
            },
            deleteaddress(address) {
                this.$http
                    .post(
                        this.deleteaddreddapi,
                        this.$common.sort({
                            userId: this.$store.state.userstatus.userId,
                            address: address
                        })
                    )
                    .then(res => {
                        if (res.data.status == 1) {
                            this.openaddresslist();
                            this.$Message.success(res.data.message);
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    });
            }
        },
        watch: {
            withdrawData: {
                handler(curVal, oldVal) {
                    this.cost = this.$common.clearNoNum(
                        parseFloat(curVal.amount) * this.free
                    );
                },
                deep: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/accountList.scss";
    @import "../../assets/scss/accountmodel.scss";
    .nomerchant {
    p {
        line-height: 25px;
        padding-left: 20px;
    }
    p.title {
        padding-top: 40px;
        padding-bottom: 40px;
    }
    }
</style>
