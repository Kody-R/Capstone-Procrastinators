const dialog = require('node-file-dialog')
const config={type:'open-files'}
dialog(config)
    .then(dir => console.log(dir))
    .catch(err => console.log(err))