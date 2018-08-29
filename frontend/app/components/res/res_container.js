import { connect } from 'react-redux';
import { fetchSingleRes, fetchRestaurants, clearCurrentRes } from '../../actions/res_actions';
import { shuffle } from "lodash";
import Res from './res';

const mapStateToProps = state => ({
    resIds: shuffle(state.entities.resList),
    currentRes: state.entities.currentRes,
});

const mapDispatchToProps = dispatch => ({
    fetchSingleRes: id => dispatch(fetchSingleRes(id)),
    fetchRestaurants: data => dispatch(fetchRestaurants(data)),
    clearCurrentRes: () => dispatch(clearCurrentRes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Res);