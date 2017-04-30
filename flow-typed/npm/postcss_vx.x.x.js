// flow-typed signature: a06edcb53d430251478b724e1f19e383
// flow-typed version: <<STUB>>/postcss_v^5.2.17/flow_v0.45.0

declare module 'postcss' {
  declare module.exports: (
    plugins?: Array<any>,
  ) => {
    process(css: string, options?: { [string]: any }): Promise<{ css: string }>,
  }
}
