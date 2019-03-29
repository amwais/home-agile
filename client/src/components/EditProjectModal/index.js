import EditProjectModal from './EditProjectModal';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/userActions';
import { fetchProjects, toggleEditProject, editProject } from '../../actions/projectActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ projects, users }) => ({
	isOpen: projects.isEditProjectOpen,
	projects: projects.projects,
	project: projects.project,
	users: users
});

export default connect(mapStateToProps, { editProject, toggleEditProject, fetchUsers, fetchProjects })(
	withRouter(EditProjectModal)
);
