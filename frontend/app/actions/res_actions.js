import keys from '../../../config/keys';
import yelp from 'yelp-fusion';
import $ from 'jquery';

export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';
export const RECEIVE_CURRENT_RES = 'RECEIVE_CURRENT_RES';

const client = yelp.client(keys.yelpKey);

export const receiveRestaurants = (resList) => ({
    type: RECEIVE_RESTAURANTS,
    resList
});

export const receiveCurrentRes = (res) => ({
    type: RECEIVE_CURRENT_RES,
    res
});

export const fetchRestaurants = (data) => dispatch => (
    client.search(data)
    .then(res => dispatch(receiveRestaurants(res.businesses)))
    .catch(err => console.log(err)) 
)

const yelpFetch = (id) => (
    $.ajax({
        method: 'get',
        url: `https://api.yelp.com/v3/businesses/${id}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + keys.yelpKey);
        }
    })
)

export const fetchSingleRes = (id) => dispatch => (
    yelpFetch(id)
    .then(res => dispatch(receiveCurrentRes(res)))
)