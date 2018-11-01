import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import TicketsView from './TicketsView';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<TicketsView />
			</div>
		);
	}
}
