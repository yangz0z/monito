import express from 'express';
// import path from 'path';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello MONITO API server!');
});

export default router; 
