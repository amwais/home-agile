import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default class EditProjectModal extends Component {
	state = {
		open: true,
		dimmer: 'blurring',
		project: {
			name: '',
			privateProject: false,
			parentProject: ''
		}
	};

	componentDidMount() {
		const { project } = this.props;

		if (project) {
			this.setState({ project });
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
		this.props.toggleEditProject(this.props.project);
	};

	render() {
		const { project, dimmer } = this.state;
		console.log(project);

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
								<Form.Select
									onChange={this.onChange}
									name="parentProject"
									fluid
									label="Parent Project"
									options={
										this.props.projects ? (
											this.props.projects.map((project) => {
												return { text: project.name, value: project._id };
											})
										) : (
											[]
										)
									}
									placeholder="Project"
									value={project.parentProject}
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
						<Button negative onClick={() => this.props.toggleEditProject(this.props.project)}>
							Cancel
						</Button>
						<Button
							positive
							icon="checkmark"
							labelPosition="right"
							content="Add Ticket"
							onClick={(e) => this.onSubmit(e, this.state.project)}
						/>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
