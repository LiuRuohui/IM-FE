<script setup></script>

<template>
  <div class="w-full flex h-full bg-white select-none items-center justify-center border-8 rounded-r-xl rounded-l-xl shadow-lg">
    <div class="flex flex-col">
      <div class="text-center font-medium my-2">请选择文件上传</div>
      <div>
        <input
          type="file"
          class="block w-full text-sm text-slate-500 file:mr-8 file:py-2 file:px-10 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
