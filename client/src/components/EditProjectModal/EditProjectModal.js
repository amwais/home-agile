import React, { Component } from 'react';
import { Button, Modal, Header, Icon, Form, List, Image, Message } from 'semantic-ui-react';
import { isEmail } from '../../utils/isEmail';

export default class EditProjectModal extends Component {
	state = {
		open: true,
		dimmer: 'blurring',
		project: {
			id: '',
			name: '',
			description: '',
			members: []
		},
		newMembers: {
			currentNewMember: '',
			membersToAdd: []
		},
		errors: {
			name: false,
			membersErrors: {
				userNotFound: false,
				invalidEmail: false
			}
		}
	};

	componentDidMount() {
		const { projects, project } = this.props;
		if (project) {
			const projectData = projects.find((proj) => proj._id === project);
			const { name, description, members, _id } = projectData;

			this.setState({
				project: {
					_id: _id.toString(),
					name,
					description,
					members
				},
				newMembers: {
					...this.state.newMembers,
					membersToAdd: [ ...members ]
				}
			});
		}
	}

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

	onMembersChange = (e, { value }) => {
		const { invalidEmail, userNotFound } = this.state.errors.membersErrors;
		if (userNotFound || invalidEmail) {
			this.setState({
				errors: {
					...this.state.errors,
					membersErrors: {
						userNotFound: false,
						invalidEmail: false
					}
				}
			});
		}
		this.setState({
			newMembers: {
				...this.state.newMembers,
				currentNewMember: value
			}
		});
	};

	handleAddMember = () => {
		const newMemberEmail = this.state.newMembers.currentNewMember;
		const { users } = this.props.users;

		if (isEmail(newMemberEmail)) {
			const user = users.filter((user) => user.email === newMemberEmail);

			if (user.length > 0) {
				const newMember = user[0];

				this.setState({
					newMembers: {
						...this.state.newMembers,
						currentNewMember: '',
						membersToAdd: [ ...this.state.newMembers.membersToAdd, newMember ]
					}
				});
			} else {
				this.setState({
					errors: {
						membersErrors: {
							...this.state.errors.membersErrors,
							userNotFound: true
						}
					}
				});
			}
		} else {
			this.setState({
				errors: {
					membersErrors: {
						...this.state.errors.membersErrors,
						invalidEmail: true
					}
				}
			});
		}
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
			projectData = {
				...projectData,
				members: this.state.newMembers.membersToAdd.map((member) => member._id)
			};

			this.props.editProject(projectData, this.props.history);
			this.props.toggleEditProject();
		}
	};

	render() {
		const { project, dimmer, errors } = this.state;
		const { userNotFound, invalidEmail } = this.state.errors.membersErrors;
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
						<Header as="h4" icon style={{ paddingLeft: '50px' }}>
							<Icon name="users" />
							Project Members
						</Header>
						<List style={{ display: 'flex', flexDirection: 'row' }}>
							{this.state.newMembers.membersToAdd.map((member, i) => {
								return (
									<div key={i}>
										<List.Item style={{ display: 'flex' }}>
											<div>
												<Image
													avatar
													src={
														member.avatar ? (
															member.avatar
														) : (
															'//www.gravatar.com/avatar/d10ca8d11301c2f4993ac2279ce4b930?s=200&r=pg&d=mm'
														)
													}
													style={{ flex: '1' }}
												/>
												<List.Content>
													<List.Header>{member.name ? member.name : member}</List.Header>
												</List.Content>
											</div>
										</List.Item>
									</div>
								);
							})}
						</List>
						<div
							style={{
								display: 'flex'
							}}
						>
							<Form.Input
								onChange={this.onMembersChange}
								placeholder="Add Member to project"
								name="members"
								value={this.state.newMembers.currentNewMember}
								style={{
									flex: '1'
								}}
								error={invalidEmail || userNotFound}
							/>
							<Button positive icon onClick={this.handleAddMember}>
								<Icon name="plus" />
							</Button>
						</div>
						{(invalidEmail || userNotFound) && (
							<Message
								error
								header={invalidEmail ? 'Invalid Email' : 'User not found'}
								content={
									invalidEmail ? (
										'Please enter a valid Email address'
									) : (
										'This user is not signed up. Invite him to register.'
									)
								}
							/>
						)}
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
