import CreateProjectModal from './CreateProjectModal';
import { connect } from 'react-redux';
import { toggleCreateProject } from '../../actions/projectActions';
import { fetchUsers } from '../../actions/userActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ ticket, users, projects }) => ({
	isOpen: projects.isCreateProjectOpen,
	ticket: ticket.ticket,
	projects: projects.projects,
	users: users.users
});

export default connect(mapStateToProps, { toggleCreateProject, fetchUsers })(withRouter(CreateProjectModal));
