'use strict'
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

if (require.main === module) {
    app.listen(3000)
} else {
    module.exports = app
}
