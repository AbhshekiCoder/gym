import api from "./api"



export const payment = async(data) =>{
    
    const res = await api.post('/user/payment', data);
    return res

} 