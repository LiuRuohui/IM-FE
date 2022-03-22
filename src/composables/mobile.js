import { reactive } from "vue"
import up from "../assets/img/up.svg"
import down from "../assets/img/down.svg"

export default function () {
	const tmp = reactive({
		value: false, //此处的false指当前处在第一页
		img: down,
		switch: function () {
			tmp.value = !tmp.value
			if (tmp.value) {
				tmp.img = up
			} else {
				tmp.img = down
			}
		},
	})
	return tmp
}
