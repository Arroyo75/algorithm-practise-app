import express from 'express';
import { createChallange, getChallanges } from '../controllers/challangeController';

const router = express.Router();

router.post('/', createChallange);
router.get('/', getChallanges);

export default router;