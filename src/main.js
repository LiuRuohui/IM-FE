import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router/router";

//导入弹框主题
import "@sweetalert2/theme-bulma/bulma.css";

const app = createApp(App);
app.use(router);
app.mount("#app");

// import msg from "./composables/websocket/msg";
// let body = msg.lookupType("proto.Body");
// let sdds = body.create({
// 	type: "1",
// 	msg: {
// 		end: "1514177448864911360",
// 		msg: "测试一下",
// 	},
// });
// let buffer = body.encode(sdds).finish();
// let message = body.decode(buffer);
// console.log(message);
// console.log(body.toObject(message));
