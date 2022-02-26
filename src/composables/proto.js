import root from "./protobuf/protobuf"

function newObject() {
	return {
		type: 0,
		Msg: {
			end: 0,
			extra: 0,
			type: 0,
			msg: "",
			time: Date.parse(new Date()),
		},
		Group: {
			end: 0,
			time: Date.parse(new Date()),
			type: 0,
			deal: 0,
			groupid: 0,
		},
		Thum: {
			end: 0,
			time: Date.parse(new Date()),
			type: 0,
			reason: "",
		},
	}
}
let proto = root.lookupType("proto.Body")
function encode(payload) {
	if (proto.verify(payload)) {
		throw Error(proto.verify(payload))
	}
	let message = proto.create(payload)
	let buffer = proto.encode(message).finish()
	return buffer
}

function decode(buffer) {
	let message = proto.decode(buffer)
	let object = proto.toObject(message, {
		longs: String,
		enums: String,
		bytes: String,
		// see ConversionOptions
	})
	return object
}

export { newObject, encode, decode }
