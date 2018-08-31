import { connect } from "react-redux";
import Heart from './heart';
import { updateCurrentUser } from '../../util/user_util';

const mapStateToProps = state => ({
  currentRes: state.entities.currentRes,
  currentUser: state.session
});

const mapDispatchToProps = dispatch => ({
    updateCurrentUser: (user) => dispatch(updateCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heart);