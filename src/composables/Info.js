/*
保存UpdateInfo界面的数据传输到Setting.vue
创建Info对象里边包含User的所有信息，设置为reactive
保存getInfo的方法可以通过Info.getInfo()获取从数据库中存储的信息渲染在页面上
设置debounce防抖方法使得在输入不会数据一发生改变就向服务器post结果
*/
import { reactive } from "vue";
import { http } from "/src/composables/http";
const Info = reactive({
  id: "",
  name: "",
  sex: false,
  signature: "",
  phone: "",
  mail: "",
  site: "",
  github: "",
  weibo: "",
  qq: "",

  getInfo() {
    http.get("/user/info", {}, "").then(
      (data) => {
        console.log(data);
        Info.name = data.Name;
        Info.sex = data.Sex;
        Info.signature = data.Signature;
        Info.phone = data.Phone;
        Info.mail = data.Mail;
        Info.site = data.Site;
        Info.github = data.Github;
        Info.weibo = data.Weibo;
        Info.qq = data.Qq;
      },
      (error) => {}
    );
  },
});

export { Info };
