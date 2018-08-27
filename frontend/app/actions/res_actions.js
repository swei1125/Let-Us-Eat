import keys from '../../../config/keys';
import yelp from 'yelp-fusion';

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

export const fetchSingleRes = (id) => dispatch => (
    (id) => ($.ajax({
        method: 'get',
        url: `https://api.yelp.com/v3/businesses/${id}`,
        headers: {
            Authorization: 'Bearer' + keys.yelpKey
        }
    })).then(res => dispatch(receiveCurrentRes(res)))
)