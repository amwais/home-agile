import Ticket from './Ticket';
import { connect } from 'react-redux';
import { fetchTicket, toggleEditTicket, toggleDisplayTicket } from '../../actions/ticketActions';

const mapStateToProps = ({ ticket }) => ({
	isOpen: ticket.isDisplayTicketOpen,
	ticket: ticket.ticket
});

export default connect(mapStateToProps, { fetchTicket, toggleEditTicket, toggleDisplayTicket })(Ticket);
