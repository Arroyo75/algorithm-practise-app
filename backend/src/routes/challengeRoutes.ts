import express, { Router, RequestHandler } from 'express';
import { createChallenge, getChallenges, deleteChallenge, updateChallenge, getChallenge } from '../controllers/challengeController';

const router: Router = express.Router();

router.post('/', createChallenge as RequestHandler);
router.get('/', getChallenges as RequestHandler);
router.delete('/:id', deleteChallenge as RequestHandler);
router.put('/:id', updateChallenge as RequestHandler);
router.get('/:id', getChallenge as RequestHandler);

export default router;