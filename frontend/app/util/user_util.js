import axios from "axios";

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

export const updateCurrentUser = user => ({
    type: UPDATE_CURRENT_USER,
    user
})

export const getCurrentUser = () => (
    axios.get('/api/users/current')
)

export const likeRes = (id, data) => dispatch => (
    axios
    .patch(`/api/users/${id}`, data)
    .then(user => dispatch(updateCurrentUser(user)))
)