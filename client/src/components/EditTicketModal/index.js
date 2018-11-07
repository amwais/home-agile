import EditTicketModal from './EditTicketModal';
import { connect } from 'react-redux';
import { createTicket, toggleEditTicket } from '../../actions/ticketActions';
import { fetchUsers } from '../../actions/userActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ ticket, users }) => ({
	isOpen: ticket.isEditOpen,
	ticket: ticket.ticket,
	users: users.users
});

export default connect(mapStateToProps, { createTicket, toggleEditTicket, fetchUsers })(withRouter(EditTicketModal));
