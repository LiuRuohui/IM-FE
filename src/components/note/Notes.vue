<script setup>
import { onMounted, reactive, ref, watch, defineAsyncComponent } from 'vue'

// import Markdown from "./components/Markdown.vue"; //引入封装好的组件

//加载异步组件
const Markdown = defineAsyncComponent(() =>
    import("./components/Markdown.vue")
)

const notebooks = reactive({
    id: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    message: [],
});

const value = ref("");

watch(() => value.value, () => {
    console.log('value发生更改', value.value);
})

const height = ref("0px")
const noteContainer = ref(null)

onMounted(() => {
    height.value = noteContainer.value.offsetHeight + "px"
})

function save(dds, ddx) {
    console.log("save", dds, ddx)
}
</script>

<template>
    <div class="flex-grow h-full flex">
        <div class="w-96 h-full flex flex-col overflow-hidden select-none border-r border-gray-200">
            <div
                class="w-full h-16 flex justify-center items-center mt-2 mb-2 border-b border-gray-100"
            >
                <div class="w-5/6 relative opacity-70">
                    <input
                        class="box-border rounded-full h-9 pl-10 pr-4 py-3 w-full outline-none bg-gray-100 text-sm select-none"
                        type="text"
                        placeholder="输入搜索的内容"
                    />
                    <img
                        class="box-content w-5 h-5 absolute top-2 left-3 pr-1 border-r border-gray-300 drag"
                        src="/src/assets/img/search.svg"
                        alt
                    />
                </div>
            </div>
            <div class="w-full flex-grow flex flex-col">
                <div class="w-5/6 flex ml-auto mr-auto pb-2">
                    <div class="opacity-60 mt-1 flex-1">
                        列表排序:
                        <select
                            name
                            id
                            class="border-none outline-none font-bold text-center appearance-none"
                        >
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
                            <div
                                class="group flex items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer mb-3 bg-white px-2"
                                v-for="notes in notebooks.id"
                            >
                                <div class="h-full flex items-center">
                                    <img
                                        src="/src/assets/pic/450824.jpg"
                                        alt
                                        class="h-3/5 w-auto drag mx-2 inline-block"
                                    />
                                </div>
                                <div
                                    class="flex flex-col flex-grow h-full justify-center pl-2 pr-3"
                                >
                                    <div class="flex h-1/2 pt-2">
                                        <div
                                            class="font-bold text-base opacity-70 group-hover:opacity-90 flex items-center"
                                        >
                                            <div class>笔记标题</div>
                                        </div>
                                        <div
                                            class="font-semibold opacity-50 group-hover:opacity-90 text-sm flex items-center flex-grow flex-row-reverse"
                                        >
                                            <div class>2020-6-22</div>
                                        </div>
                                    </div>
                                    <div
                                        class="inline-block truncate opacity-70 text-sm group-hover:opacity-100 h-1/2"
                                    >
                                        This
                                        is a note
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-grow h-full flex flex-col max-h-screen">
            <div class="w-full h-16 mt-2 flex border-b border-t-gray-200">
                <input
                    class="outline-none flex-grow px-6 text-2xl font-serif antialiased font-semibold select-none"
                    type="text"
                    placeholder="标题"
                />
            </div>
            <div class="MDbox w-full">
                <Markdown
                    v-model="value"
                    toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save"
                    @save="save"
                ></Markdown>
            </div>
        </div>
    </div>
</template>
<style>
.MDbox {
    height: calc(100% - 4.5rem);
}
</style>