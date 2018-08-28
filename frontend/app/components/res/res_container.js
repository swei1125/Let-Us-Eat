import { connect } from 'react-redux';
import { fetchSingleRes } from '../../actions/res_actions';
import Res from './res';

const mapStateToProps = state => ({
    resIds: state.entities.resList,
    currentRes: state.entities.currentRes
});

const mapDispatchToProps = dispatch => ({
    fetchSingleRes: id => dispatch(fetchSingleRes(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Res);