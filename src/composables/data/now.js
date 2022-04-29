import { reactive } from "vue";

const now = reactive({
	chum: {
		id: "",
		name: "",
	},
	group: {
		id: "",
		name: "",
		joinTime: "",
		ownerId: "",
		intro: "",
	},
});

export { now };
