import express from 'express';
import moment from 'moment';
import { Event } from '../models/Event.js'; 
import { auth } from '../middleware/auth.js';

const router = express.Router();


/**
 * @openapi
 * /api/events:
 *   post:
 *     summary: 이벤트 등록/수정
 *     description: 새로운 이벤트를 등록하거나 기존 이벤트를 수정
 *     operationId: createEvent
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: 이벤트 생성에 필요한 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: 수정시 이벤트의 ID. 등록 시 입력하지 않는다
 *                 example: "abc123"
 *               isCreatorParticipant:
 *                 type: boolean
 *                 description: 생성자가 이벤트에 참여할지 여부
 *                 example: true
 *             required:
 *              - isCreatorParticipant
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 eventId:
 *                   type: string
 *                   description: 생성된 이벤트의 ID
 *                   example: "12345"
 *       '500':
 *         description: 서버에서 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "서버에서 오류가 발생했습니다."
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *     tags:
 *       - Events
 */
router.post('/', auth, async (req, res) => {
  let event = new Event();
  event.regDate = moment().format('YYYY-MM-DD HH:mm:ss');
  event.creatorId = req.user._id;
  event.isCreatorParticipant = req.body.isCreatorParticipant;

  try {
    const result = await Event.findOneAndUpdate(
      { _id: req.body.eventId },
      event,
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, eventId: result.id });
  } catch (err) {
    res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: err.message });
  }
});

export default router;