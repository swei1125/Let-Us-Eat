import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NavBar from "./navbar";
import { logoutUser, loginUser } from "../../util/session_api_util";

const mapStateToProps = state => ({
  session: state.session.id
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  loginUser: (user) => dispatch(loginUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
