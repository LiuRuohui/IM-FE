<script setup>
import { onMounted, reactive, ref, defineAsyncComponent } from 'vue';

import { note } from '../../composables/data/note';

import mobile from "../../composables/mobile";
//加载异步组件
const Markdown = defineAsyncComponent(() =>
    import("./components/Markdown.vue")
);

//右侧编辑器以及title值
const article = reactive({
    id: "",
    title: "",
    value: "",
});

// 初始化定义容器高度
const height = ref("0px");
//获取md容器
const noteContainer = ref(null);

onMounted(() => {
    //初始化挂载保证窗口问题，勿动
    height.value = noteContainer.value.offsetHeight + "px"
});

function getMd(id, title) {
    note.getContent(id).then(res => article.value = res.Content)
    article.title = title
    article.id = id
}

//触发切换页面按钮
const turn = mobile();

//md编辑器保存事件触发
function save(md, h5) {
    note.updateContent(article.id, md)
    note.updateTitle(article.id, article.title)
    note.getIndex()
}


</script>

<template>
    <div class="flex-grow h-full flex flex-wrap overflow-y-auto relative">
        <span class="absolute bottom-3 right-3 lg:hidden z-50" @click="turn.switch">
            <img class="h-10 w-10" :src="turn.img" alt="down" />
        </span>
        <div class="w-full lg:w-96 h-full flex flex-col overflow-hidden select-none border-r border-gray-200"
            :class="turn.value ? 'hidden' : ''">
            <div class="w-full h-16 flex justify-center items-center mt-2 mb-2 border-b border-gray-100">
                <div class="w-5/6 relative opacity-70">
                    <input
                        class="box-border rounded-full h-9 pl-10 pr-4 py-3 w-full outline-none bg-gray-100 text-sm select-none"
                        type="text" placeholder="输入搜索的内容" />
                    <img class="box-content w-5 h-5 absolute top-2 left-3 pr-1 border-r border-gray-300 drag"
                        src="/src/assets/img/search.svg" alt />
                </div>
            </div>
            <div class="w-full flex-grow flex flex-col">
                <div class="w-5/6 flex ml-auto mr-auto pb-2">
                    <div class="opacity-60 mt-1 flex-1">
                        列表排序:
                        <select name id class="border-none outline-none font-bold text-center appearance-none">
                            <option value>最新</option>
                            <option value>倒序</option>
                        </select>
                    </div>
                    <div class="opacity-60">
                        创建会话
                        <div class="inline-block item-center">
                            <img class="h-8 inline-block drag" src="/src/assets/img/加号.svg" />
                        </div>
                    </div>
                </div>
                <div class="w-full flex-grow bg-gray-50" ref="noteContainer">
                    <div class="w-full overflow-y-auto no-scrollbar" :style="{ height: height }">
                        <div class="flex flex-col my-4 mx-8">
                            <div class="group flex items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer mb-3 bg-white md:px-2"
                                v-for="notes in note.data" :key="notes.ID" @click="getMd(notes.ID, notes.Title)">
                                <div class="h-full flex items-center">
                                    <img src="/src/assets/pic/450824.jpg" alt
                                        class="h-3/5 w-auto drag mx-2 inline-block" />
                                </div>
                                <div class="flex flex-col flex-grow h-full justify-center pl-2 pr-3">
                                    <div class="flex h-1/2 pt-2">
                                        <div
                                            class="font-bold text-base opacity-70 group-hover:opacity-90 flex items-center">
                                            <div class>{{ notes.Title == "" ? "空标题" : notes.Title }}</div>
                                        </div>
                                        <div
                                            class="font-semibold opacity-50 group-hover:opacity-90 text-sm flex items-center flex-grow flex-row-reverse">
                                            <div class>2020-6-22</div>
                                        </div>
                                    </div>
                                    <div class="inline-block truncate opacity-70 text-sm group-hover:opacity-100 h-1/2">
                                        {{ notes.Abstract == "" ? "摘要为空！" : notes.Abstract }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-grow h-full max-h-screen lg:block" :class="turn.value ? '' : 'hidden'">
            <div class="w-full h-16 mt-2 flex border-b border-t-gray-200">
                <input
                    class="outline-none w-full box-border px-4 lg:px-6 text-xl md:text-2xl font-serif antialiased font-semibold select-none"
                    type="text" placeholder="标题" v-model="article.title" />
            </div>
            <div class="MDbox w-full">
                <Markdown v-model="article.value"
                    toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save"
                    @save="save"></Markdown>
            </div>
        </div>  </div>
</template>
<style>
.MDbox {
    height: calc(100% - 4.5rem);
}
</style>