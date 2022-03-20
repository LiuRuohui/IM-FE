<script setup>
import { Editor, Viewer } from "@bytemd/vue"
import { ref } from 'vue';

const value = ref("666");

</script>
<template>
    <div class="w-full h-full">
        <Editor class="editos" :value="value" />
        <Viewer class="viewer" :tabindex="2" :value="value"></Viewer>
    </div>
</template>
<style></style>