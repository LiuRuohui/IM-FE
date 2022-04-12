<script setup>
  import {ref} from "vue"
	import { accountTest, passwdTest } from "/src/composables/tool";
	import { http } from "../../composables/http";

	//获取要修改的账号密码
	const account = ref("");
	const passwd = ref("");

  function confirm(){
    if (!accountTest(account.value)) {
			console.log("账号格式不正确！", account.value);
			return;
		}
		if (!passwdTest(passwd.value)) {
			alert("密码格式错误", passwd.value);
			return;
		}
		http.post("/user/updateAccount", { account: account.value }, "").then(
			(data) => {
				console.log("更改账号成功", data);
			},
			(error) => {
				console.log("更改账号失败", error);
			}
		);
		http.post("/user/updatePasswd", { passwd: passwd.value }, "").then(
			(data) => {
				console.log("修改密码成功", data);
			},
			(error) => {
				console.log("修改密码失败", error);
			}
		);
  }
</script>

<template>
  <div class="w-full text-base mt-6">
    <div class="flex flex-col mt-3">
      <div class="rounded-md my-4">
        <label class="label select-none" for="account">账号:</label>
        <input
          type="account"
          id="account"
          name="account"
          v-model="account"
          class="inputFrame" />
      </div>
      <div class="rounded-md my-4">
        <label class="label select-none" for="passwd">密码:</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="passwd"
          class="inputFrame"
        />
      </div>
      <div class="rounded-md my-4">
        <button class="btn" @click="confirm">确认修改</button>
      </div>
    </div>
  </div>
</template>
