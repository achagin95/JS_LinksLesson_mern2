const {Router} = require('express')
const Link = require('../models/Links')
const router = Router()

router.get('/:code', async(req, res) => {
    try {

        const link = await Link.findOne({ code: req.params.code })

        if (link) {
            //link.clicks++
            //await link.save()
            //клики не делал
            return res.redirect(link.from)
        } 

        res.status(404).json("link not found")

    } catch (e) {
        res.status(500).json({ message: 'error /code (redirect routes)' })
    }
})

module.exports = router