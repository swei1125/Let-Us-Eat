import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NavBar from "./navbar";

const mapStateToProps = state => ({
  session: state.session.id
});

export default withRouter( connect( mapStateToProps, null)(NavBar));
