import Ticket from './Ticket';
import { connect } from 'react-redux';
import { fetchTicket } from '../../actions/ticketActions';

const mapStateToProps = ({ ticket }) => ({
	ticket
});

export default connect(mapStateToProps, { fetchTicket })(Ticket);
