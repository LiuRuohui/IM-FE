//用户名要求，四到十位英文数字混合
const accountRegexp = /^[a-zA-Z0-9_]{4,10}$/

//密码要求，英文数字（可为纯英文和纯数字），6-20位
const passwdRegexp = /^[0-9A-Za-z]{6,20}$/

//防抖函数
function debounce(fn, delay) {
	let timer
	return function () {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn()
		}, delay)
	}
}

function accountTest(params) {
	return accountRegexp.test(params)
}

function passwdTest(params) {
	return passwdRegexp.test(params)
}

export { debounce, accountTest, passwdTest }
