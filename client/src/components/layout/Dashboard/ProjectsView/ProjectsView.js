import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class ProjectsView extends Component {
	componentDidMount() {
		this.props.fetchProjects();
	}

	render() {
		const { projects } = this.props.projects;

		return (
			<div>
				<Card.Group className="tickets-grid-container">
					{projects &&
						projects.map((project, i) => (
							<a key={i} href={`/projects/${project._id}`}>
								<Card>
									<Card.Content>
										<Image floated="right" size="mini" src={project.owner.avatar} />
										<Card.Header>{project.name}</Card.Header>
										<br />
									</Card.Content>
								</Card>
							</a>
						))}
				</Card.Group>
			</div>
		);
	}
}
