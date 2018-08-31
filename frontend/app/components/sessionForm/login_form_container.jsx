import { connect } from 'react-redux';

import SessionForm from './session_form';
import { loginUser, deleteErrors } from '../../util/session_api_util';

const mapStateToProps = ({ errors }) => ({
  errors: errors,
  formType: "login"
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(loginUser(user)),
    deleteErrors: () => dispatch(deleteErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);