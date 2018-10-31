<template>
    <div class="upload" @click="selectfile1">
        <img v-if="$store.state.qiniu.cardFaceUrl" :src="$store.state.qiniu.cardFaceUrl" alt="">
        <section v-else>
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>{{uploaddata.decs}}</p>
        </section>
        <input type="file" style="display:none;" id="fileElem1" name="file" @change="PreviewImage"  />
    </div>
</template>

<script>
import * as qiniu from "qiniu-js";

export default {
  props: ["uploaddata"],
  methods: {
    selectfile1() {
      var fileElem = document.getElementById("fileElem1");
      fileElem.click();
    },
    PreviewImage(event) {
      var file = event.target.files[0];
      var key = file.name;
      var size = file.size;
      var token = this.$store.state.qiniu.token;
      var putExtra = {
        fname: key,
        params: {},
        mimeType: null
      };
      var observable = qiniu.upload(file, key, token, putExtra);
      var _this = this;
      var observer = {
        next(res) {},
        error(err) {
          _this.$Message.error("上传失败，请稍后再试");
        },
        complete(res) {
          _this.$store.state.qiniu.cardFaceUrl = _this.$store.state.qiniu.path + key;
        }
      };
      var subscription = observable.subscribe(observer);
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 198px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  color: #000000;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 16px;
      padding-top: 10px;
    }
  }
}
.upload:hover {
  border: 1px dashed #2d8cf0;
}
</style>

<style>
</style>
