import Ticket from './Ticket';
import { connect } from 'react-redux';
import { fetchTicket, toggleEditTicket } from '../../actions/ticketActions';

const mapStateToProps = ({ ticket }) => ({
	ticket
});

export default connect(mapStateToProps, { fetchTicket, toggleEditTicket })(Ticket);
