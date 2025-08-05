import express from 'express';
import { classes, deleteClasses, getClasses, getMembers, getPayments, members } from '../controllers/admin';



const router = express.Router();

router.post('/members', members  )
router.get('/', getMembers)
router.post('/', classes)
router.get('/class', getClasses)
router.delete('/:id', deleteClasses)
router.get('/payment_fetch', getPayments )
export default router;