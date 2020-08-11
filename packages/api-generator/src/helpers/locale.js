const fs = require('fs')

function getLocaleData () {
  let localeData = {}
  const localeFolders = fs.readdirSync('./src/locale')
  localeFolders.forEach(folder => {
    console.log(folder)
    const locale = {}
    const localeFiles = fs.readdirSync(`./src/locale/${folder}`)
    localeFiles.forEach(file => {
      const compLocale = fs.readFileSync(`./src/locale/${folder}/${file}`, 'utf8')
      const parsed = JSON.parse(compLocale)
      const localeObj = {}
      for (const [okey, options] of Object.entries(parsed)) {
        const props = []
        for (const [pkey, pvalue] of Object.entries(options)) {
          props.push({
            name: pkey,
            description: pvalue,
          })
        }
        localeObj[okey] = props
      }
      locale[file.split('.')[0]] = localeObj
    })
    localeData[folder] = locale
  })
  return localeData
}

module.exports = getLocaleData()
