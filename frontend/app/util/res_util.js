import axios from "axios";

export const createRes = data => (
    axios
        .post('/api/res/createRes', data)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        
        })
)