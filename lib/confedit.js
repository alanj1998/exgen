const ask = require('inquirer')
const fse = require('fs-extra')

module.exports = function () {
    fse.readFile(`${process.cwd()}/.exgenconf`).then(function (file) {
        const conf = JSON.parse(file)
        ask.registerPrompt('directory', require('inquirer-directory'))
        let configuarationOptions = [`Scripting Language: ${conf.language}`, `Database Type: ${conf.database}`, `Routes Path: ${conf.pathToRoute}`]

        function writeToConfigurationFile(conf) {
            fse.writeFile(`${process.cwd()}/.exgenconf`, JSON.stringify(conf), { flag: 'w' })
                .then(function () { console.log('\x1b[32m%s\x1b[0m', 'Editing of config done!') })
                .catch(function () { console.error('\x1b[31m%s\x1b[0m', 'Can\'t write to file!') })
        }

        function doWork() {
            ask.prompt({
                type: 'list',
                name: 'option',
                message: 'Choose Option to edit...',
                default: configuarationOptions[0],
                choices: configuarationOptions
            }).then(function (answer) {
                switch (answer.option) {
                    case configuarationOptions[0]:
                        ask.prompt({
                            type: 'list',
                            name: 'language',
                            message: 'What language is your express application written in?',
                            default: conf.language,
                            choices: [
                                'Typescript', 'Javascript', 'Coffeescript'
                            ]
                        }).then(function (answer) {
                            conf.language = answer.language
                            writeToConfigurationFile(conf)
                        })
                        break
                    case configuarationOptions[1]:
                        ask.prompt({
                            type: 'list',
                            name: 'db',
                            message: 'What type of database is your express application using?',
                            default: conf.database,
                            choices: [
                                'MongoDB', 'DynamoDB'
                            ]
                        }).then(function (answer) {
                            conf.database = answer.db
                            writeToConfigurationFile(conf)
                        })
                        break
                    case configuarationOptions[2]:
                        ask.prompt({
                            type: 'directory',
                            name: 'routePath',
                            message: 'Where do you store your routing controllers?',
                            basePath: `${process.cwd()}`
                        }).then(function (answer) {
                            conf.pathToRoute = answer.routePath
                            writeToConfigurationFile(conf)
                        })
                        break
                }
            })
        }

        console.log('Editing configuration file...')
        doWork()
    })
}