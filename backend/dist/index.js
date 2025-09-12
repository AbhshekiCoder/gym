"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const AdminRoutes_1 = __importDefault(require("./routes/AdminRoutes"));
const cors_1 = __importDefault(require("cors"));
const DatabaseConnected_1 = __importDefault(require("./config/DatabaseConnected"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://gym1246.netlify.app", // frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(express_1.default.json());
dotenv_1.default.config();
(0, DatabaseConnected_1.default)();
app.use('/api/user', UserRoutes_1.default);
app.use('/api/admin/members', AdminRoutes_1.default);
app.use('/api/admin', AdminRoutes_1.default);
app.use('/api/admin/classes', AdminRoutes_1.default);
app.use('/api/admin/class', AdminRoutes_1.default);
app.use('/api/admin/classes/delete', AdminRoutes_1.default);
app.use('/api/user/payment', UserRoutes_1.default);
app.use('/api/admin/payment_fetch', AdminRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT} `);
});
