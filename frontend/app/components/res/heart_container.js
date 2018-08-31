import { connect } from "react-redux";
import Heart from './heart';

const mapStateToProps = state => ({
  currentRes: state.entities.currentRes,
  currentUser: state.session
});

export default connect(
  mapStateToProps
)(Heart);