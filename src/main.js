import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router/router";

//导入弹框主题
import "@sweetalert2/theme-bulma/bulma.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
