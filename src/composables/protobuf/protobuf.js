/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

import { roots, Root } from "protobufjs/light";

var $root = (roots["default"] || (roots["default"] = new Root()))
.addJSON({
  proto: {
    options: {
      go_package: "../"
    },
    nested: {
      Body: {
        fields: {
          type: {
            type: "int32",
            id: 1
          },
          Msg: {
            type: "Msg",
            id: 2
          },
          Group: {
            type: "Group",
            id: 3
          },
          Thum: {
            type: "Thum",
            id: 4
          }
        }
      },
      Msg: {
        fields: {
          end: {
            type: "int64",
            id: 1
          },
          extra: {
            type: "int64",
            id: 2
          },
          type: {
            type: "int32",
            id: 3
          },
          msg: {
            type: "string",
            id: 4
          },
          time: {
            type: "int64",
            id: 5
          }
        }
      },
      Group: {
        fields: {
          end: {
            type: "int64",
            id: 1
          },
          time: {
            type: "int64",
            id: 2
          },
          type: {
            type: "int32",
            id: 3
          },
          deal: {
            type: "int64",
            id: 4
          },
          groupid: {
            type: "int64",
            id: 5
          }
        }
      },
      Thum: {
        fields: {
          end: {
            type: "int64",
            id: 1
          },
          time: {
            type: "int64",
            id: 2
          },
          type: {
            type: "int32",
            id: 3
          },
          reason: {
            type: "string",
            id: 4
          }
        }
      }
    }
  }
});

export default $root;
