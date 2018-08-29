import React from 'react';
import { Link } from 'react-router-dom';

export class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
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
                <label className="username-email">Email
                    <input className="signup_input"
                    type="text"
                    value={this.state.email}
                    onChange={this.update('email')}
                    placeholder='email' />
                </label>
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
                </div>
            )
        } else {
            return (
                <div>
                    <header className="login-header">Login to LetsEat</header>
                </div>
            )
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

    renderErrors() {
        return (
            <div>
                <ul>
                    {this.props.errors.map((error, i) => (
                        <li key={`error-${i}`}>
                            {error}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

  render() {
    return (
        <div className="">

        </div>
    )
  }
}
export default SessionForm;
