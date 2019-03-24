import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class EditProjectModal extends Component {
	state = {
		open: true,
		dimmer: 'blurring',
		project: {
			name: '',
			description: '',
			members: []
		}
	};

	componentDidMount() {
		const { projects, project } = this.props;

		if (project) {
			const projectData = projects.find((proj) => proj._id === project);
			const { name, description, members } = projectData;

			this.setState({
				project: {
					name,
					description,
					members
				}
			});
		}
		this.props.fetchProjects();
	}

	onChange = (e, { name, value }) => {
		this.setState({
			project: {
				...this.state.project,
				[name]: value
			}
		});
	};

	onSubmit = (e, projectData) => {
		e.preventDefault();
		this.props.editProject(projectData, this.props.history);
		// this.props.toggleEditProject(this.props.project);
		this.props.toggleEditProject();
	};

	render() {
		const { project, dimmer } = this.state;

		return (
			<div>
				<Modal
					dimmer={dimmer}
					open={this.props.isOpen}
					onClose={() => this.props.toggleEditProject(this.props.project)}
				>
					<Modal.Header>Edit Project</Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Group widths="equal">
								<Form.Input
									onChange={this.onChange}
									name="name"
									fluid
									label="Title"
									placeholder="Project Title"
									value={project.name}
								/>
							</Form.Group>
							<Form.Group widths="equal">
								<Form.TextArea
									onChange={this.onChange}
									name="description"
									label="Project Description"
									placeholder="Project Description"
									value={project.description}
								/>
							</Form.Group>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button negative onClick={() => this.props.toggleEditProject(this.props.project)}>
							Cancel
						</Button>
						<Button
							positive
							icon="checkmark"
							labelPosition="right"
							content="Save Changes"
							onClick={(e) => this.onSubmit(e, this.state.project)}
						/>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
