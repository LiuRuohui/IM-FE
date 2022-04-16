import { reactive } from "vue";
import { http } from "../http";

const file = reactive({
    data: [],
    upload,
    getIndex,
    getContent,
    updateName,
    updateTitle,
    del,
});

export { file }