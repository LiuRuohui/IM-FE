<script setup>

import axios from 'axios'
//consoleimport Connection from './composables/ws'

import $root from './composables/protobuf/protobuf'
import protobuf from 'protobufjs'

import {userInfo} from './composables/api'
import WelcomingPage from './components/WelcomingPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import LoginPage from './components/LoginPage.vue'
import MainPage from './components/MainPage.vue'
import UpdateInformation from './components/UpdateInformation.vue'

function Register(){
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const url = 'http://im.jinzh.me/register';
    var params = new URLSearchParams();
    params.append('account', 'liu123456'); //你要传给后台的参数值 key:value
    params.append('passwd', 'liuruohui123');
    axios({
      method: 'post',
      url: url,
      data: params
    }).then((res) => {
      console.log(res)
    });
}
function login(){
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const url = 'http://im.jinzh.me/login';
    var params = new URLSearchParams();
    params.append('account', 'liu123456'); //你要传给后台的参数值 key:value
    params.append('passwd', 'liuruohui123');
    axios({
      method: 'post',
      url: url,
      data: params
    }).then((res) => {
      console.log(res)
      let token = res.data
      console.log(token)
      localStorage.setItem("token",res.data)
      userInfo.get(`${localStorage.getItem("token")}`).then(
        response => {
          console.log(response)
        },
        error => {
          console.log(error.message)
        }
      )
    });
  }

  function FrontPage(){
    axios.get(`http://im.jinzh.me?sessionId=${localStorage.getItem("token")}`).then(
      response=>{
        console.log('请求成功了',response)
      },
      error=>{
        console.log('请求失败了',error.message)
      }
    )
  }

  function Test(){
    console.log($root)
    console.log(protobuf)
    const Body = $root.lookupType("protu.Body")
    const Msg = $root.lookup("protu.Msg")
    let data = {}
    data.type = 2,
    data.msg = ''
    let Data = {}
    Data.extra = 2,
    Data.time = new Date().getTime()
    Data.msg = "liuruohui"
    //let message = Msg.create(data)
    //console.log(message)
    console.log(Data)
    console.log(data)
    let buffer1 = Body.encode(Msg.create(Data)).finish()
    console.log(buffer1)
    let message1 = Msg.decode(buffer1)
    console.log(message1)
    let buffer = Body.encode(Body.create(data)).finish()
    console.log(buffer)
    let message = Body.decode(buffer)
    console.log(message)

  }
</script>

<template>
<!--<WelcomingPage class="bg-blue-50 page"></WelcomingPage> 
<RegisterPage class="bg-blue-50 page"></RegisterPage> 
<LoginPage class="bg-blue-50 page"></LoginPage> 
<MainPage class="bg-blue-50 page"></MainPage> -->
<UpdateInformation class="bg-blue-50 page"></UpdateInformation>
  <!--<button class="bg-red-500 hover:bg-red-700 ..." @click="Register">Register</button><br><br>
  <button class="bg-sky-600 hover:bg-sky-700 ..." @click="login">Login</button><br><br>
  <button class="bg-sky-600 hover:bg-sky-700 ..." @click="FrontPage">Front Page</button><br><br>
  <button class="bg-red-500 hover:bg-red-700 ..." @click="Connection">Connection</button><br><br>
  <button class="bg-sky-600 hover:bg-sky-700 ..." @click="Test">Test the Protobuf</button><br><br> -->

</template>

<style>
.page {
  height:100vh
}
</style>
