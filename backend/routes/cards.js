import express from 'express';
import moment from 'moment';
import { auth } from '../middleware/auth.js';
import { Event } from '../models/Event.js';

const router = express.Router();

/**
 * @openapi
 * /api/cards:
 *   get:
 *     summary: 카드 조회
 *     description: 사용자의 마니또 카드 조회
 *     operationId: getCardByEventIdAndUserId
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: eventId
 *         in: query
 *         required: true
 *         description: 조회할 이벤트의 ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       '200':
 *         description: 성공적으로 이벤트와 카드 정보를 조회한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     event:
 *                       type: object
 *                       properties:
 *                         regDate:
 *                           type: string
 *                           description: 이벤트 등록 일시
 *                           example: "2025-01-18 16:00:00"
 *                         creatorId:
 *                           type: string
 *                           description: 이벤트 생성자의 사용자 ID
 *                           example: "507f1f77bcf86cd799439011"
 *                         isCreatorParticipant:
 *                           type: boolean
 *                           description: 생성자가 이벤트에 참여할지 여부
 *                           example: true
 *                         status:
 *                           type: string
 *                           description: 이벤트 상태
 *                           enum:
 *                             - CREATING
 *                             - STARTED
 *                             - ENDED
 *                           example: "CREATING"
 *                     card:
 *                       type: object
 *                       properties:
 *                         regDate:
 *                           type: string
 *                           description: 카드 등록일시
 *                           example: "2025-01-18 16:00:00"
 *                         eventId:
 *                           type: string
 *                           description: 이 카드가 속한 이벤트 ID
 *                           example: "507f1f77bcf86cd799439011"
 *                         userId:
 *                           type: string
 *                           description: 카드를 등록한 사용자 ID
 *                           example: "507f1f77bcf86cd799439011"
 *                         title:
 *                           type: string
 *                           description: 카드의 칭호
 *                           example: "마니또"
 *                         name:
 *                           type: string
 *                           description: 카드 소유자의 이름
 *                           example: "홍길동"
 *                         comment:
 *                           type: string
 *                           description: 카드에 대한 첨언
 *                           example: "힘내세요!"
 *       '404':
 *         description: 해당 이벤트나 카드가 존재하지 않는 경우
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
 *                   example: "조회된 이벤트나 카드가 없습니다."
 *       '500':
 *         description: 서버에서 오류가 발생한 경우
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
 *       - Cards
 */
router.get('/', auth, async(req, res) => {
  const { eventId } = req.query;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ success: false, message: '조회된 데이터가 없습니다' });
    }
    const card = await Card.findOne({ eventId: event._id, userId: req.user._id });
    res.status(200).json({ success: true, data: {event: event, card: card} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;