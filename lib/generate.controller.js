const mustache = require('mustache')
const fse = require('fs-extra')
const path = require('path')
const appDir = path.dirname(require.main.filename)

module.exports = function (arg) {
    const config = JSON.parse(fse.readFileSync(`${process.cwd()}/.exgenconf`))
    
    function readInTemplate(type) {
        template = fse.readFileSync(`${appDir}/templates/server/controller.${type}`).toString()
        return template
    }

    function checkExtension(type) {
        switch (type.toLowerCase()) {
            case 'typescript':
            case 'ts':
            case 'type':
                return 'ts'
            case 'javascript':
            case 'native':
            case 'js':
                return 'js'
            case 'coffeescript':
            case 'coffee':
                return 'coffee'
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
        else return `${process.cwd()}/${config.pathToRoute}/${arg[1]}.controller.${extension}`
    }


    function checkForType() {
        if (arg.includes('--type')) {
            let index = arg.findIndex(function (element) {
                return element === '--type'
            })

            type = arg[index + 1]
            if (['typescript', 'type', 'ts'].includes(arg[index + 1].toLowerCase())) {
                return 'typescript'
            }
            else if (['javascript', 'js', 'native'].includes(arg[index + 1].toLowerCase())) {
                return 'javascript'
            }
            else if (['coffeescript', 'coffee'].includes(arg[index + 1].toLowerCase())) {
                return 'coffeescript'
            }
            else {
                console.error('\x1b[31m%s\x1b[0m', 'Incorrect type entered!')
                return undefined
            }
        }
        else return config.language
    }

    function writeToFile(path, template) {
        let name = arg[1].charAt(0).toUpperCase() + arg[1].substr(1)
        let view = {
            name: `${name}Controller`
        }

        let rendered = mustache.render(template, view)
        try {
            fse.outputFile(path, rendered, { flag: 'wx' }).then(function() {
                console.log('\x1b[32m%s\x1b[0m', 'Rendering is done!')
            }).catch(function(err) {
                if(err.code === 'EACCES') console.log('Permission denied! Try in different folder!')
                else if (err.code === 'EEXIST') console.log('\x1b[31m%s\x1b[0m', 'File with this name already exists!')
                else console.log('Unexpected error!')
            })
        } catch (error) {
            if (error.code === 'EEXIST') console.log('\x1b[31m%s\x1b[0m', 'File with this name already exists!')
            else console.error('\x1b[31m%s\x1b[0m', 'Unexpected Error Happened!')
            return error
        }
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
        let error = writeToFile(path, template)
        if (error) return
    }
    else {
        if (arg[0] === 'c') arg[0] = 'controller'
        console.log('\x1b[31m%s\x1b[0m', 'No name was provided for the ${arg[0]}!')
    }
}
