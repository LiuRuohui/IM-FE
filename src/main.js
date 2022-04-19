import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router/router";
import VueEasyLightbox from 'vue-easy-lightbox'

const app = createApp(App);
app.use(router);
app.use(VueEasyLightbox);
app.mount("#app");