// flow-typed signature: d9014f8bc026b71c5a1a5d5c13f0c393
// flow-typed version: <<STUB>>/babel-traverse_v^6.24.1/flow_v0.45.0

import type Ast from 'babylon'
import type Node from 'babylon'

declare module 'babel-traverse' {
  declare module.exports: (
    ast: Ast,
    opts?: {
      enter(args: { node: Node }): void,
    },
  ) => void
}
