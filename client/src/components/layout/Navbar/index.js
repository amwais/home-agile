import Navbar from './Navbar';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { toggleCreateTicket, clearTicket } from '../../../actions/ticketActions';
import { toggleCreateProject } from '../../../actions/projectActions';
import { setView } from '../../../actions/navBarActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth, ticket, projects, navbar }) => ({
	auth,
	ticket,
	projects,
	navbar
});

export default connect(mapStateToProps, { logoutUser, toggleCreateTicket, toggleCreateProject, clearTicket, setView })(
	withRouter(Navbar)
);
