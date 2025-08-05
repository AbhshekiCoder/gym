import express from 'express';
import { login, payment, signup, user } from '../controllers/user';



const router = express.Router();

router.post("/", signup );
router.post("/login", login)
router.get("/:token", user)
router.post("/payment", payment )

export default router;