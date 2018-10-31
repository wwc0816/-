<template>
  <div id="exchange">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Exchange'
}
</script>

<style>
@import './assets/css/rest.css';
@import './assets/scss/static.scss';
body{
  font-family:'Microsoft YaHei', Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #d6e0f2;
  position: absolute;
  min-height: 100%;
  width: 100%;
  min-width: 1880px;
}
</style>

