<script setup></script>

<template>
  <div class="w-full flex h-40 bg-slate-50 select-none items-center justify-center">
    <div class="flex flex-row">
      <div class="flex flex-col px-8">
        <div class="font-light opacity-70">请选择上传的类型</div>
        <select name="" id="" class="display-none">
          <option value="">OFFICE</option>
          <option value="">JPG</option>
          <option value="">AUDIO</option>
          <option value="">VIDEO</option>
          <option value="">DEFAULT</option>
        </select>
      </div>
      <div>
        <input
          type="file"
          class="block w-full text-sm text-slate-500 file:mr-8 file:py-2 file:px-8 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
