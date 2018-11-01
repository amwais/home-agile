import Navbar from './Navbar';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { toggleCreateTicket } from '../../../actions/ticketActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth, ticket }) => ({
	auth,
	ticket
});

export default connect(mapStateToProps, { logoutUser, toggleCreateTicket })(withRouter(Navbar));
