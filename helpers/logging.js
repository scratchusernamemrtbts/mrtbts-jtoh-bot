const fs = require('node:fs')
const path = require('node:path')
const helpersFolder = path.resolve(__dirname)
module.exports = {
  log: (msg,type) => {
    fs.writeFile(`${helpersFolder}/../logs/${type}.log`, `${msg}\n`, { flag: 'a+' }, err => {
      if(err) {
        console.error(`error while logging ${msg} log type : ${type} error : ${err}`)
      }
    })
  } 
}