import axios from "axios";

export const createRes = data => (
    axios.post('/api/res/createRes', data)
)

export const getRes = id => (
    axios.get(`/api/res/${id}`)
)