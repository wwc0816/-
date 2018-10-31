import md5 from 'js-md5';

export default {
    // path:'http://192.144.188.161',
    // path: 'http://otc.api.cnwan.com',
    path: window.location.protocol + '//otc.api.coinsup.top',
    coinspath: window.location.protocol + '//api.exchange.coinsup.top',
    host: window.location.protocol +'//'+location.host,
    randomString(len) {
        len = len;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    MathRand() {
        var Num = "";
        for (var i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    },
    sort(obj) {
        obj['nonce'] = this.randomString(6);
        obj['timestamp'] = new Date().getTime();
        var newkey = Object.keys(obj).sort();
        var newObj = {};
        for (var i = 0; i < newkey.length; i++) {
            newObj[newkey[i]] = obj[newkey[i]];
        }
        var val = '';
        var testkeys = 'Yjdi83uY33u10Iand001Bv221JJdhiiePoe01Ij573';
        //     Object.keys(newObj).forEach(function(key){
        //          if(key == Object.keys(newObj)[Object.keys(newObj).length-1]){
        //            val += key + '=' + newObj[key] + testkeys
        //          }else{
        //             val += key + '=' + newObj[key] + '&'
        //          }
        //    });
        for (var i in newObj) {
            if (i == Object.keys(newObj)[Object.keys(newObj).length - 1]) {
                val += i + '=' + newObj[i] + testkeys
            } else {
                val += i + '=' + newObj[i] + '&'
            }
        }
        val = md5(val);
        newObj['sign'] = val.toUpperCase();
        return newObj;
    },
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        } else {
            return null;
        }
    },
    setCookie(name, value) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    },
    headIcon() {
        if (this.getCookie('nickname')) {
            return this.getCookie('nickname').substr(0, 1);
        } else {
            return 'C';
        }
    },
    clearCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    },
    Format(fmt) { //author: meizz 
        var datetiem = new Date();
        var o = {
            "M+": datetiem.getMonth() + 1, //月份 
            "d+": datetiem.getDate(), //日 
            "h+": datetiem.getHours(), //小时 
            "m+": datetiem.getMinutes(), //分 
            "s+": datetiem.getSeconds(), //秒 
            "q+": Math.floor((datetiem.getMonth() + 3) / 3), //季度 
            "S": datetiem.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetiem.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    clearNoNum(val,digit) {
        val = val.toString();
        val = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        val = val
            .replace(".", "$#$")
            .replace(/\./g, "")
            .replace("$#$", ".");
        // val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        var digit= digit || 8;
        var reg=new RegExp("([0-9]+\.[0-9]{"+digit+"})[0-9]*");
        val = val.replace(reg,"$1");
        if (val.indexOf(".") < 0 && val != "") {
            val = parseFloat(val);
        }
        return val
    },
    number_format(number, decimals, dec_point, thousands_sep) {
        /*
        * 参数说明：
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
 
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? '' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.floor(n * k) / k;
            };
        s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        console.log(s)
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }
 
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    },
    timeformat(time){
        var timess = time;
        var d = new Date(timess);
        var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
        return times;
    }
}