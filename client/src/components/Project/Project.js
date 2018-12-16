import React, { Component } from 'react';
import { Container, Header, Divider, Image, Segment, Icon, Button } from 'semantic-ui-react';

export default class Project extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchProject(id);
	}

	render() {
		const { project } = this.props.projects;

		return (
			<div>
				<Container>
					<Button onClick={() => this.props.toggleEditProject(project)} animated="vertical">
						<Button.Content hidden>Edit</Button.Content>
						<Button.Content visible>
							<Icon name="edit" />
						</Button.Content>
					</Button>
				</Container>

				<Container className="ticket">
					{project && (
						<div>
							<Header className="ticket-header" as="h2">
								{project.name}
							</Header>
							<Divider />

							<Segment raised>
								<strong>Created at: </strong>
								{project.createdAt}

								{project.privateProject && (
									<div>
										<br />
										<br />
										<strong style={{ color: 'red' }}> This project is private </strong>
									</div>
								)}
							</Segment>
							<Segment raised>
								<strong>Owner: </strong>
								{project.owner.name}
								{project.owner.name && <Image size="mini" src={project.owner.avatar} />}
							</Segment>
						</div>
					)}
				</Container>
			</div>
		);
	}
}
