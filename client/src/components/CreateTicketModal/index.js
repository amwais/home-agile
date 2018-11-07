import CreateTicketModal from './CreateTicketModal';
import { connect } from 'react-redux';
import { createTicket, toggleCreateTicket } from '../../actions/ticketActions';
import { fetchUsers } from '../../actions/userActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ ticket, users }) => ({
	isOpen: ticket.isCreateOpen,
	ticket: ticket.ticket,
	users: users.users
});

export default connect(mapStateToProps, { createTicket, toggleCreateTicket, fetchUsers })(
	withRouter(CreateTicketModal)
);
