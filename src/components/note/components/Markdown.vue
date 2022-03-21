<script setup>
/****
 * 接收参数
 * 非props的attr：toolbar
 * v-model表单绑定
 * save事件

****/
import { ref, computed, onMounted, useAttrs, watch } from 'vue';

import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';

//tips
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';

//emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';

//katex
// import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

//ToDoList
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';

//LineNumber
import createLineNumberPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

//HighLightLine
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';

//Copy Code
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';

//align
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

// highlightjs
import hljs from 'highlight.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

//tips
import '@kangc/v-md-editor/lib/plugins/tip/tip.css';

//emoji
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

//ToDoList
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

//HighLightLine
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

//CopyCode
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VMdEditor.Codemirror = Codemirror;
//设置主题
VMdEditor.use(githubTheme, {
    Hljs: hljs,
})
    //插件引入
    .use(createTipPlugin())
    .use(createEmojiPlugin())
    .use(createLineNumberPlugin())
    .use(createAlignPlugin())
    .use(createTodoListPlugin())
    .use(createHighlightLinesPlugin())
    .use(createCopyCodePlugin());

//接收props
const props = defineProps([
    'modelValue',
]);

//接收emit
const emit = defineEmits([
    'update:modelValue',
    'save'
]);

//获取attrs
const attrs = useAttrs();

const MDContainer = ref(null);

const height = ref("0px");

//计算属性，表单绑定
const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
});

//声明resizeObserver
const resizeObserver = new ResizeObserver(
    () => {
        height.value = MDContainer.value.offsetHeight + "px"
        console.log("改了", MDContainer.value.offsetHeight)
    }
);

onMounted(() => {
    resizeObserver.observe(MDContainer.value)
});

//声明save事件处理函数
function save(dds, ddx) {
    emit('save', dds, ddx)
}

//声明复制函数
function handleCopyCodeSuccess(code) {
    navigator.clipboard
        .writeText(code)
        .then(function (err) {
            console.log("写入剪切板成功！")
        })
        .catch(function (err) {
            console.log("写入剪切板失败！")
        })
}
</script>

<template>
    <div class="h-full w-full overflow-y-hidden overflow-x-hidden" ref="MDContainer">
        <v-md-editor
            v-model="value"
            :height="height"
            :left-toolbar="attrs.toolbar"
            @copy-code-success="handleCopyCodeSuccess"
            @save="save"
        ></v-md-editor>
    </div>
</template>

<style></style>