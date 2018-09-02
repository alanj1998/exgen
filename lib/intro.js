const figlet = require('figlet')

module.exports = {
    genArt: function(){
        let art = figlet.textSync('Exgen', 'Banner')
        console.log(art)
    },
    
    genIntro: function(){
        console.log(`
Usage:
- exgen { g | gen | generate } { c | controller } nameOfController to generate a new route controller
- exgen { g | gen | generate } { m | model } nameOfModel to generate a model 
            
Extras:
- --type native -> render method in plain javascript
- --path path/to/file -> put the file into the following path
            
By Default all files are rendered in TypeScript and using dynamoose for the database models!`)
    }  
}