import EditTicketModal from './EditTicketModal';
import { connect } from 'react-redux';
import { createTicket, toggleEditTicket } from '../../actions/ticketActions';
import { fetchUsers } from '../../actions/userActions';
import { fetchProjects } from '../../actions/projectActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ ticket, users, projects }) => ({
	isOpen: ticket.isEditOpen,
	ticket: ticket.ticket,
	users: users.users,
	projects: projects.projects
});

export default connect(mapStateToProps, { createTicket, toggleEditTicket, fetchUsers, fetchProjects })(
	withRouter(EditTicketModal)
);
