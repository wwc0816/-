<template>
    <div class="ChatWindow">
                    <div class="ChatHeader">
                        <span class="headericon" v-if="name">{{name.substr(0, 1)}}</span>
                        <section>
                            <span>{{name}}</span>
                            <span>30日成单 : 1234</span>
                        </section>
                        <span><img src="../../assets/images/telphone.png" alt=""></span>
                    </div>
                    <div class="ChatMain">
                        <section v-for='(item, index) in datalist' :key="index" :class="{system:item.type == 0,buyer:item.type == 1&&item.fromUserId == $store.state.userstatus.userId,seller:item.type == 1&&item.fromUserId != $store.state.userstatus.userId}">
                            <p class="time" v-if="item.type == 0">{{item.createdAt}}</p>
                            <p class="hint" v-if="item.type == 0">{{item.content}}</p>
                            <span class="headericon" v-if="item.type == 1&&item.fromUserId != $store.state.userstatus.userId">{{item.fromNickname.substr(0, 1)}}</span>
                            <div class="message">
                                <p class="messagemain">{{item.content}}</p>
                                <p class="messagetime">{{item.createdAt}}</p>
                            </div>
                            <span class="headericon" v-if="item.type == 1&&item.fromUserId == $store.state.userstatus.userId">{{$store.state.userstatus.nickname.substr(0, 1)}}</span>
                        </section>
                    </div>
                    <div class="ChatInput">
                        <Input v-model="socketdata" type="textarea" :autosize="{minRows: 1,maxRows: 3}" placeholder="输入信息，回车发送" @on-enter="sendMessage"/>
                        <span @click="sendMessage"><img src="../../assets/images/copylink.png" alt=""></span>
                    </div>
                </div>
</template>

<script>
import io from "socket.io-client";
// var socket = io("http://otc.api.cnwan.com:1600");

export default {
  data() {
    return {
      socketdata: "",
      datalist: [],
      // socket : io("http://otc.api.cnwan.com:1600")
      socket : io(this.$common.path + ':1600')
    };
  },
  props: ["orderId", "name"],
  created() {},
  mounted() {
      var _this = this;
    this.socket.on("connect", () => {
      console.log('connect success')
      this.socket.emit("order.getunread");
    });
    this.socket.on("order.unread", function(data) {
      var data = JSON.parse(data);
      for (var i = 0; i < data.length; i++) {
        _this.datalist.push(data[i]);
      }
    });
    this.socket.on("order.message", function(data) {
      var data = JSON.parse(data);
      _this.datalist.push(data);
    });
    this.socket.on("disconnect", function() {
      setTimeout(function() {
        this.socket.emit("init", token);
      }, 3000);
    });
    this.init(this.$store.state.userstatus.token);
  },
  methods: {
    sendMessage() {
      if (this.socketdata.length <= 0) {
        return;
      }
      this.datalist.push({
        type: 1,
        fromUserId: this.$store.state.userstatus.userId,
        fromNickname: this.$store.state.userstatus.nickname,
        content: this.socketdata,
        createdAt: this.$common.Format("yyyy-MM-dd hh:mm:ss")
      });
      this.socket.emit("order.message", this.orderId, this.socketdata);
      this.socketdata = "";
    },
    getUnreadMessage() {
      this.socket.emit("order.unread", this.$store.state.userstatus.token);
    },
    init(token) {
      this.socket.emit("init", token);
    }
  },
  beforeDestroy(){
    this.socket = null;
  }
};
</script>
<style lang="scss" scoped>
.ChatWindow {
  display: flex;
  flex-direction: column;
  width: 386px;
  height: 658px;
  border: 1px solid #f1f1f1;
  box-shadow: 0 0 45px #cccccc;
  margin-right: 40px;
  .headericon {
    display: inline-block;
    text-align: center;
    background: #3a82fe;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 43px;
    height: 43px;
    line-height: 43px;
    border-radius: 43px;
  }
  .ChatHeader {
    display: flex;
    height: 82px;
    justify-content: space-between;
    align-items: center;
    padding-left: 14px;
    padding-right: 30px;
    border-bottom: 1px solid #eaeaea;
    section {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      padding-left: 12px;
      span:nth-child(1) {
        font-size: 13px;
        color: #130000;
        padding-bottom: 10px;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .ChatMain {
    flex: 1;
    overflow: scroll;
    padding-top: 30px;
    p.time {
      text-align: center;
      font-size: 14px;
      color: #999;
      padding: 20px 0 17px 0;
    }
    p.hint {
      font-size: 14px;
      text-align: center;
      color: #010101;
      padding-bottom: 25px;
    }
    section {
      position: relative;
      display: flex;
      width: 100%;
      align-items: flex-start;
      justify-content: center;
      padding-bottom: 27px;
      .headericon {
        position: absolute;
      }
      .message {
        width: 259px;
        background: #eaeaea;
        border-radius: 5px;
        .messagemain {
          font-size: 13px;
          color: #2d4a65;
          padding: 10px;
          line-height: 15px;
          word-wrap:break-word;
        }
        .messagetime {
          font-size: 11px;
          color: #999999;
          padding: 0px 10px 10px 10px;
          text-align: right;
        }
      }
    }
    section.system {
      flex-direction: column;
      align-items: center;
      padding-bottom: 0px;
    }
    section.seller {
      .headericon {
        top: -10px;
        left: 14px;
      }
    }
    section.buyer {
      .headericon {
        top: -10px;
        right: 14px;
      }
    }
  }
  .ChatInput {
    height: 72px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding-right: 30px;
      width: 50px;
    }
  }
}
</style>

<style>
</style>
