const genController = require('./generate.controller')

module.exports = function (arg) {
    switch (arg[0]) {
        case 'c':
        case 'controller':
            genController(arg)
            break
    }
}