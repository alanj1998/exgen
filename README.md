    #######                             
    #       #    #  ####  ###### #    # 
    #        #  #  #    # #      ##   # 
    #####     ##   #      #####  # #  # 
    #         ##   #  ### #      #  # # 
    #        #  #  #    # #      #   ## 
    ####### #    #  ####  ###### #    #

## Exgen is an Express.js file generator inspired by @angular/cli
---

### What it does?
Exgen is designed to save time by generating files such as route controllers and database schemas.
By using [Mustache](https://github.com/janl/mustache.js/) as a templating engine, the files get created instantly and put into MVC like stack for express

### How to install?
1. Clone this repository 
```
> git clone https://github.com/alanj1998/exgen
```
2. Run bootstrap
```
> sudo ./exgen.bootstrap.sh
```

### How to use?
#### 1. Setup
In order to use exgen in your project you need to initialise it:
```
> exgen init
```
This command will take you through setting up exgen in your project. 
It will save its settings under ${projectPath}/.exgenconf

#### 2. Usage
```
exgen { g | gen | generate } { c | controller } nameOfController
```
This command ran in your project root, will generate a new controller of type typescript in 
```
${projectRoot}/src/routes/controllers/nameOfController.controller.ts
```

There are two extra options available:
1. --type { typescript | native | coffeescript } =>  allows you to generate a route in plain javascript or coffeescript
2. --path /path/to/file => allows you to override the MVC stack path to user chosen one


### How to help with the project?
If you wish to contribute to the project create a pull request whenever you created some changes!

#### Created by Alanj1998. License ISC
