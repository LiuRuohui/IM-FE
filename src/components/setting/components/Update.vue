<script setup>
import { ref } from "vue";
import { accountTest, passwdTest } from "../../../composables/tool";
import { Infos } from "../../../composables/api";

//获取要修改的账号密码
const account = ref("");
const passwd = ref("");

function confirm() {
  if (accountTest(account.value)) {
    Infos.updateAccount(account.value);
  }
  if (passwdTest(passwd.value)) {
    Infos.updatePasswd(passwd.value);
  }
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
          class="inputFrame"
        />
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
