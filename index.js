const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
//23.13 роуты
app.use('/api/link', require('./routes/links.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 3030

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        console.log('Servet error', e.message)
        process.exit(1)
    }
}

start()

app.listen(PORT, () => {
    console.log(`Server was started on port ${PORT}...`)
})