
function express_init() {
    const express = require("express")
    const cookieParser = require("cookie-parser")
    const bodyParser = require("body-parser")
    const { pass } = require('./config.json')
    const app = express()
    const port = 3000

    app.use(cookieParser())
    app.use(lock)
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/setpass', (req, res) =>{
        res.render('setpass')
    })

    app.post('/setpass', (req, res) => {
        res.cookie('pass', req.body.pass)
        res.redirect('/')
    })

    app.listen(port, () => {
        console.log(`Server running on: http://localhost:${port}`)
    })

    function lock (req, res, next){
        if (req.cookies.pass == pass || req.originalUrl == '/setpass'){
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