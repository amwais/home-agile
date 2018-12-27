import React, { Component } from 'react';
import TicketsView from './TicketsView';
// import './styles.css';

export default class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard-wrap">
				<TicketsView />
			</div>
		);
	}
}
