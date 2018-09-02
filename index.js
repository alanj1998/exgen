#!/usr/bin/env node

const fs = require('fs-extra')
const args = process.argv.slice(2)
const generate = require('./lib/generate')
const exgenIntro = require('./lib/intro')

if (fs.pathExistsSync(`${process.cwd()}/package.json`)) {
    exgenIntro.genArt()
    if (args.length > 0) {
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
    else {
        exgenIntro.genIntro()
    }
}
else {
    exgenIntro.genArt()
    console.log('\x1b[31m%s\x1b[0m', 'This module can only run from the root of your project!\n Move back to root of your project and try again!')   
}