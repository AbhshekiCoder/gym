import api from "./api"

export const membersCreate = async(data) =>{
    console.log(data)
    const res = await api.post('/admin/members/members', data);
    return res;
}

export const member_fetch = async() =>{
    const res = await api.get('/admin/members');
    return res;
}

export const classesCreate = async(data) =>{
    const res = await api.post('/admin/classes', data);
    return res;
}

export const classes_fetch = async() =>{
    const res = await api.get('/admin/class/class');
    return res
}

export const classesDelete = async(id) =>{
    const res = await api.delete(`/admin/classes/delete/${id}`);
    return res;
}

export const payment_fetch = async() =>{
    const res = await api.get('/admin/payment_fetch/payment_fetch');
    return res;
}