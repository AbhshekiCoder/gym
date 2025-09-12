"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.post('/members', admin_1.members);
router.get('/', admin_1.getMembers);
router.post('/', admin_1.classes);
router.get('/class', admin_1.getClasses);
router.delete('/:id', admin_1.deleteClasses);
router.get('/payment_fetch', admin_1.getPayments);
exports.default = router;
