import { connect } from 'react-redux';
import { updateUserLikeRes, getCurrentUser } from '../../util/user_util';
import userProfile from "./user_profile";

const mapStateToProps = state => ({
  currentUser: state.session,
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  deleteRes: (id, data) => dispatch(updateUserLikeRes(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);