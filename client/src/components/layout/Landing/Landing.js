import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Landing extends Component {
	componentDidMount() {
		const { history, auth } = this.props;

		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
	}

	render() {
		return (
			<div>
				<section className="hero">
					<div
						className="container center-col"
						style={{
							marginTop: '8rem',
							padding: '10px'
						}}
					>
						<h1 className="subtitle has-text-info is-size-2">Home Kanban</h1>
						<p className="title has-text-light">Get your shit together.</p>
						<div className="buttons">
							<a href="/login" className="button is-rounded is-primary">
								Login
							</a>
							<a href="/register" className="button is-rounded is-link">
								Sign Up
							</a>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};
