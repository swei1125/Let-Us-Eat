import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchRestaurants } from '../../actions/biz_actions';
import Search from './search';

const mapDispatchToProps = dispatch => ({
    fetchRestaurants: (data) => dispatch(fetchRestaurants(data)),
});

export default withRouter(connect(null, mapDispatchToProps)(Search));
