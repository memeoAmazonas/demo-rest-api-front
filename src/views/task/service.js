import axios from "axios";

const BASE = 'http://localhost:3000/tasks'
export const GetAll = async () => {
    try {
        const data = await axios.get(BASE)
        return data.data;
    }catch (e) {
        console.log(e)
        return []
    }
}

export const Update = async (id) => {
    const data  = await axios.put(`${BASE}/${id}`)
    return  data.data;
}
export const New = async (body) => {
    const data = await axios.post(BASE, body)
    return data.data
}
export const Delete = async (id) => {
    const data  = await axios.delete(`${BASE}/${id}`)
    return  data.data;
}
