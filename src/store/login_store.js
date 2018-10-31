import $common from '../assets/js/common';

export default {
    state: {
        nickname:$common.getCookie('nickname'), 
        token:$common.getCookie('token'),
        telephone:$common.getCookie('telephone'),
        userId:$common.getCookie('userId'),
        isPayMargin:$common.getCookie('isPayMargin'), //是否已缴纳保证金
        isSetPayPassword:$common.getCookie('isSetPayPassword'), //是否设置资金密码
        isRealAuth:$common.getCookie('isRealAuth'), //是否实名认证
        isSeniorAuth:$common.getCookie('isSeniorAuth'), //是否高级认证
        isSetNickname:$common.getCookie('isSetNickname'), //是否设置昵称
        idNumber:$common.getCookie('idNumber'), //身份证号
        name:$common.getCookie('name'), //身份证号
        isSetBank:$common.getCookie('isSetBank'), //是否开启银行卡
        isSetAlipay:$common.getCookie('isSetAlipay'),//是否开启支付宝
        isSetWeixin:$common.getCookie('isSetWeixin'),//是否开启微信
        orderTotal:$common.getCookie('orderTotal'),//交易笔数
        tradeRate:$common.getCookie('orderTotal'),//成交率
        headIcon:$common.headIcon(),//获取头像文字
    }
}

