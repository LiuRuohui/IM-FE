import { wsUrl } from "./env"

function newWs() {
	let ws = new WebSocket(wsUrl)
	ws.onopen = function () {
		return ws
	}
}
