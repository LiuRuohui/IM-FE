<script setup>
	import Switch from "/src/components/components/Switch.vue";
</script>

<template>
  <div class="w-full text-base mt-6">
    <div>
      <div class="flex justify-between mt-3">
        <span class="select-none">添加好友时需要验证</span>
        <div class>
          <Switch :id="1"></Switch>
        </div>
      </div>
      <div class="w-full h-4 border-b border-gray-200"></div>
    </div>
    <div>
      <div class="flex justify-between mt-3">
        <span class="select-none">新消息通知</span>
        <div class>
          <Switch :id="2"></Switch>
        </div>
      </div>
      <div class="w-full h-4 border-b border-gray-200"></div>
    </div>
    <div>
      <div class="flex justify-between mt-3">
        <span class="select-none">显示通知详情</span>
        <div class>
          <Switch :id="3"></Switch>
        </div>
      </div>
      <div class="w-full h-4 border-b border-gray-200"></div>
    </div>
  </div>
</template>
