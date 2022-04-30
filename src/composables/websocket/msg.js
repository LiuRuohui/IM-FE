/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

import { roots, Root } from "protobufjs/dist/light/protobuf.min";

var $root = (roots["default"] || (roots["default"] = new Root())).addJSON({
	proto: {
		options: {
			go_package: "../",
		},
		nested: {
			Body: {
				fields: {
					type: {
						type: "int32",
						id: 1,
					},
					msg: {
						type: "Msg",
						id: 2,
					},
					apply: {
						type: "Apply",
						id: 3,
					},
				},
			},
			Msg: {
				fields: {
					end: {
						type: "string",
						id: 1,
					},
					groupId: {
						type: "string",
						id: 2,
					},
					extra: {
						type: "string",
						id: 3,
					},
					type: {
						type: "int32",
						id: 4,
					},
					msg: {
						type: "string",
						id: 5,
					},
					time: {
						type: "int64",
						id: 6,
					},
				},
			},
			Apply: {
				fields: {
					end: {
						type: "string",
						id: 1,
					},
					time: {
						type: "int64",
						id: 2,
					},
					type: {
						type: "int32",
						id: 3,
					},
					deal: {
						type: "string",
						id: 4,
					},
					groupId: {
						type: "string",
						id: 5,
					},
					reason: {
						type: "string",
						id: 6,
					},
				},
			},
		},
	},
});

export default $root;
