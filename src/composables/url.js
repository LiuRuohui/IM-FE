/*
    通过im-router获取获取当前负载低的接口
*/
const env = "dev"
let url
switch (env) {
    case "dev":
        url = getURL()
}

function getURL() {
    fetch("http://im-router.jinzh.me").then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export { url }