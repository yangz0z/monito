import express from 'express';
import moment from 'moment';
import { User } from '../models/User.js';
import { Event } from '../models/Event.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

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
router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            user = new User(req.body);
            user.regDate = moment().format('YYYY-MM-DD HH:mm:ss');
            await user.save();
        }
        await user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
        });
        res
            .cookie('accessToken', user.token)
            .status(200)
            .json({ 
                success: true, 
                id: user._id, 
                email: user.email, 
                token: user.token,
            });
    } catch (err) {
        res.status(500).send(err);
    }
});

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
router.get('/logout', auth, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params._id },
            { token: '' }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

/**
 * @openapi
 * /api/users/auth:
 *   get:
 *     tags: 
 *       - users
 *     summary: "인가"
 *     responses:
 *       200:
 *         description: "인가 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: "사용자 고유 식별값"
 *                   example: "60d9f8f2b3e31f2c6b9c9a73"
 *                 isAuth:
 *                   type: boolean
 *                   example: true
 *                 email:
 *                   type: string
 *                   description: "사용자 이메일"
 *                   example: "user@example.com"
 */
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email
    });
});

export default router;