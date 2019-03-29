import CreateTicketModal from './CreateTicketModal';
import { connect } from 'react-redux';
import { createTicket, toggleCreateTicket } from '../../actions/ticketActions';
import { fetchUsers } from '../../actions/userActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ ticket, users, projects, errors }) => ({
	isOpen: ticket.isCreateTicketOpen,
	ticket: ticket.ticket,
	projects: projects.projects,
	project: projects.project,
	users: users.users
});

export default connect(mapStateToProps, { createTicket, toggleCreateTicket, fetchUsers })(
	withRouter(CreateTicketModal)
);
