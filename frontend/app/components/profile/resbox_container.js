import { connect } from "react-redux";
import { getCurrentUser } from "../../util/user_util";
import ResBox from './resbox';

const mapStateToProps = state => ({
    currentUser: state.session,
});

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResBox);