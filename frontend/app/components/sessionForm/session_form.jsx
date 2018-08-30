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

    emailForm() {
        if (this.props.formType === 'signup') {
            return (
                <div className="email">
                <div className="inputs">
                    <h2>Email</h2>
                    <input type="text"
                        onChange={this.update('email')}
                        value={this.state.email}
                        placeholder="email" />
                </div>
                </div>
            )
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user)
    }

    formTypeHeader() {
        if (this.props.formType === 'signup') {
            return (
                <div>
                    <header className="signup-header">Join LetsEat!</header>
                    <div className="other-session">
                        <h4>Have an account?</h4>&nbsp;<Link className="other-session-link" to="/login">Login</Link>
                    </div>
                </div>
            )
        } else {
            return <div>
                <header className="signup-header">
                  Login to LetsEat
                </header>
                <div className="other-session">
                    <h4>Don't have an account?</h4>&nbsp;<Link className="other-session-link" to="/signup">Create one</Link>
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
                <input type="submit" className="buttin-session" value="Log in"/>
            )
        }
    }

    confirmPassword() {
        if (this.props.formType === 'signup') {
            return (
                <div className="username">
                    <div className="inputs">
                        <h2>Password</h2>
                        <input type="text"
                            onChange={this.update('password2')}
                            value={this.state.password2}
                            placeholder="Confirm Password" />
                    </div>
                </div>
            )
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
    return (
        <div className="session-form-outer">
            <div className="full-page-session">
            <div className="form-type-header">{this.formTypeHeader()}</div>
                <div className="session-form-container">
                    <div>{this.renderErrors()}</div>
                    <div className="session-form-input">
                        <form onSubmit={this.handleSubmit} className="form-container">

                            <div className="username">
                            <div className="inputs">
                                <h2>Username</h2>
                                <input type="text" 
                                onChange={this.update('email')} 
                                value={this.state.email} 
                                placeholder="email" />
                            </div>
                            </div>

                            {this.emailForm()}

                            <div className="username">
                                <div className="inputs">
                                    <h2>Password</h2>
                                    <input type="text"
                                        onChange={this.update('password')}
                                        value={this.state.password}
                                        placeholder="Password" />
                                </div>
                            </div>

                            {this.confirmPassword()}

                            {this.formTypeButton()}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
export default withRouter(SessionForm);
