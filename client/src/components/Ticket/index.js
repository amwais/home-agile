import Ticket from './Ticket';
import { connect } from 'react-redux';
import { fetchTicket, toggleCreateTicket } from '../../actions/ticketActions';

const mapStateToProps = ({ ticket }) => ({
	ticket
});

export default connect(mapStateToProps, { fetchTicket, toggleCreateTicket })(Ticket);
