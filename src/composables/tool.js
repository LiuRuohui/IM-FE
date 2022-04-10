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
export { debounce }
