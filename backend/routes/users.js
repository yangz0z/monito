var express = require('express')
var router = express.Router()
const moment = require('moment')

const { User } = require('../models/User.js')
const { auth } = require('../middleware/auth.js')

// 로그인
router.post('/login', (req, res) => {
    User.findOne(
        { email: req.body.email }
    ).then((user) => {
        if(!user) {
            user = new User(req.body)
            user.regDate = moment().format('YYYY-MM-DD HH:mm:ss')
            user.save().then(() => {
                return res.status(200).json({ success: true })
            }).catch((err) => {
                console.log(err)
                return res.json({ success: false, err })
            })
        }
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err)
            res
                .cookie('accessToken', user.token)
                .status(200)
                .json({ success: true, id: user._id, email: user.email, token: user.token })
        })
    })
    .catch((err) => {
        console.log(err)
        res.json({ success:false, err })
    })
})

// 로그아웃
router.get('/logout', auth, (req, res) => {
    console.log('Logout request received')
    User.findOneAndUpdate(
        { _id: req.user._id }, 
        { token: '' }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        return res.status(200).json({ success: true })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ success: false, err })
    })
})

// 인가
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email
    });
})
  
module.exports = router