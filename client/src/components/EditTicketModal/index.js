import EditTicketModal from './EditTicketModal';
import { connect } from 'react-redux';
import { editTicket, toggleEditTicket } from '../../actions/ticketActions';
import { fetchUsers } from '../../actions/userActions';
import { fetchProjects } from '../../actions/projectActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ ticket, users, projects, ticketsView }) => ({
	isOpen: ticket.isEditTicketOpen,
	ticket: ticket.ticket,
	users: users.users,
	projects: projects.projects,
	ticketsView
});

export default connect(mapStateToProps, { editTicket, toggleEditTicket, fetchUsers, fetchProjects })(
	withRouter(EditTicketModal)
);
