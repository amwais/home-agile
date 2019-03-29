import Navbar from './Navbar';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { toggleCreateTicket, clearTicket } from '../../../actions/ticketActions';
import { toggleCreateProject, toggleEditProject, fetchProject } from '../../../actions/projectActions';
import { setProjectView } from '../../../actions/navBarActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth, ticket, projects, navbar }) => ({
	auth,
	ticket,
	projects,
	navbar
});

export default connect(mapStateToProps, {
	logoutUser,
	toggleCreateTicket,
	toggleCreateProject,
	toggleEditProject,
	fetchProject,
	clearTicket,
	setProjectView
})(withRouter(Navbar));
