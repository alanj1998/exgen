#!/usr/bin/env node

const fs = require('fs-extra')
const args = process.argv.slice(2)
const init = require('./lib/init')
const generate = require('./lib/generate')
const exgenIntro = require('./lib/intro')

if (fs.pathExistsSync(`${process.cwd()}/package.json`)) {
    exgenIntro.genArt()
    if (args.length > 0) {
        let firstArg = args[0].toString()
        let exgenconfIsHere = fs.existsSync(`${process.cwd()}/.exgenconf`)

        if (firstArg !== 'init' && exgenconfIsHere) {
            switch (args[0].toString()) {
                case 'g':
                case 'generate':
                case 'gen':
                    generate(args.slice(1))
                    break
                default:
                    console.log('\x1b[31m%s\x1b[0m', 'No arguments matched the program!')
                    break
            }
        }
        else if(firstArg !== 'init' && !exgenconfIsHere) {
            console.log('\x1b[31m%s\x1b[0m', 'Exgen is not initialized in this project! Run exgen init and try again!')
        }
        else if(firstArg === 'init' && exgenconfIsHere){
            console.log('\x1b[31m%s\x1b[0m', 'Initialization is already complete!')
        }
        else {
            init()
        }
    }
    else {
        exgenIntro.genIntro()
    }
}
else {
    exgenIntro.genArt()
    console.log('\x1b[31m%s\x1b[0m', 'This module can only run from the root of your project!\n Move back to root of your project and try again!')
}