import { http } from "../http";
const data = new Map();

const User = {
  data,
  get,
};

//取内容
async function get(id) {
  if (data.has(id)) {
    return data.get(key);
  } else {
    let tmp;
    await getUserData(id).then((data) => {
      tmp = data;
    });
    data.set(id, tmp);
    return tmp;
  }
}

async function getUserData(id) {
  let userData;
  await http.post("/user/getData", {}).then(
    (data) => {
      userData = data;
      console.log("获取用户" + id, "信息成功", data);
    },
    (error) => {
      console.log("获取用户" + id, "信息失败", error);
    }
  );
  return userData;
}

export { User };
