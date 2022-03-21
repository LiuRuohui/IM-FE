<script setup>
import { ref, computed } from 'vue';

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
    .use(createCopyCodePlugin())

//接收props
const props = defineProps([
    'height'
]);
// 设置md编辑器的值
const text = ref("");
// 计算属性设置md编辑器的height
const height = computed(() => {
    return props.height + "px"
});


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
    <v-md-editor v-model="text" :height="height" @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
</template>

<style></style>