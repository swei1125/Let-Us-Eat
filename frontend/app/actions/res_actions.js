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

export const fetchRestaurants = () => {
    return client.search({ location: 'San francisco' })
    .then(res => console.log(res))
}


