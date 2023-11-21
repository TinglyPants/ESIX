/* ROUTES
GET
 getconfig -> renders the config.ejs file
 setpass -> renders the setpass.ejs file

POST
 setpass -> sets a password cookie, then redirects to index
 setconfig

*/


function express_init() {
    const express = require("express")
    const fs = require('node:fs')
    const cookieParser = require("cookie-parser")
    const bodyParser = require("body-parser")
    const { _pass } = require('./config.json')
    const app = express()
    const port = 3000

    // Config.json reading
    const rawConfig = fs.readFileSync(__dirname + "/config.json")
    const parsedConfig = JSON.parse(rawConfig)
    console.log(parsedConfig)

    app.use(cookieParser())
    app.use(lock)
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // GET
    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/getconfig', (req, res) => {
        res.render('config', { parsedConfig })
    })

    app.get('/setpass', (req, res) =>{
        res.render('setpass')
    })

    // POST
    app.post('/setpass', (req, res) => {
        res.cookie('_pass', req.body._pass)
        res.redirect('/')
    })

    app.post('/setconfig', (req, res) => {
        console.log(req.body)
        let filePath = __dirname + "/config.json"
        let jsonString = JSON.stringify(req.body, null, 4)
        // update config.json with new data
        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    })

    app.listen(port, () => {
        console.log(`Server running on: http://localhost:${port}`)
    })

    function lock (req, res, next){
        if (req.cookies._pass == _pass || req.originalUrl == '/setpass'){
            next()
        }
        else {
            res.redirect('/setpass')
        }
    }
}

module.exports = {
    express_init
}