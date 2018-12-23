import React, { Component } from 'react';
import TicketsView from './TicketsView';
import ProjectsView from './ProjectsView';
// import './styles.css';

export default class Dashboard extends Component {
	render() {
		return (
			<div className="dashboard-wrap">
				{this.props.navbar.view === 'tickets' && <TicketsView />}
				{this.props.navbar.view === 'projects' && <ProjectsView />}
			</div>
		);
	}
}
