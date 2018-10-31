<template>
  <div class="wrapper exchangewrapper">
    <topHeader></topHeader>
    <div class="main">
      <router-view />
    </div>
    <bottomFooter></bottomFooter>
  </div>
</template>

<script>
import topHeader from '../header.vue'
import bottomFooter from '../bottomFooter.vue'

export default {
  data () {
    return {
      
    }
  },
  components:{
    topHeader,
    bottomFooter
  }
}
</script>

<style lang="scss" scoped>

</style>
<style>
.exchangewrapper{
  min-width: 1880px;
}
</style>
