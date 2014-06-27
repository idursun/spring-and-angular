exports.config = {
  "modules": [
    "copy",
    "server",
    "jshint",
    "csslint",
    "require",
    "minify-js",
    "minify-css",
    "live-reload",
    "bower",
    "less",
    "web-package"
  ],
  "server": {
    "path": "server.js",
    "views": {
      "compileWith": "html",
      "extension": "html"
    }
  },
  "webPackage" : {
      //outPath: "../src/main/resources/public",
      exclude: [
        "test","README.md","node_modules","mimosa-config.coffee","mimosa-config.js","assets",".git",".gitignore",
        "*.*"
        ]
  }
}
