function build () {
  var path = require('path')
  var fs = require('fs')
  var HWCloud = require('../package.json')
  var basedir = path.resolve(__dirname, '..')

  var browserify = require('browserify')
  var brOptions = { basedir: basedir }
  browserify(brOptions).add('browser.js').bundle(function (error, data) {
    if (error) console.error(error)
    else {
      // filename -> hw-ecs-version.bundle.js
      var filename = HWCloud.name + '-' + HWCloud.version + '.standalone.js'
      var filepath = path.join(basedir, 'dist', filename)
      // write sdk code to dist file
      fs.writeFile(filepath, data, function (err) {
        if (err) console.error(err)
        else console.log('sdk bundle has been created -> ' + filepath)
      })
    }
  })
}

// run if we called this tool directly
if (require.main === module) {
  build()
}

module.exports = build
