module.exports = api => {
  api.cache(false)
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          "targets": {
            "browsers": [
              "last 2 versions",
              "safari >= 7"
            ],
            "node": true
          },
          "debug": false
        }
      ],
      "@babel/preset-react",
      "@babel/preset-flow"
    ],
    plugins: [
      [
        "babel-plugin-import",
        {
          "libraryName": "antd",
          "libraryDirectory": "lib",
          "style": true
        }
      ],
      "@babel/plugin-syntax-dynamic-import",
      [
        "@babel/plugin-proposal-object-rest-spread",
        {
          "loose": false
        }
      ],
      "@babel/plugin-proposal-optional-catch-binding",
      "@babel/plugin-proposal-async-generator-functions",
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-export-default-from",
      [
        "@babel/plugin-proposal-nullish-coalescing-operator",
        {
          "loose": false
        }
      ],   
      "@babel/plugin-proposal-optional-chaining",
      [
        "@babel/plugin-proposal-pipeline-operator",
        {
          "proposal": "minimal"
        }
      ], 
      "@babel/plugin-proposal-do-expressions",
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-transform-runtime"
    ],
    exclude: [
      "./node_modules"
    ]
  }
}