import express from 'express';
import moment from 'moment';
import { auth } from '../middleware/auth.js';
import EventStatus from '../models/enums/EventStatus.js';
import { Event } from '../models/Event.js';

const router = express.Router();

/**
 * @openapi
 * /api/cards:
 *   get:
 *     summary: 카드 조회
 *     description: 사용자의 마니또 카드 및 이벤트 정보 조회
 *     operationId: getCardByEventIdAndUserId
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         description: "쿠키에 저장되어 있는 accessToken값"
 *         schema:
 *           type: string
 *           example: "your-access-token-here"
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
 *                         status:
 *                           type: string
 *                           description: 이벤트 상태
 *                           enum:
 *                             - CREATING
 *                             - STARTED
 *                             - ENDED
 *                           example: "CREATING"
 *                         cardCount:
 *                           type: integer
 *                           description: 해당 이벤트에 속한 카드의 총 개수
 *                           example: 10
 *                     myCard:
 *                       type: object
 *                       description: 현재 로그인한 사용자의 카드 정보
 *                       properties:
 *                         regDate:
 *                           type: string
 *                           description: 카드 등록 일시
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
 *                     manitoCard:
 *                       type: object
 *                       description: 해당 카드의 마니또 카드 정보 (오픈했을 경우)
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: 마니또 카드 ID
 *                           example: "507f1f77bcf86cd799439011"
 *                         title:
 *                           type: string
 *                           description: 카드의 칭호
 *                           example: "마니또"
 *                         name:
 *                           type: string
 *                           description: 카드 소유자의 이름
 *                           example: "김철수"
 *                         comment:
 *                           type: string
 *                           description: 카드에 대한 첨언
 *                           example: "힘내세요!"
 *                         isOpened:
 *                           type: boolean
 *                           description: 카드가 열렸는지 여부
 *                           example: false
 *     tags:
 *       - Cards
 */
router.get('/', auth, async (req, res) => {
  const { eventId } = req.query;
  try {
    const event = await Event.findById(eventId).select('_id status');
    if (!event) {
      return res.status(404).json({ success: false, message: '조회된 데이터가 없습니다' });
    }
    const cardCount = await Card.countDocuments({ eventId });
    const myCard = await Card.findOne({ eventId: event._id, userId: req.user._id });
    let myManitoCard;
    
    if (myCard?.manitoCardId) {
      const manitoCard = await Card.findById(myCard.manitoCardId).select('_id title name comment isOpened');
      if (manitoCard?.isOpened) myManitoCard = manitoCard;
      delete myCard.manitoCardId;
    }

    return res.status(200).json({ 
      success: true, 
      data: {
        event: {...event, cardCount}, 
        myCard: myCard, 
        manitoCard: myManitoCard 
      } 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/cards:
 *   post:
 *     summary: 카드 등록/수정
 *     description: 사용자의 마니또 카드 등록/수정
 *     operationId: postCard
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         description: "쿠키에 저장되어 있는 accessToken값"
 *         schema:
 *           type: string
 *           example: "your-access-token-here"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: 이 카드가 속한 이벤트 ID
 *                 example: "507f1f77bcf86cd799439011"
 *               cardId:
 *                 type: string
 *                 description: 수정할 카드의 ID. 등록 시 빈값
 *                 example: "507f1f77bcf86cd799439011"
 *               title:
 *                 type: string
 *                 description: 카드의 칭호
 *                 example: "마니또"
 *               name:
 *                 type: string
 *                 description: 카드 소유자의 이름
 *                 example: "홍길동"
 *               comment:
 *                 type: string
 *                 description: 카드에 대한 첨언
 *                 example: "힘내세요!"
 *             required:
 *                - eventId, name
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
 *                     cardId:
 *                       type: string
 *                       description: 등록/수정된 카드의 ID
 *                       example: "507f1f77bcf86cd799439011"
 *       '404':
 *         description: 해당 이벤트가 존재하지 않는 경우
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
 *                   example: "조회된 이벤트가 없습니다."
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
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, cardId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: '이벤트를 찾을 수 없습니다.' });
    }
    let card = new Card(req.body);
    card.regDate = cardId ? card.regDate : moment().format('YYYY-MM-DD HH:mm:ss');
    card.userId = req.user._id;
    const result = await Card.findOneAndUpdate({_id: cardId}, card, { new: true, upsert: true });
    return res.status(200).json({ success: true, data: { cardId: result._id } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @openapi
 * /api/cards/open:
 *   get:
 *     summary: 마니또 뽑기
 *     description: 사용자가 뽑은 마니또 카드 조회
 *     operationId: getMyManitoCard
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         description: "쿠키에 저장되어 있는 accessToken값"
 *         schema:
 *           type: string
 *           example: "your-access-token-here"
 *       - name: eventId
 *         in: query
 *         required: true
 *         description: 조회할 이벤트의 ID
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       '200':
 *         description: 성공
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
 *                     manitoCard:
 *                       type: object
 *                       description: 사용자가 뽑은 마니또 카드 정보
 *                       properties:
 *                         _id:
 *                          type: string
 *                          description: 마니또 카드 ID
 *                          example: "507f1f77bcf86cd799439011"
 *                         title:
 *                           type: string
 *                           description: 카드 소유자 칭호
 *                           example: "마니또"
 *                         name:
 *                           type: string
 *                           description: 카드 소유자의 이름
 *                           example: "김철수"
 *                         comment:
 *                           type: string
 *                           description: 카드에 대한 첨언
 *                           example: "힘내세요!"
 *                         isOpened:
 *                           type: boolean
 *                           description: 카드가 열렸는지 여부
 *                           example: true
 *     tags:
 *       - Cards
 */
router.get('/open', auth, async (req, res) => {
  const { eventId } = req.query;
  try {
    const event = await Event.findById(eventId).select('_id status');
    if (!event) {
      return res.status(404).json({ success: false, message: '조회된 데이터가 없습니다.' });
    }
    const myCard = await Card.findOne({ eventId: event._id, userId: req.user._id }).select('manitoCardId');
    
    if (EventStatus[event.status]?.index < 2 || !myCard?.manitoCardId) {
      return res.status(400).json({ success: false, message: '아직 마니또가 셔플되지 않았습니다.' });
    }
    const manitoCard = await Card.findById(myCard.manitoCardId).select('_id title name comment isOpened');
    manitoCard.isOpened = true;
    manitoCard.save();

    const cardCount = await Card.countDocuments({ eventId });
    const openCardCount = await Card.countDocuments({ eventId, isOpened });
    if (cardCount === openCardCount) {
      event.status = 'IN_PROGRESS';
      event.save();
    }

    return res.status(200).json({ 
      success: true, 
      data: {
        manitoCard: manitoCard 
      } 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
})

export default router;