<script setup>
import { ref } from 'vue';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

//tips js
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';

//emoji js
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';

import "../../assets/js/katex.min.js"

import "../../assets/css/katex.min.css"

//katex
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

import "../../assets/js/mermaid.min.js"

//mermaid js
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';

//ToDoList js
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';

//LineNumber js
import createLineNumberPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

//HighLight LineNumber js
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';

//Copy Code js
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';

//align js
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

//tips css
import '@kangc/v-md-editor/lib/plugins/tip/tip.css';

//emoji css
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

//ToDoList css
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

//HighLight LineNumber css
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

//Copy Code css
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
})
    .use(createTipPlugin())
    .use(createEmojiPlugin())
    .use(createKatexPlugin())
    .use(createMermaidPlugin())
    .use(createTodoListPlugin())
    .use(createLineNumberPlugin())
    .use(createHighlightLinesPlugin())
    .use(createCopyCodePlugin())
    .use(createAlignPlugin())

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

const text = ref(`
\`\`\`js
import Vue from 'vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);
\`\`\`
\`\`\`mermaid
graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);
\`\`\`

$$\sum_{i=1}^n a_i=0$$

`);

</script>

<template>
    <div class="w-full h-screen overflow-auto bg-gray-100 pt-20">
        <div class="lg:w-3/5 ml-auto mr-auto bg-white">
            <v-md-preview :text="text" @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
        </div>
    </div>
</template>

<style></style>