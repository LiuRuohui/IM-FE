<script setup>
import Login from "./components/Login.vue"
</script>

<template>
  <!-- <div>
    <router-link to="/">home</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/info">info</router-link>
    <router-link to="/updateInfo">updateInfo</router-link>
    <router-link to="/register">register</router-link>
    <router-link to="/main">main</router-link>
    <router-link to="/forgetPasswd">forgetPasswd</router-link>
  </div>-->
  <!-- <keep-alive>
    <router-view></router-view>
  </keep-alive>-->
  <login></login>
</template>

<style>
.page {
  height: 100vh;
  background-color: hsla(190, 100%, 95%, 0.5);
}
</style>
