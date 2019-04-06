import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import { Header, Button } from 'semantic-ui-react';

export default class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: ''
	};

	componentDidMount() {
		const { history, auth } = this.props;

		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const newUser = { name, email, password, password2 };

		this.props.registerUser(newUser, this.props.history);
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
					<Header.Content style={{ marginBottom: '5px' }}>Sign Up</Header.Content>
					<Header.Subheader>Create your Home Agile account</Header.Subheader>
				</Header>
				<form noValidate onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="Name"
						name="name"
						value={this.state.name}
						onChange={this.onChange}
						error={errors.name}
					/>
					<TextFieldGroup
						placeholder="Email"
						type="email"
						name="email"
						value={this.state.email}
						onChange={this.onChange}
						error={errors.email}
						info="This site uses Gravatar"
					/>
					<TextFieldGroup
						placeholder="Password"
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.onChange}
						error={errors.password}
					/>
					<TextFieldGroup
						placeholder="Confirm Password"
						type="password"
						name="password2"
						value={this.state.password2}
						onChange={this.onChange}
						error={errors.password2}
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

/* 
<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your Home Agile account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Name"
									name="name"
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
								/>
								<TextFieldGroup
									placeholder="Email"
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
									info="This site uses Gravatar"
								/>
								<TextFieldGroup
									placeholder="Password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>
								<TextFieldGroup
									placeholder="Confirm Password"
									type="password"
									name="password2"
									value={this.state.password2}
									onChange={this.onChange}
									error={errors.password2}
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
*/
