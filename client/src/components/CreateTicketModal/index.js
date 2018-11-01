import CreateTicketModal from './CreateTicketModal';
import { connect } from 'react-redux';
import { createTicket, toggleCreateTicket } from '../../actions/ticketActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ ticket }) => ({
	isOpen: ticket.isOpen
});

export default connect(mapStateToProps, { createTicket, toggleCreateTicket })(withRouter(CreateTicketModal));
