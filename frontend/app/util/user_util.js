import axios from "axios";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from './session_api_util';

export const getCurrentUser = () => dispatch => (
    axios.get('/api/users/current')
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

export const deleteRes = (data) => (
  axios
    .patch(`/api/users/deleteRes`, data)
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