import { reactive } from "vue";
import { http } from "../http";
import router from "../../router/router";

const group = reactive({
	data: [],
});

class GroupEle {
	constructor(name, groupId, joinTime, ownerId) {
		this.setName(name);
		this.setGroupId(groupId);
		this.setJoinTime(joinTime);
		this.setOwnerId(ownerId);
	}
	setName(name) {
		if (typeof name === "string") {
			this.name = name;
		} else {
			throw "name is not string";
		}
	}
	setGroupId(groupId) {
		if (typeof groupId === "number") {
			this.groupId = groupId;
		} else {
			throw "groupId is not number";
		}
	}
	setJoinTime(joinTime) {
		if (typeof joinTime === "number") {
			this.joinTime = joinTime;
		} else {
			throw "joinTime is not number";
		}
	}
	setOwnerId(ownerId) {
		if (typeof ownerId === "string") {
			this.ownerId = ownerId;
		} else {
			throw "ownerId is not string";
		}
	}
}
