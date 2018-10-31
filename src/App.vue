<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
  width: 100%;
  min-height: 100%;
}
</style>

