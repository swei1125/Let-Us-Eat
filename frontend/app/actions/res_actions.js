import keys from '../../../config/keys';
import $ from 'jquery';


export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';
export const RECEIVE_CURRENT_RES = 'RECEIVE_CURRENT_RES';


export const receiveRestaurants = (resList) => ({
    type: RECEIVE_RESTAURANTS,
    resList
});

export const receiveCurrentRes = (res) => ({
    type: RECEIVE_CURRENT_RES,
    res
});



export const fetchRestaurants = (data) => dispatch => (
    $.ajax({
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
        data,
        headers: {
            'Authorization': `Bearer ${keys.yelpKey}`
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
            'Authorization': `Bearer ${keys.yelpKey}`
        }
    }).then(
        res => dispatch(receiveCurrentRes(res)),
        err => console.log(err)
        )
)
