<script setup>
import { ref, reactive, onMounted } from "vue";

const groupName = ref("");
</script>

<template>
    <div class="flex flex-col h-full">
        <div
            class="w-full h-full flex justify-center items-center my-2 border-b border-gray-50"
        >
            <div class="w-5/6 mt-4">
                <label class="label select-none" for="passwd">新建群名:</label>
                <input
                    id="groupName"
                    name="groupName"
                    type="text"
                    v-model="groupName"
                    required
                    class="inputFrame"
                    placeholder="请输入新建群名"
                />
                <button class="btn mt-8">创建</button>
            </div>
        </div>
    </div>
</template>

<style></style>
