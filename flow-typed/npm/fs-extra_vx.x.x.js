// flow-typed signature: 3f6330b883cc883d87aca3240b161af3
// flow-typed version: <<STUB>>/fs-extra_v^3.0.0/flow_v0.45.0

import fs from 'fs'

declare module 'fs-extra-x' {
  declare module.exports: typeof fs & {
    copy(from: string, to: string): void,
    mkdirsSync(path: string): void,
    removeSync(path: string): void,
  }
}
