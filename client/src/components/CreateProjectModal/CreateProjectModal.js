import React, { Component } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';

export default class CreateProjectModal extends Component {
	state = {
		open: true,
		dimmer: 'blurring',
		project: {
			name: '',
			description: ''
		},
		errors: {
			name: false
		}
	};

	onChange = (e, { name, value }) => {
		if ([ name ] && this.state.errors[[ name ]]) {
			this.setState({
				errors: {
					...this.state.errors,
					[name]: false
				}
			});
		}
		this.setState({
			project: {
				...this.state.project,
				[name]: value
			}
		});
	};

	onSubmit = (e, projectData) => {
		e.preventDefault();
		const { name } = projectData;

		const errorState = {
			name: !name
		};

		this.setState({
			errors: {
				...errorState
			}
		});

		if (errorState.name) {
			return;
		} else {
			this.props.createProject(projectData, this.props.history);
			this.props.toggleCreateProject();
		}
	};

	render() {
		const { project, dimmer, errors } = this.state;

		return (
			<div>
				<Modal
					style={{
						height: '56%',
						marginTop: '5%'
					}}
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
									value={project.name}
									error={errors.name}
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
						{errors.name && (
							<Message error header="Missing Fields" content="Please complete all the required fields." />
						)}
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
