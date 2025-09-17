import express from 'express';
import dotenv from 'dotenv'

import UserRoutes from './routes/UserRoutes';
import adminRoutes from './routes/AdminRoutes';
import  cors from 'cors'
import connectDB from './config/DatabaseConnected';
const app = express();
app.use(
  cors({
    origin: ["https://gym1246.netlify.app", "http://localhost:5173", "https://gym-five-self.vercel.app"], // frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


app.use(express.json());
dotenv.config();

connectDB()

app.use('/api/user', UserRoutes)
app.use('/api/admin/members', adminRoutes)
app.use('/api/admin', adminRoutes);
app.use('/api/admin/classes', adminRoutes)
app.use('/api/admin/class', adminRoutes)
app.use('/api/admin/classes/delete', adminRoutes)
app.use('/api/user/payment', UserRoutes)
app.use('/api/admin/payment_fetch', adminRoutes);








app.listen(process.env.PORT, () =>{
    console.log(`server is running on port ${process.env.PORT} `)
})