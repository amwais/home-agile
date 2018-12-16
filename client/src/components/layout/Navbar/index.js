import Navbar from './Navbar';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { toggleCreateTicket, clearTicket } from '../../../actions/ticketActions';
import { toggleCreateProject } from '../../../actions/projectActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth, ticket, projects }) => ({
	auth,
	ticket,
	projects
});

export default connect(mapStateToProps, { logoutUser, toggleCreateTicket, toggleCreateProject, clearTicket })(
	withRouter(Navbar)
);
