import React from 'react';
import { Link, withRouter } from 'react-router-dom';

export class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: ''
        }

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.deleteErrors();
    }

    update(field) {
        return e => {
            this.setState({[field]: e.target.value})
        }
    }

    nameForm() {
        if (this.props.formType === 'signup') {
            return (
                <div className="username">
                    <div className="inputs">
                        <h2>Name</h2>
                        <input type="text" id="name" className="inputs-sess-form" required onChange={this.update("name")} value={this.state.name} placeholder="Name" />
                        <span className="help-text"></span>
                        <div className="name-requirements">{this.props.errors.session.name}</div>
                    </div>
                </div>
            )
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.formType === 'login') {
            const req = document.getElementById("email-requirements")
            req.style.bottom = "43%";
        }

        const user = Object.assign({}, this.state);
        this.props.processForm(user)
    }

    formTypeHeader() {
        if (this.props.formType === 'signup') {
            return (
                <div className="inner-header-container">
                    <div className="signup-header">Join Let's Eat!</div>
                </div>
            )
        } else {
            return <div className="inner-header-container">
                <div className="signup-header">
                  Login to Let's Eat
                </div>
              </div>;
        }
    }

    formTypeButton() {
        if (this.props.formType === 'signup') {
            return (
                <input type="submit" className="button-session" value="Create Account"/>
            )
        } else {
            return (
                <input type="submit" className="button-session" value="Log in"/>
            )
        }
    }

    confirmPassword() {
        if (this.props.formType === 'signup') {
            return <div className="username">
                <div className="inputs">
                  <h2>Password</h2>
                  <input type="password" className="inputs-sess-form" required onChange={this.update("password2")} value={this.state.password2} placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" />
                  <div className="confirm-pass-req">{this.props.errors.session.password2}</div>
                </div>
              </div>;
        }
    }

    linkToSession() {
        if (this.props.formType === 'signup') {
            return (
                <div className="other-session">
                    Have an account?&nbsp;<Link className="other-session-link" to="/login">Login</Link>
                </div>
            )
        } else {
            return <div className="other-session">
                Don't have an account?&nbsp;
                <Link className="other-session-link" to="/signup">
                  Create one
                </Link>
              </div>;
        }
    }

    renderErrors() {
        if (this.props.errors.length === 0) {
            return (
                <div></div>
            )
        }
        return (
            <ul className="error-ul">
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

  render() {
    return <div className="session-form-outer">
        <div className="full-page-session">
            <div className="sess-img-container">
            <Link to="/">
            <img src={"../../../images/logoCover.png"} className="session-img"/>
            </Link> 
            </div>
          <div className="form-type-header">{this.formTypeHeader()}</div>
          <div className="session-form-container">
            <div className="session-form-input">
              <form onSubmit={this.handleSubmit} className="form-container">

                <div className="username">
                  <div className="inputs">
                    <h2>Email</h2>
                    <input type="email" className="inputs-sess-form" required onChange={this.update("email")} value={this.state.email} placeholder="email" />
                    <span className="help-text"></span>
                    <div id="email-requirements" className="email-requirements">{this.props.errors.session.email}</div>
                  </div>
                </div>

                {this.nameForm()}

                <div className="username">
                  <div className="inputs">
                    <h2>Password</h2>
                    <input type="password" id="password" className="inputs-sess-form" required onChange={this.update("password")} value={this.state.password} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"/>
                    <div className="pass-requirements">
                    6 characters, one number, one lowercase and uppercase letter
                    </div>
                  </div>
                </div>

                {this.confirmPassword()}

                {this.formTypeButton()}
              </form>
              {this.linkToSession()}
            </div>
          </div>
        </div>
      </div>;
  }
}
export default withRouter(SessionForm);
