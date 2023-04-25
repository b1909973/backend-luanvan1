const express  = require('express')
const VideoController = require('../controller/video.controller')
const router  = express.Router()

router.route('/')
.get(VideoController.find)
.post(VideoController.create)

router.route('/comment/:id').get(VideoController.findComments)
router.route('/about/:pagination').get(VideoController.findAll)

router.route('/home').get(VideoController.findOne)
module.exports = router