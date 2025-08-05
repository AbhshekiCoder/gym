
import api from "./api"


export const signupUser = async (data) =>{
    const res = await api.post('/user', data)
    
    return res;

}  

export const loginUser = async (data) =>{
    const res = await api.post('/user/login', data)
    return res;
}

export const user = async (token) =>{
    const res = await api.get(`/user/${token}`);
    return res;
}