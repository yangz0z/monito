var express = require('express')
var router = express.Router()
const moment = require('moment')

const { User } = require('../models/User.js')
const { auth } = require('../middleware/auth.js')

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags: 
 *       - users
 *     summary: "로그인"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "사용자 이메일"
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: "로그인 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: string
 *                   description: "사용자 고유 식별값"
 *                   example: "60d9f8f2b3e31f2c6b9c9a73"
 *                 email:
 *                   type: string
 *                   description: "사용자 이메일"
 *                   example: "user@example.com"
 *                 token:
 *                   type: string
 *                   description: "JWT 토큰값"
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
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

/**
 * @openapi
 * /api/users/logout:
 *   get:
 *     tags: 
 *       - users
 *     summary: "로그아웃"
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: "사용자 고유 식별값"
 *         required: true
 *         schema:
 *           type: string
 *           example: "60a57f9b4f1a2c1abc123456"
 *     responses:
 *       200:
 *         description: "로그아웃 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true

 */
router.get('/logout', auth, (req, res) => {
    console.log('Logout request received')
    User.findOneAndUpdate(
        { _id: req.params._id }, 
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