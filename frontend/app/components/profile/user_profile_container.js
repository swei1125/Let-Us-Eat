import { connect } from 'react-redux';
import { fetchSingleRes, deleteSingleRes } from "../../actions/res_actions";
import userProfile from "./user_profile";

const mapStateToProps = state => ({
  currentUser: state.session.name,
  likedRes: state.session.likedResYelpIds
});

const mapDispatchToProps = dispatch => ({
  fetchSingleRes: (id) => dispatch(fetchSingleRes(id)),
  deleteRes: (id, data) => dispatch(likeRes(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);