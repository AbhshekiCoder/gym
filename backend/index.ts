import express from 'express';
import dotenv from 'dotenv'
import { connectDB, sequelize } from './config/DatabaseConnected';
import UserRoutes from './routes/UserRoutes';
import adminRoutes from './routes/AdminRoutes';
import cors from 'cors'
const app = express();


app.use(express.json());
dotenv.config();
app.use(cors())



app.use('/api/user', UserRoutes)
app.use('/api/admin/members', adminRoutes)
app.use('/api/admin', adminRoutes);
app.use('/api/admin/classes', adminRoutes)
app.use('/api/admin/class', adminRoutes)
app.use('/api/admin/classes/delete', adminRoutes)
app.use('/api/user/payment', UserRoutes)
app.use('/api/admin/payment_fetch', adminRoutes);

sequelize.sync();
connectDB()





app.listen(process.env.PORT, () =>{
    console.log(`server is running on port ${process.env.PORT} `)
})