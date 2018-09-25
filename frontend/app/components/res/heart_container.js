import { connect } from "react-redux";
import Heart from './heart';
import { updateCurrentUser, updateUserLikeRes } from '../../util/user_util';

const mapStateToProps = state => ({
  currentRes: state.entities.currentRes,
  currentUser: state.session
});

const mapDispatchToProps = dispatch => ({
    updateCurrentUser: (user) => dispatch(updateCurrentUser(user)),
    updateUserLikeRes: (id, data) => dispatch(updateUserLikeRes(id, data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heart);