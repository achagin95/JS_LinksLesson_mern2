const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Links')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        
        //console.log('1 log')
        const baseUrl = config.get('baseUrl')
        //console.log('base url = ', baseUrl)
        const { from } = req.body
        //console.log("from", from)
        //console.log("req.body", req.body)

        const code = shortid.generate()

        const existing = await Link.findOne({ from })

        if (existing) {
            return res.json({ link: existing })
        }

        const to = baseUrl + '/t/' + code

        const links = new Link({
            code, to, from, owner: req.user.userId
        })
        // const links = new Link({
        //     from, to, code, owner: req.user.userId
        // })

        await links.save()

        res.status(201).json(links)

    } catch (e) {
        res.status(500).json({ message: 'error /generate (generate links)' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId }) //??
        res.json(links)

    } catch (e) {
        res.status(500).json({ message: 'error /auth/register' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id)
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'error /auth/register' })
    }
})

module.exports = router