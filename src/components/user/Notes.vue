<script setup>
import { reactive } from 'vue';
const notebooks = reactive({
    id:[1,2,3,4,5,6],
    message:[],
})
</script>
<template>
    <div class="w-96 h-full flex flex-col overflow-hidden">
        <div class="w-full flex flex-row my-2">
            <div class="opacity-60 float-left ml-4 mt-1">
                列表排序
                <select name="" id="" class="border-none outline-none font-black text-center bg-blue-50">
                    <option value="">最新笔记优先</option>
                    <option value="">倒序</option>
                </select>
            </div>
            <div class="ml-14 opacity-60">
                创建会话
                <div class="inline-block item-center">
                    <img src="/src/assets/img/加号.svg" alt="" class="h-9 inline-block">
                </div>
            </div>
        </div>
        <div class="w-full h-full">
            <div class="flex flex-col my-4 mx-8">
                <div class="w-full h-28 shadow-md hover:shadow-lg rounded-md overflow-auto" v-for="notes in notebooks.id">
                    <img src="/src/assets/pic/450824.jpg" alt="" class="ml-4 my-4 h-20 w-20 inline-block float-left">
                        <div class="float-left ml-3 mt-6 font-bold opacity-70 hover:opacity-100">笔记标题</div>
                        <div class="hover:font-bold float-right mt-6 opacity-50 mr-4">2020-6-22</div>
                        <p class="inline-block ml-3 truncate opacity-70 text-sm mt-2 hover:opacity-90">This is a note</p>
                </div>
            </div>
        </div>

    </div>
    <div class="flex-grow h-full"></div>
</template>
<style>
</style>