const ask = require('inquirer')
const fse = require('fs-extra')

module.exports = function () {
    console.log('Welcome to exgen configuaration script!', 'This script will allow you to get setup with exgen')
    console.log('Let\'s start off by asking a few questions:')

    ask.registerPrompt('directory', require('inquirer-directory'))
    ask.registerPrompt('path', require('inquirer-file-path'))
    let questions = [
        {
            type: 'list',
            name: 'language',
            message: 'What language is your express application written in?',
            default: 'Typescript',
            choices: [
                'Typescript', 'Javascript', 'Coffeescript'
            ]
        },
        {
            type: 'list',
            name: 'db',
            message: 'What type of database is your express application using?',
            default: 'MongoDB',
            choices: [
                'MongoDB', 'DynamoDB'
            ]
        },
        {
            type: 'directory',
            name: 'routePath',
            message: 'Where do you store your routing controllers?',
            basePath: `${process.cwd()}`
        },
        {
            type: 'path',
            name: 'indexFilePath',
            message: 'Where is your route index file located?',
            basePath: `${process.cwd()}`
        }
    ]

    ask.prompt(questions)
        .then(answers => {
            let exgenFile = {
                database: answers.db,
                language: answers.language.toLowerCase(),
                pathToRoute: answers.routePath
            }
            console.log('Now we will initialise your exgenconf file. This file will be stored in ' + process.cwd() + '/.exgenconf')

            fse.writeFile(`${process.cwd()}/.exgenconf`, JSON.stringify(exgenFile), { flag: 'wx' })
            .then(() => console.log('\x1b[32m%s\x1b[0m', 'Initialization done!'))           
            .catch(error => console.error('\x1b[31m%s\x1b[0m','Can\'t write to file! File already exists!'))           
        })
        .catch(err => {
            console.error('\x1b[31m%s\x1b[0m', 'Error occured with initialization... closing...')
            return
        })
}