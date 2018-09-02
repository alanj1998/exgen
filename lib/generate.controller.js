const mustache = require('mustache')
const fse = require('fs-extra')
const path = require('path')
const appDir = path.dirname(require.main.filename)

const globalPath = `${process.cwd()}/routes/controller/`

module.exports = function (arg) {
    function readInTemplate(type) {
        template = fse.readFileSync(`${appDir}/templates/server/controller.${type}`).toString()
        return template
    }

    function checkExtension(type) {
        switch (type.toLowerCase()) {
            case 'typescript':
                return 'ts'
            case 'native':
                return 'js'                
            case 'coffeescript':
                return'coffee'              
            default:
                return 'ts'               
        }
    }

    function checkForPath(type) {
        let extension = checkExtension(type)   

        if (arg.includes('--path')) {
            let index = arg.findIndex(function (element) {
                return element === '--path'
            })

            path = arg[index + 1]

            if (path.slice('-1') !== '/') path += '/'

            if (!path.includes('.js') || !path.includes('.ts') || !path.includes('.coffee')) {
                path += `${arg[1]}.controller.${extension}`
            }

            return path
        }
        else return `${globalPath}${arg[1]}.controller.${extension}`
    }


    function checkForType() {
        if (arg.includes('--type')) {
            let index = arg.findIndex(function (element) {
                return element === '--type'
            })

            type = arg[index + 1]
            if (arg[index + 1] == 'typescript') {
                return 'typescript'
            }
            else if (arg[index + 1] == 'native') {
                return 'native'
            }
            else if (arg[index + 1] == 'coffee') {
                return 'coffeescript'
            }
            else {
                console.error('\x1b[31m%s\x1b[0m', 'Incorrect type entered!')
                return undefined
            }
        }
        else return 'typescript'
    }

    async function writeToFile(path, template) {
        let name = arg[1].charAt(0).toUpperCase() + arg[1].substr(1)
        let view = {
            name: `${name}Controller`
        }

        let rendered = mustache.render(template, view)
        try {
            await fse.outputFile(path, rendered, { flag: 'wx' })
            console.log('\x1b[32m%s\x1b[0m', 'Rendering is done!')
        } catch (error) {
            if (error.code === 'EEXIST') console.log('\x1b[31m%s\x1b[0m', 'File with this name already exists!')
            else console.error('\x1b[31m%s\x1b[0m', 'Unexpected Error Happened!')
        }
    }

    async function addToIndexFile(type, rawPath) {
        return 
    }

    let template, path

    if (arg[1] !== undefined) {
        let type = checkForType()
        if (type === undefined) return

        let path = checkForPath(type)
        console.log(`Rendering controller called ${arg[1]} of type ${type}...`)

        console.log(`Reading in template...`)
        let template = readInTemplate(type)

        console.log(`Writing out the template to ${path}`)
        writeToFile(path, template)

        console.log(`Adding new controller to index file...`)
        addToIndexFile(type, path)
    }
    else {
        if (arg[0] === 'c') arg[0] = 'controller'
        console.log('\x1b[31m%s\x1b[0m', 'No name was provided for the ${arg[0]}!')
    }
}
