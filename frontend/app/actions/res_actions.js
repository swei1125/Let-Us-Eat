import keys from '../../../config/production_vars';
import $ from 'jquery';


export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';
export const RECEIVE_CURRENT_RES = 'RECEIVE_CURRENT_RES';
export const CLEAR_CURRENT_RES = 'CLEAR_CURRENT_RES';


export const receiveRestaurants = (resList) => ({
    type: RECEIVE_RESTAURANTS,
    resList
});

export const receiveCurrentRes = (res) => ({
    type: RECEIVE_CURRENT_RES,
    res
});

export const clearCurrentRes = () => ({
    type: CLEAR_CURRENT_RES,
})

export const fetchRestaurants = (data) => dispatch => (
    $.ajax({
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
        data,
        headers: {
            'Authorization': `Bearer ${ep2ZPMGFAw - UMN7N4oHAYZ51r1Z3zL - oDPb2TYyJluB5FzXrPpqCsTU70aAWeXVQiqGM6sCJYot7qU2lK8V4PjyjweH3wh3_95ODQsgjfN7DLgWT7VY1XUPvrF - CW3Yx}`
        }
    }).then(
        res => dispatch(receiveRestaurants(res.businesses)),
        err => console.log(err)
    )
)

export const fetchSingleRes = id => dispatch => (
    $.ajax({
        method: 'get',
        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
        headers: {
            'Authorization': `Bearer ${ep2ZPMGFAw - UMN7N4oHAYZ51r1Z3zL - oDPb2TYyJluB5FzXrPpqCsTU70aAWeXVQiqGM6sCJYot7qU2lK8V4PjyjweH3wh3_95ODQsgjfN7DLgWT7VY1XUPvrF - CW3Yx}`
        }
    }).then(
        res => dispatch(receiveCurrentRes(res)),
        err => console.log(err)
        )
)
