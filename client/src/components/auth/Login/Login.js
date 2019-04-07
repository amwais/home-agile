import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import { Header, Button } from 'semantic-ui-react';

export default class Login extends Component {
	state = {
		email: '',
		password: ''
	};

	componentDidMount() {
		this.redirect();
	}

	componentDidUpdate() {
		this.redirect();
	}

	redirect = () => {
		const { history, auth } = this.props;

		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { email, password } = this.state;
		const loginValues = { email, password };

		this.props.loginUser(loginValues);
	};

	render() {
		const { errors } = this.props;

		return (
			<div
				className="center-col"
				style={{
					marginTop: '4rem',
					padding: '10px'
				}}
			>
				<Header inverted as="h1" icon>
					<Header.Content style={{ marginBottom: '5px' }}>Login</Header.Content>
					<Header.Subheader>Home Kanban</Header.Subheader>
				</Header>
				<form noValidate onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="Email"
						name="email"
						type="email"
						value={this.state.email}
						onChange={this.onChange}
						error={errors.email}
					/>
					<TextFieldGroup
						placeholder="Password"
						name="password"
						type="password"
						value={this.state.password}
						onChange={this.onChange}
						error={errors.password}
					/>
					<div className="center">
						<Button type="submit" color="green" value="Submit">
							Submit
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
