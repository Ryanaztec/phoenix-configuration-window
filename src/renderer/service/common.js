export async function getMacAddress () {
  return new Promise(function (resolve, reject) {
    let address = []
    let mac = null
    let interfaces = require('os').networkInterfaces()

    for (let i in interfaces) {
      if (interfaces.hasOwnProperty(i)) {
        interfaces[i].map(function mapInterface (intface) {
          if (intface.family === 'IPv4' && !intface.internal) {
            address.push(intface.mac)
          }
        })
      }
    }
    address.forEach((item, index) => {
      if (mac === null || item > mac) {
        mac = item
      }
    })
    if (mac) {
      mac = mac.replace(/:/g, '-')
      resolve(mac)
    } else {
      resolve('False')
    }
  })
}
