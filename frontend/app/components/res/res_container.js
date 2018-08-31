import { connect } from 'react-redux';
import { fetchSingleRes, fetchRestaurants, clearCurrentRes } from '../../actions/res_actions';
import { shuffle } from "lodash";
import Res from './res';

const mapStateToProps = state => ({
    resIds: state.entities.resList,
    currentRes: state.entities.currentRes,
    currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({
    fetchSingleRes: id => dispatch(fetchSingleRes(id)),
    fetchRestaurants: data => dispatch(fetchRestaurants(data)),
    clearCurrentRes: () => dispatch(clearCurrentRes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Res);