import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class CreateProjectModal extends Component {
	state = {
		open: true,
		dimmer: 'blurring',
		project: {
			name: '',
			privateProject: false,
			description: ''
		}
	};

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
		this.props.createProject(projectData, this.props.history);
		this.props.toggleCreateProject();
	};

	render() {
		const { project, dimmer } = this.state;

		return (
			<div>
				<Modal
					dimmer={dimmer}
					open={this.props.isOpen}
					onClose={() => this.props.toggleCreateProject(this.props.project)}
				>
					<Modal.Header>Create a new project</Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Group widths="equal">
								<Form.Input
									onChange={this.onChange}
									name="name"
									fluid
									label="Title"
									placeholder="Project Title"
									value={project.title}
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
							<Form.Group widths="equal">
								<Form.Checkbox
									name="privateProject"
									checked={this.state.project.privateProject}
									onChange={() =>
										this.setState({
											project: {
												...this.state.project,
												privateProject: !this.state.project.privateProject
											}
										})}
									label="Private Project? (Only you will be able to see it)"
								/>
							</Form.Group>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button negative onClick={() => this.props.toggleCreateProject()}>
							Cancel
						</Button>
						<Button
							positive
							icon="checkmark"
							labelPosition="right"
							content="Add Project"
							onClick={(e) => this.onSubmit(e, this.state.project)}
						/>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
