import { connect } from "react-redux";
import { getCurrentUser, deleteRes } from "../../util/user_util";
import ResBox from './resbox';

const mapStateToProps = state => ({
    currentUser: state.session,
});

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUser()),
    deleteRes: (data) => dispatch(deleteRes(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResBox);