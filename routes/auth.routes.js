const {Router} = require('express')

const {check, validationResult, body} =require('express-validator')
const User = require('../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

// /api/auth/register
router.post('/register',
    [
         check('email', 'Некорректный email',).isEmail(),
         check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (req,res) => {
        try {
            //console.log('Body: ', req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {email, password} =req.body
            const name =''
            const budjet=0
            const role=1

            const candidate = await User.findOne ({ email })
            // ({email: email}) т.к. ключ и значение совпадают сократили???
            
            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существвует'})
            }
            //далее нужно, захешировать пароль, т.к. хранить в обычном формате
            //не безопасно и могут взломать....я не делал это, оставил простым
            //npm i bcrypt.js не устанавливал, нужна для шифрования
            //про хэшированный пароль 33.00
            // посмотреть про паспорт, там тоже есть про регистрацию
            
            
            const userNew = new User({ email, password, name, role, budjet})
            await userNew.save()

            res.status(201).json({ message: 'Пользователь создан'})
            //если прилетят неправильные данные 35.00 про валидатор
            // и про валидацию данных, которые прилетели до 39.00

        } catch (e) {
            res.status(500).json({message: 'error /auth/register'})
        }
})

// /api/auth/login
router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            //const isMatch = await 
            //т.к. я не бикриктил пароли, тут проще
            // про разверстку бикриптовых паролей 43.00
            if (password !== user.password) {
                return res.status(400).json({message: 'некорректный пароль'})
            }

            //44.50 про токен для сингПейдж, у меня синглПейдж? 
            //скорее всего придется брать паспорт
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({ token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'error /auth/register'})
        }

})



module.exports = router