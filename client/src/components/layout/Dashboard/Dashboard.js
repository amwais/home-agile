import React, { Component } from 'react';
import TicketsView from './TicketsView';
import ProjectsView from './ProjectsView';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				{this.props.navbar.view === 'tickets' && <TicketsView />}
				{this.props.navbar.view === 'projects' && <ProjectsView />}
			</div>
		);
	}
}
