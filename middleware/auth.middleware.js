const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) =>{
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.headers.authorization.split(' ')[1]
        //console.log('auth.middleware token: ', token)

        if (!token) {
            return res.status(401).json({message: 'No autorization (1)'})  
        }

        console.log('1 checkpoint')
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        console.log('decoded = ', decoded)
        console.log('req.user before = ',req.user)
        req.user = decoded
        console.log('req.user', req.user)
        next()

    } catch (e) {
        res.status(401).json({message: 'No autorization (2)'})
    }

}