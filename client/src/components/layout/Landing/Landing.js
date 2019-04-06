import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Header, Icon, Button } from 'semantic-ui-react';

export default class Landing extends Component {
	componentDidMount() {
		const { history, auth } = this.props;

		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
	}

	render() {
		return (
			<div
				className="center-col"
				style={{
					marginTop: '8rem',
					padding: '10px'
				}}
			>
				<div>
					<Header inverted as="h1" icon>
						<Icon name="braille" color="teal" />
						<Header.Content style={{ marginBottom: '5px' }}>Home Kanban</Header.Content>
						<Header.Subheader>Get your shit together.</Header.Subheader>
					</Header>
				</div>

				<Button.Group className="center" style={{ marginTop: '10px' }}>
					<Button style={{ marginRight: '1.5rem' }} as="a" href="/login" inverted color="green">
						Login
					</Button>
					<Button as="a" href="/register" inverted color="red">
						Sign Up
					</Button>
				</Button.Group>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};
