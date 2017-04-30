// flow-typed signature: 0266a8d6a48464ef50cdd8cf78fae007
// flow-typed version: <<STUB>>/babylon_v^6.17.0/flow_v0.45.0

declare module 'babylon' {
  declare type Node = {
    loc: { start: { line: number } },
    quasi: {
      expressions: [],
      end: number,
      start: number,
    },
  }

  declare type Token = { label: string }

  declare type Ast = {}

  declare module.exports: {
    parse: (
      input: string,
      options?: {
        sourceType?: 'module',
        plugins?: Array<string>,
      },
    ) => Ast,
    tokTypes: {
      bracketR: Token,
      braceR: Token,
      braceBarR: Token,
      parenR: Token,
      backQuote: Token,
    },
  }
}
