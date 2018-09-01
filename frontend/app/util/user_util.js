import axios from "axios";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from './session_api_util';

export const UPDATE_LIKERES = 'UPDATE_LIKERES';
export const updateLikeRes = user => ({
    type: UPDATE_LIKERES,
    user
})

export const getCurrentUser = () => (
    axios.get('/api/users/current')
)

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const updateUserLikeRes = (id, data) => (
    axios
    .patch(`/api/users/${id}`, data)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            

            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
           

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
)